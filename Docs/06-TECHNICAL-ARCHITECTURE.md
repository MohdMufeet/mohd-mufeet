# 06 — Technical Architecture

> **Owner of:** stack, folder layout, data flow, env vars, database schema, ADRs, dependency policy.
> This document contains structure and contracts, not implementation code.

## 1. Architecture summary

A statically generated Next.js (App Router) site. Content comes from typed config modules. One dynamic server endpoint (`/api/contact`) validates and stores enquiries in Supabase and sends a notification through Resend. Deployed on Vercel from GitHub.

```
Browser ──► Vercel (Next.js)
              ├─ Static/Server Components ◄── typed config modules (content)
              └─ Route Handler /api/contact ──► Supabase (enquiries)
                                           └─► Resend (email to owner)
```

## 2. Stack

| Layer | Choice | Responsibility |
|---|---|---|
| Framework | Next.js, App Router | Routing, rendering, metadata, route handlers |
| UI | React, TypeScript (strict) | Components, types |
| Styling | Tailwind CSS | Tokens → utilities |
| Component primitives | shadcn/ui (copied components) | Accessible base UI |
| Icons | Lucide React; local SVGs for brands | Icons |
| Motion | Framer Motion (`LazyMotion`) | Subtle animation |
| Forms | React Hook Form + Zod (`@hookform/resolvers`) | Client validation; shared schema |
| Database | Supabase (Postgres) | Enquiry storage; future backend |
| Email | Resend | Owner notification |
| Hosting | Vercel | Build, deploy, previews |
| Source | GitHub | VCS, PRs, secret scanning |

Version policy (A-05): use the latest stable releases at Phase 1, pin exact versions via lockfile, record versions in `README.md`. Node.js LTS.

## 3. Folder structure (target)

```
src/
  app/
    layout.tsx            root layout, fonts, global metadata, JSON-LD (WebSite/Person)
    page.tsx              Home (composes sections)
    not-found.tsx
    sitemap.ts
    robots.ts
    about/page.tsx
    services/page.tsx
    projects/page.tsx
    projects/[slug]/page.tsx
    contact/page.tsx
    privacy/page.tsx      (conditional, OQ-22)
    api/contact/route.ts  POST handler
  components/
    ui/                   shadcn primitives
    layout/               navbar, mobile-menu, footer, container, section
    sections/             hero, skills, services, featured-projects, about,
                          experience, process, testimonials, contact
    projects/             project-card, case-study blocks
    contact/              contact-form, status-message, contact-channels
    shared/               button-link, tech-chip, reveal, empty/error state, json-ld
    icons/                brand SVG icon components
  config/
    site.ts               name, title, url, location, default SEO, contact channels
    navigation.ts
    social.ts
    skills.ts
    services.ts
    projects.ts
    experience.ts
    about.ts
    process.ts
    testimonials.ts       empty array by default
  lib/
    content.ts            accessor functions (getServices, getProjects…): the only layer pages import for data
    validations/contact.ts  Zod schema + enums (single source of truth)
    supabase/server.ts    server-only client factory
    email/resend.ts       server-only mail sender + template
    security/             rate-limit, ip-hash, origin-check, sanitize helpers
    seo/metadata.ts       metadata builders
    seo/json-ld.ts        structured-data builders
    utils.ts
  types/                  shared TypeScript types
  styles/globals.css      tokens + Tailwind layers
public/                   static assets, og-default image, resume PDF (when supplied)
docs/                     this documentation
```

## 4. Rendering strategy

| Route | Strategy |
|---|---|
| All public pages | Static generation (Server Components by default) |
| `/projects/[slug]` | `generateStaticParams` from projects config; `dynamicParams = false` |
| `/api/contact` | Dynamic, Node.js runtime |
| Client components | Only: mobile menu, scroll-spy, reveal wrappers, contact form, toast host |

Client components stay small and leaf-level. Data is never fetched client-side for content.

## 5. Contact submission data flow

```
ContactForm (client, RHF+Zod)
  └─ POST /api/contact (JSON)
        1. Method/content-type and body-size check (reject > 10 KB)
        2. Origin check (same-origin only)
        3. Honeypot non-empty or elapsedMs < 3000 → return generic success, store nothing
        4. Zod validation (server schema, authoritative)           → 400 on failure
        5. Rate limit by hashed IP + email                         → 429 on exceed
        6. Insert row into Supabase `enquiries` (status=new)       → 500 on failure (no email)
        7. Send Resend notification to owner
        8. Update row: email_sent true/false, email_error (generic code)
        9. Respond 200 { ok: true } (even if email failed; enquiry is safe)
```

**Response contract** (full spec in `10` §7):

| Case | HTTP | Body |
|---|---|---|
| Success | 200 | `{ ok: true }` |
| Validation | 400 | `{ ok: false, code: "VALIDATION_ERROR", fieldErrors }` |
| Rate limited | 429 | `{ ok: false, code: "RATE_LIMITED" }` |
| Server | 500 | `{ ok: false, code: "SERVER_ERROR" }` |

Design note: rate limiting counts stored enquiries by hashed IP. Because rejected requests are not stored, add a platform-level rule (Vercel Firewall rate limit on `/api/contact`) as a supplementary EXTERNAL control (`12` §7).

## 6. Data models

### 6.1 Config types (conceptual)

