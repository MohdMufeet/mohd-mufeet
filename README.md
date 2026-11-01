# Mohd Mufeet – Freelance Developer Portfolio

Personal portfolio for Mohd Mufeet, a Freelance Full Stack Developer based in
Kanpur, Uttar Pradesh, India. This is an individual developer's website, not an
agency site. Public claims and project details follow the source documentation
in [`Docs/`](./Docs/README.md).

## Stack

- Next.js App Router, React, TypeScript (strict), and Tailwind CSS
- Zod for typed runtime validation
- Geist Sans and Geist Mono through `next/font`
- npm lockfile with pinned package versions

Pinned versions: Next.js 16.4.3, React/React DOM 19.3.1, TypeScript 5.9.3,
Tailwind CSS 4.3.3, ESLint 9.39.5, Zod 4.6.7, Supabase JS 2.118.0, Resend
6.37.0, React Hook Form 7.91.0, and Vitest 5.0.5. The exact full dependency
tree is recorded in `package-lock.json`.

The contact pipeline uses Supabase and Resend after owner-controlled setup.
Enquiry collection remains disabled until the privacy notice is approved, the
migration is applied, all server-side environment values are configured, and
`CONTACT_SUBMISSIONS_ENABLED=true`. No credentials belong in the repository.

The site defaults to dark mode. Use the Theme button in the navbar to switch
between dark and light mode; the choice is saved in this browser.

## Local development

Use Node.js 24 LTS and npm:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available checks:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The environment template intentionally contains empty values. The public domain,
contact email, WhatsApp number, and integration credentials are not configured.
Features depending on those values remain hidden or inactive.

## Launch blockers

- Set `NEXT_PUBLIC_SITE_URL` to the approved HTTPS production domain.
- Resolve privacy notice/legal review (OQ-22) before enabling contact collection.
- Create/configure Supabase and Resend, apply
  [`supabase/migrations/20261101100000_create_enquiries.sql`](./supabase/migrations/20261101100000_create_enquiries.sql),
  and set server-side env vars. Do not paste credentials into chat or commit them.
- Keep `CONTACT_SUBMISSIONS_ENABLED=false` until the above steps are complete.
- Verify project and experience details (OQ-06/07/09), service wording, contact
  details (OQ-01/02), and draft budget wording (OQ-11) before launch.
- Run manual accessibility, browser, responsive, Lighthouse, RLS, and end-to-end
  enquiry checks; configure Vercel and production DNS using owner accounts.

## Project layout

- `src/app/` — Next.js routes and root layout
- `src/components/` — reusable UI (added by implementation phases)
- `src/config/` — typed site content and confirmed links
- `src/lib/content.ts` — the public content access layer
- `src/types/` — Zod schemas and inferred content types
- `Docs/` — requirements, architecture, security, and implementation plan
- [`Docs/README.md`](./Docs/README.md) — where to add projects, testimonials, other content, and environment values
- [`Docs/04-DESIGN-SYSTEM.md`](./Docs/04-DESIGN-SYSTEM.md) — color tokens and theme behavior

GitHub Actions runs lint, type-check, and production build checks on pushes to
`main` and pull requests. Vercel, Supabase, and Resend setup still requires
owner-controlled accounts and configuration.
