import { createHmac, randomUUID } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextResponse, type NextRequest } from "next/server";
import { getContactSubmissionConfig } from "@/lib/contact/config";
import { createEnquiryEmail } from "@/lib/contact/email";
import { getServices, getSiteConfig } from "@/lib/content";
import { contactFormSchema } from "@/lib/validations/contact";
import type { ContactDatabase } from "@/types/database";

export const runtime = "nodejs";

const maxBodyBytes = 10 * 1024;
const maxAgeByScope = {
  ipHour: 60 * 60 * 1000,
  ipDay: 24 * 60 * 60 * 1000,
  emailDay: 24 * 60 * 60 * 1000,
} as const;

function jsonResponse(body: object, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

async function readJsonBody(request: NextRequest): Promise<unknown> {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (Number.isFinite(contentLength) && contentLength > maxBodyBytes) {
    throw new RangeError("BODY_TOO_LARGE");
  }

  const reader = request.body?.getReader();

  if (!reader) {
    throw new SyntaxError("EMPTY_BODY");
  }

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalBytes += value.byteLength;
    if (totalBytes > maxBodyBytes) {
      await reader.cancel();
      throw new RangeError("BODY_TOO_LARGE");
    }

    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return JSON.parse(new TextDecoder().decode(body)) as unknown;
}

function allowedOrigins(request: NextRequest) {
  const origins = new Set<string>();
  const configuredUrl = getSiteConfig().url;
  const vercelUrl = process.env.VERCEL_URL;

  if (configuredUrl) origins.add(new URL(configuredUrl).origin);
  if (vercelUrl && process.env.VERCEL_ENV === "preview") {
    origins.add(new URL(`https://${vercelUrl}`).origin);
  }
  if (process.env.NODE_ENV !== "production") {
    origins.add(request.nextUrl.origin);
  }

  return origins;
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isSpamSignal(body: unknown) {
  if (!body || typeof body !== "object") return false;

  const fields = body as Record<string, unknown>;
  return (
    (typeof fields.website === "string" && fields.website.length > 0) ||
    (typeof fields.elapsedMs === "number" && fields.elapsedMs < 3000)
  );
}

async function isRateLimited(
  supabase: SupabaseClient<ContactDatabase>,
  ipHash: string,
  email: string,
  now: Date,
) {
  const countSince = async (
    column: "ip_hash" | "email",
    value: string,
    milliseconds: number,
  ) => {
    const { count, error } = await supabase
      .from("enquiries")
      .select("id", { count: "exact", head: true })
      .eq(column, value)
      .gte("created_at", new Date(now.getTime() - milliseconds).toISOString());

    if (error) throw new Error("RATE_LIMIT_QUERY_FAILED");
    return count ?? 0;
  };

  const [ipHourCount, ipDayCount, emailDayCount] = await Promise.all([
    countSince("ip_hash", ipHash, maxAgeByScope.ipHour),
    countSince("ip_hash", ipHash, maxAgeByScope.ipDay),
    countSince("email", email, maxAgeByScope.emailDay),
  ]);

  return ipHourCount >= 3 || ipDayCount >= 10 || emailDayCount >= 3;
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();

  if (
    request.headers.get("content-type")?.split(";")[0]?.trim() !==
    "application/json"
  ) {
    return jsonResponse({ ok: false, code: "BAD_REQUEST" }, 400);
  }

  const origin = request.headers.get("origin");
  if (!origin || !allowedOrigins(request).has(origin)) {
    return jsonResponse({ ok: false, code: "BAD_REQUEST" }, 400);
  }

  let body: unknown;
  try {
    body = await readJsonBody(request);
  } catch (error) {
    const code = error instanceof RangeError ? "BODY_TOO_LARGE" : "BAD_JSON";
    return jsonResponse(
      { ok: false, code: "BAD_REQUEST" },
      400,
      code === "BODY_TOO_LARGE" ? { "Retry-After": "0" } : undefined,
    );
  }

  if (isSpamSignal(body)) {
    return jsonResponse({ ok: true });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      parsed.error.issues
        .filter((issue) => issue.path.length > 0)
        .map((issue) => [String(issue.path[0]), issue.message]),
    );

    return jsonResponse(
      { ok: false, code: "VALIDATION_ERROR", fieldErrors },
      400,
    );
  }

  const env = getContactSubmissionConfig();
  if (!env) {
    return jsonResponse({ ok: false, code: "SERVICE_UNAVAILABLE" }, 503);
  }

  const now = new Date();
  const ipHash = createHmac("sha256", env.ipHashSecret)
    .update(getClientIp(request))
    .digest("hex");

  try {
    const supabase = createClient<ContactDatabase>(
      env.supabaseUrl,
      env.serviceRoleKey,
      {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
      },
    );

    if (
      await isRateLimited(
        supabase,
        ipHash,
        parsed.data.email,
        now,
      )
    ) {
      return jsonResponse(
        { ok: false, code: "RATE_LIMITED" },
        429,
        { "Retry-After": "3600" },
      );
    }

    const serviceSlug =
      parsed.data.service === "other"
        ? "other"
        : getServices("active").find(
            (service) => service.slug === parsed.data.service,
          )?.slug;

    if (!serviceSlug) {
      return jsonResponse({ ok: false, code: "SERVER_ERROR" }, 500);
    }

    const { data: inserted, error: insertError } = await supabase
      .from("enquiries")
      .insert({
        full_name: parsed.data.fullName,
        email: parsed.data.email,
        subject: parsed.data.subject,
        service_slug: serviceSlug,
        budget_range: parsed.data.budget || null,
        message: parsed.data.message,
        status: "new",
        ip_hash: ipHash,
        user_agent: request.headers.get("user-agent")?.slice(0, 200) ?? null,
        email_sent: false,
      })
      .select("id, created_at")
      .single();

    if (insertError || !inserted) {
      console.error(JSON.stringify({ event: "contact_store_failed", code: "DATABASE_INSERT_FAILED", requestId }));
      return jsonResponse({ ok: false, code: "SERVER_ERROR" }, 500);
    }

    const email = createEnquiryEmail(
      parsed.data,
      inserted.id,
      inserted.created_at,
    );
    const resend = new Resend(env.resendApiKey);
    let emailSent = false;
    try {
      const { error: emailError } = await resend.emails.send({
        from: env.fromEmail,
        to: env.toEmail,
        replyTo: parsed.data.email,
        subject: email.subject,
        text: email.text,
        html: email.html,
      });
      emailSent = !emailError;
    } catch {
      emailSent = false;
    }

    if (!emailSent) {
      console.error(JSON.stringify({ event: "contact_email_failed", code: "EMAIL_SEND_FAILED", requestId }));
      const { error: updateError } = await supabase
        .from("enquiries")
        .update({ email_error: "EMAIL_SEND_FAILED" })
        .eq("id", inserted.id);

      if (updateError) {
        console.error(JSON.stringify({ event: "contact_email_status_update_failed", code: "DATABASE_UPDATE_FAILED", requestId }));
      }
    } else {
      const { error: updateError } = await supabase
        .from("enquiries")
        .update({ email_sent: true, email_error: null })
        .eq("id", inserted.id);

      if (updateError) {
        console.error(JSON.stringify({ event: "contact_email_status_update_failed", code: "DATABASE_UPDATE_FAILED", requestId }));
      }
    }

    return jsonResponse({ ok: true });
  } catch {
    console.error(JSON.stringify({ event: "contact_submit_failed", code: "UNEXPECTED_ERROR", requestId }));
    return jsonResponse({ ok: false, code: "SERVER_ERROR" }, 500);
  }
}
