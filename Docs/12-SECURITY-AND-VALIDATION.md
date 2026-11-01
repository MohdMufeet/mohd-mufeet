# 12 — Security and Validation

> **Owner of:** security controls and validation policy. Field-level rules are owned by `10` §3 (single Zod schema); this document defines *how* they are enforced.

## 1. Threat model (scope: public portfolio + one write endpoint)

| Threat | Vector | Control |
|---|---|---|
| Secret leakage | Keys in client bundle or repo | §2 |
| Spam / abuse of contact form | Bots, mail-relay abuse | §7, `10` §4–5 |
| Injection (XSS, header injection) | Form values rendered in email or page | §5 |
| Data exposure | Open database access | §3 |
| CSRF / cross-site posts | Third-party sites posting to `/api/contact` | §6 |
| Supply-chain compromise | Malicious dependency | §9 |
| Clickjacking, mixed content | Framing, insecure resources | §8 |
| Privacy harm | Excess personal data collection/logging | §10, `06` §8 |

## 2. Secrets

- Secrets exist only in Vercel environment variables and local `.env.local`.
- `.env.local` and all `.env*` except `.env.example` are git-ignored; `.env.example` lists names with empty values.
- No secret uses the `NEXT_PUBLIC_` prefix. `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `IP_HASH_SECRET`, `TURNSTILE_SECRET_KEY` are read only in server-only modules (`import "server-only"`).
- Never log secrets; never return them in responses or errors.
- If a key is ever exposed (commit, screenshot, log): rotate immediately in Supabase/Resend, update Vercel env, redeploy, and review GitHub secret-scanning alerts.
- Agents must never ask for, accept, or write real credentials into files or docs.

## 3. Database (Supabase)

- RLS **enabled** on `enquiries`, **no** policies for `anon` or `authenticated`.
- Only the server (service role) inserts/reads; the browser never talks to Supabase in v1.
- Parameterised queries via the client library only; no string-built SQL.
- Column constraints mirror validation (length checks) as defence in depth.
- Backups/retention follow Supabase plan; owner reviews retention (`10` §6).

## 4. Validation policy

1. **Server validation is authoritative.** Client validation is UX only.
2. One Zod schema, imported by both client form and route handler (`lib/validations/contact.ts`).
3. Use strict object parsing: unknown fields rejected or stripped.
4. Trim and normalise (email lowercase) before validation; enforce max lengths before any processing.
5. Enforce enum values from config (`10` §3); never trust client-supplied service names.
6. Reject bodies > 10 KB and non-JSON content types.
7. Return field-level messages for validation failures; generic messages for everything else.
8. Same rule for every future write endpoint.

## 5. Output encoding and injection

- React escapes by default; **no `dangerouslySetInnerHTML`** except the `JsonLd` component, which serialises with `<`/`>`/`&` escaped.
- Email HTML escapes every user-supplied value; subject/header values have CR/LF removed and are length-limited; Reply-To is a single validated address.
- No user-supplied URLs are rendered as links. If a future feature does, allow `https:` only.
- Config URLs validated at build (`08` §6).

## 6. Request integrity

- Origin/Referer check: `/api/contact` accepts requests only from the site's own origin(s) (from `NEXT_PUBLIC_SITE_URL` and the Vercel preview host in non-production).
- No cookies/sessions in v1, so classic CSRF risk is low; the origin check and JSON-only content type provide defence in depth.
- No permissive CORS headers.
- Methods other than POST → 405.

## 7. Abuse protection

Layers (details in `10` §4–5): honeypot, time check, link-count check, DB-backed rate limits on hashed IP/email, optional Turnstile (OQ-15), and a recommended Vercel Firewall rate-limit rule on `POST /api/contact` (EXTERNAL). Response messages must not reveal which check fired.

IP handling: derive from platform forwarded header, HMAC with `IP_HASH_SECRET`, store only the hash.

## 8. HTTP security headers (set in `next.config` headers)

| Header | Policy |
|---|---|
| `Content-Security-Policy` | Start in **report-only** during development; restrict `default-src 'self'`; allow only required script/style/img/font/connect sources; `frame-ancestors 'none'`; `base-uri 'self'`; `form-action 'self'`. Enforce after verifying nothing breaks (Next may need nonces/hashes for inline scripts; resolve during Phase 10) |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Disable unused features (camera, microphone, geolocation, etc.) |
| `Strict-Transport-Security` | Enabled on production domain (Vercel provides HTTPS; confirm HSTS) |
| `X-Frame-Options` | `DENY` (alongside CSP `frame-ancestors`) |

Optional Turnstile requires adding Cloudflare's script/frame origins to CSP only if enabled.

## 9. Dependency and supply-chain hygiene

- Commit the lockfile; pin versions; no wildcard ranges for runtime dependencies.
- Enable Dependabot (or equivalent) and run `npm audit` in CI; review changes before merging.
- Add dependencies only per `06` §10.
- Do not copy code from untrusted sources; review shadcn-generated components as project code.

## 10. Repository and platform security (EXTERNAL, owner actions)

GitHub: enable secret scanning and push protection, 2FA, branch protection on `main` (PR + passing checks). Vercel: restrict env var access, separate preview/production secrets, enable deployment protection for previews if desired. Supabase/Resend: 2FA, least-privilege keys, rotate periodically.

## 11. Privacy and data minimisation

Collect only fields in `10` §6; no raw IPs; no third-party trackers by default; privacy notice (OQ-22) lists purposes, processors (Supabase, Resend), retention, and contact for deletion requests. Owner should confirm legal obligations with qualified advice; the docs do not provide legal advice.

## 12. Error handling policy

Client sees friendly, non-technical messages. Server logs event + code + request id only. Unexpected errors return `SERVER_ERROR`. Stack traces never leave the server.

## 13. Security acceptance checklist

- [ ] No secret in repo history, client bundle, or logs
- [ ] RLS on, no public policies, verified with anon key test
- [ ] Server rejects invalid/oversized/cross-origin requests
- [ ] Email content escaped; header injection test passes
- [ ] Rate limit returns 429 after threshold
- [ ] Headers verified in production response
- [ ] External links have `rel="noopener noreferrer"`
- [ ] Dependabot/audit enabled
