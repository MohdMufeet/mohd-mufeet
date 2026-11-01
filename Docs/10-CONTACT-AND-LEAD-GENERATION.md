# 10 — Contact and Lead Generation

> **Owner of:** form fields, validation rules, API contract, rate limits, lead data, lead handling.
> Flow overview lives in `06` §5; security controls in `12`. If a rule here changes, update the Zod schema in `lib/validations/contact.ts` (the single implementation of these rules, shared by client and server).

## 1. Goal

Turn a visitor's intent into a stored, notified, actionable enquiry with minimal friction, while resisting spam and never losing a valid lead.

## 2. Channels

| Channel | Behaviour | Label |
|---|---|---|
| Contact form | Primary channel | CURRENT + EXTERNAL |
| WhatsApp | `wa.me` link, new tab (`08` §7) | CURRENT (conditional, OQ-02) |
| Email | `mailto:` link | CURRENT (conditional, OQ-01) |
| LinkedIn | Profile link | CURRENT |

Channel visibility is driven by config; `null` hides the channel.

## 3. Form fields and validation (authoritative)

| Field | Name | Required | Rules | Error message (DRAFT) |
|---|---|---|---|---|
| Full Name | `fullName` | Yes | Trim; 2–80 chars; no control characters | "Please enter your full name (2–80 characters)." |
| Email Address | `email` | Yes | Trim; lowercase; valid email format; ≤ 254 chars | "Please enter a valid email address." |
| Subject | `subject` | Yes | Trim; 3–120 chars; no line breaks | "Please enter a subject (3–120 characters)." |
| Service Required | `service` | Yes | Enum: active service slugs + `other` | "Please choose a service." |
| Project Budget | `budget` | No | Enum (below) or empty | "Please choose a valid budget option." |
| Project Description | `message` | Yes | Trim; 20–2000 chars | "Please describe your project (20–2000 characters)." |
| Honeypot | `website` | Hidden | Must be empty; hidden from users and assistive tech (`aria-hidden`, `tabindex=-1`, `autocomplete=off`) | (silent) |
| Timing | `elapsedMs` | Hidden | Number; submissions faster than 3000 ms treated as spam signal | (silent) |

**Service options** are generated from active services in `services.ts` plus "Not sure yet / Other" (`other`). The `service` enum on the server is built from the same source, so hidden/coming-soon services are rejected.

**Budget options (DRAFT, OQ-11):** the owner must confirm currency and ranges. Until then the enum is `discuss` ("Prefer to discuss"), `small` ("Small project"), `medium` ("Medium project"), `large` ("Larger project") with no figures. Replace labels and values when OQ-11 is answered.

Validation behaviour: client validates on blur and submit; errors appear inline, linked via `aria-describedby`; focus moves to the first invalid field; server re-validates and returns `fieldErrors` keyed by field name.

## 4. Anti-spam

| Layer | Detail | Label |
|---|---|---|
| Honeypot | Non-empty → return generic success, store nothing | CURRENT |
| Time check | `elapsedMs` < 3000 → treat as spam: return generic success and store nothing | CURRENT |
| Content checks | Reject messages with excessive links (> 3 URLs) as `VALIDATION_ERROR` | CURRENT |
| Rate limiting | §5 | CURRENT |
| Origin check | Same-origin only | CURRENT |
| Turnstile | Challenge on submit; secret verified server-side | OPTIONAL + EXTERNAL (OQ-15) |
| Platform rule | Vercel Firewall rate limit on `POST /api/contact` | EXTERNAL (recommended) |

The honeypot and time signals are weak and spoofable; they reduce casual bots only.

## 5. Rate limiting (defaults; constants in one config)

| Scope | Limit | Window |
|---|---|---|
| Hashed IP | 3 stored enquiries | 1 hour |
| Hashed IP | 10 stored enquiries | 24 hours |
| Same email | 3 stored enquiries | 24 hours |

Implemented by counting recent `enquiries` rows (ADR-06). Exceeding → HTTP 429 `RATE_LIMITED`. IP is taken from the platform-provided forwarded header, hashed with HMAC (`IP_HASH_SECRET`); raw IPs are never stored or logged. Limitation: invalid/rejected attempts are not counted, hence the platform-level rule.