| Type | Fields |
|---|---|
| `Service` | `slug`, `category`, `title`, `summary`, `description`, `benefits[]`, `technologies[]`, `projectRefs[]` (slugs), `cta {label, href}`, `status: active \| coming-soon \| hidden`, `order` |
| `Project` | `slug`, `title`, `summary`, `featured`, `status: published \| draft`, `liveUrl \| null`, `githubUrl \| null`, `image \| null`, `technologies[]`, `role`, `timeframe \| null`, `caseStudy { overview, problem, solution, features[], challenges[], outcome } ` (each field `null` if unverified), `verified: boolean` |
| `ExperienceItem` | `company`, `companyUrl \| null`, `role`, `period`, `type \| null`, `highlights[]` |
| `Skill group` | `group`, `items[]` |
| `SocialLink` | see `08` §3 |
| `Testimonial` | `quote`, `author`, `role \| null`, `permissionConfirmed: true` |

Rule: a project with `verified: false` or `status: draft` is not rendered or listed in sitemap.

### 6.2 Supabase table `enquiries`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid, PK, default generated | |
| `created_at` | timestamptz, default now | |
| `full_name` | text | 2–80 chars |
| `email` | text | ≤ 254 |
| `subject` | text | 3–120 |
| `service_slug` | text | active service slug or `other` |
| `budget_range` | text, nullable | enum value |
| `message` | text | 20–2000 |
| `status` | text | default `new` (values in `10` §6) |
| `ip_hash` | text | HMAC of IP with secret; never raw IP |
| `user_agent` | text, nullable | truncated 200 |
| `email_sent` | boolean | default false |
| `email_error` | text, nullable | short code only |

Security: Row Level Security **enabled with no policies for `anon`/`authenticated`**; all access via the server using the service role key. Indexes on `created_at` and (`ip_hash`, `created_at`). Migration SQL lives in `supabase/migrations/` (created in Phase 7).

## 7. Environment variables

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | Canonical base URL (OQ-05) |
| `CONTACT_SUBMISSIONS_ENABLED` | server | Explicit enable flag; must be `true` only after privacy notice approval and integration setup |
| `SUPABASE_URL` | server | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | **server secret** | Insert enquiries; never exposed |
| `RESEND_API_KEY` | **server secret** | Send email |
| `CONTACT_TO_EMAIL` | server | Where notifications go |
| `CONTACT_FROM_EMAIL` | server | Verified sender (OQ-14) |
| `IP_HASH_SECRET` | **server secret** | HMAC key for `ip_hash` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | public / secret | OPTIONAL (OQ-15) |

Rules: secrets only in Vercel env settings and local `.env.local` (git-ignored); commit `.env.example` with names and empty values only; no secret is ever prefixed `NEXT_PUBLIC_`; server-only modules import `server-only`.

The contact API returns `503 SERVICE_UNAVAILABLE` and the UI does not collect form data until `CONTACT_SUBMISSIONS_ENABLED=true` and all required Supabase/Resend settings are present. This gate stays off until OQ-22 is resolved and the migration is applied.

## 8. Error handling and logging

- Route handler wraps all steps in try/catch; returns only the codes in §5.
- Server logs: event name, error code, request id, timestamp. **Never** log message bodies, emails, or IPs.
- Client: network failure and 5xx show a friendly error with email/WhatsApp fallback.
- A React error boundary (`error.tsx`) provides a branded fallback for unexpected render errors; `not-found.tsx` handles 404.

## 9. Deployment

- GitHub `main` is production; feature branches get Vercel preview deployments; PRs required (branch protection, `12` §10).
- Separate Supabase/Resend keys for preview vs production when possible.
- Domain and redirects per OQ-05; Resend domain verification (SPF/DKIM) before launch.
- Build must pass type-check, lint, and tests (`13`).

## 10. Dependency policy

Allowed at start: those in §2, plus `server-only`, `clsx`/`tailwind-merge`/`class-variance-authority` (shadcn requirements), `@supabase/supabase-js`, `resend`, `sonner`. Dev: ESLint, Prettier, Vitest, Testing Library, Playwright (`13`).
Anything else requires: a stated need, a check that platform/Next features can't solve it, an ADR entry, and owner approval.

## 11. Coding conventions

Strict TS (`strict`, `noUncheckedIndexedAccess` recommended); no `any`; path alias `@/`; named exports for components, default only where Next requires; files kebab-case, components PascalCase; no business data inside components; props typed; no dead code; comments explain *why*.

## 12. Architecture decision records

| ID | Decision | Rationale | Alternatives rejected |
|---|---|---|---|
| ADR-01 | Route Handler `/api/contact` (not Server Action) | Explicit contract, easy rate-limit/test, reusable by future clients | Server Action (less explicit HTTP semantics) |
| ADR-02 | Store first, then email | Never lose a valid lead | Email-only (loses data), email-first |
| ADR-03 | Service-role access only from server; RLS on with no public policies | Smallest attack surface | Anon insert policy |
| ADR-04 | Content in typed TS config (no MDX/CMS) | No extra deps; simple; typed; swap-able via `lib/content.ts` | MDX, headless CMS, Supabase tables (premature) |
| ADR-05 | Single dark theme in v1 | Less surface, quality over breadth | Dual theme + `next-themes` |
| ADR-06 | Rate limit with DB lookups on hashed IP | No extra service/dependency | Upstash/Redis (extra dependency) |
| ADR-07 | Local SVG brand icons | Lucide has deprecated/removed brand icons in recent versions (verify installed version) | Extra icon library |
| ADR-08 | Static generation for all pages | Best performance/SEO | SSR for content |
| ADR-09 | Honeypot + time check + rate limit baseline; Turnstile optional | Low friction, no third party by default | CAPTCHA always |
| ADR-10 | Owner notification only at launch; auto-reply OPTIONAL | Avoid abuse as mail relay | Auto-reply by default |

## 13. Future architecture seams (not built)

`lib/content.ts` is the only data access layer, so moving services/projects/testimonials to Supabase tables later changes one module. `enquiries` already has `status` to support a lead dashboard. Route groups can host `/admin` later behind Supabase Auth. See `09` §6.