## 6. Storage

Schema: `06` §6.2. Stored fields: `full_name`, `email`, `subject`, `service_slug`, `budget_range`, `message`, `status`, `ip_hash`, `user_agent` (truncated), timestamps, `email_sent`, `email_error`.

Lead `status` values: `new` (only value written in v1), `contacted`, `in-discussion`, `won`, `lost`, `spam` (FUTURE values for dashboard; owner may update manually in Supabase until then).

Retention (DRAFT, confirm with OQ-22): keep enquiries only as long as needed to respond and for reasonable business records; owner reviews and deletes periodically; the privacy notice states this.

## 7. API contract — `POST /api/contact`

**Request:** `Content-Type: application/json`, body ≤ 10 KB, fields from §3.

| Outcome | HTTP | Body | Notes |
|---|---|---|---|
| Stored (and emailed or not) | 200 | `{ "ok": true }` | Email failure does not change the client response |
| Honeypot/time spam | 200 | `{ "ok": true }` | Nothing stored |
| Validation error | 400 | `{ "ok": false, "code": "VALIDATION_ERROR", "fieldErrors": { "<field>": "<message>" } }` | |
| Disallowed origin / bad content-type / too large | 400 | `{ "ok": false, "code": "BAD_REQUEST" }` | |
| Rate limited | 429 | `{ "ok": false, "code": "RATE_LIMITED" }` | Optional `Retry-After` |
| Database or unexpected error | 500 | `{ "ok": false, "code": "SERVER_ERROR" }` | No details leaked |
| Integrations not configured or submissions not enabled | 503 | `{ "ok": false, "code": "SERVICE_UNAVAILABLE" }` | UI shows the form preview with disabled fields until approved setup is complete |

Other methods → 405. Responses use `Cache-Control: no-store`.

## 8. UI states

| State | Behaviour |
|---|---|
| Idle | Empty form; service possibly pre-selected via `?service=` |
| Submissions disabled | Form preview remains visible with every field and the submit button disabled; explanatory status message points to confirmed contact channels |
| Validating | Inline errors; no network call until valid |
| Submitting | Button disabled + "Sending…", `aria-busy` on form; fields read-only |
| Success | Confirmation message (`role="status"`), form cleared; optional toast; link back to Home/Projects |
| Validation error (server) | Field errors mapped onto fields; focus first invalid |
| Rate limited | Message from `07` §11; input preserved |
| Server/network error | Error message with email/WhatsApp alternatives; input preserved; retry enabled |

## 9. Owner notification email (Resend)

| Part | Rule |
|---|---|
| To | `CONTACT_TO_EMAIL` |
| From | `CONTACT_FROM_EMAIL` (verified domain, OQ-14) |
| Reply-To | Enquirer's email (validated, single address) |
| Subject | `New enquiry: {subject}` — subject stripped of CR/LF and truncated to 120 chars |
| Body | Name, email, service, budget, message, timestamp, enquiry id. Plain text plus minimal HTML; all user values HTML-escaped; no remote images |
| Failure | Logged with code only; row `email_sent=false` for manual follow-up |

Optional auto-reply (FUTURE/OPTIONAL, ADR-10): only after owner approval and only to the submitted address, with generic text.

## 10. Measuring lead performance (no invented targets)

Count from `enquiries`: total enquiries, by `service_slug`, by month. Source attribution (e.g., `?ref=`/UTM capture) is OPTIONAL; if added, it needs a schema change, a privacy-notice update, and an ADR.

## 11. Manual handling process (v1)

1. Owner receives notification email; replies from own mailbox using Reply-To.
2. If no email arrives, check `enquiries` where `email_sent = false`.
3. Owner updates `status` manually in Supabase if desired.
4. Spam is deleted periodically.

## 12. Privacy

A short notice sits beside the form and links to `/privacy` (CURRENT conditional, OQ-22). No analytics or marketing trackers run on the form. Data processors: Supabase and Resend (listed in the notice).
