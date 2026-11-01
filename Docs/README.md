# Mohd Mufeet – Freelance Developer Portfolio

Personal website for **Mohd Mufeet – Freelance Full Stack Developer (MERN Stack)**, based in Kanpur, Uttar Pradesh, India. It presents real projects, builds trust honestly, and turns visitors into freelance enquiries.

> **Status:** Phases 1–4 are implemented. The six documented development service groups were approved on 2026-11-01; service copy still needs review before launch. Further implementation proceeds phase by phase after owner approval (see `AGENTS.md`).

This is a personal brand site, **not** an agency site.

## Links

- Current portfolio: https://mufeetportfolio.netlify.app/
- GitHub: https://github.com/MohdMufeet
- LinkedIn: https://www.linkedin.com/in/mohd-mufeet/
- Client Blog Platform (project): https://blog-for-client-fhod.vercel.app/

## Planned stack

Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Lucide React, Framer Motion, React Hook Form, Zod, Supabase, Resend, Vercel, GitHub. Exact versions will be pinned in Phase 1 and recorded here.

## Documentation

| File | Contents |
|---|---|
| `AGENTS.md` | Rules and workflow for AI coding agents |
| `docs/01-PROJECT-OVERVIEW.md` | Scope, feature status, conventions, open questions |
| `docs/02-BRAND-AND-BUSINESS-STRATEGY.md` | Positioning, claims policy, conversion strategy |
| `docs/03-FUNCTIONAL-REQUIREMENTS.md` | Functional and non-functional requirements |
| `docs/04-DESIGN-SYSTEM.md` | Tokens, typography, components, motion |
| `docs/05-UI-UX-STRUCTURE.md` | Sitemap, layouts, navigation, hero, case study template |
| `docs/06-TECHNICAL-ARCHITECTURE.md` | Stack, folders, data flow, schema, env vars, ADRs |
| `docs/07-CONTENT-AND-COPY.md` | All public copy with approval status |
| `docs/08-SOCIAL-MEDIA-INTEGRATION.md` | Social/contact link config and rules |
| `docs/09-SERVICES-AND-SCALABILITY.md` | Service model, expansion process, future roadmap |
| `docs/10-CONTACT-AND-LEAD-GENERATION.md` | Form, validation, API contract, rate limits |
| `docs/11-SEO-AND-PERFORMANCE.md` | Metadata, structured data, performance budgets |
| `docs/12-SECURITY-AND-VALIDATION.md` | Security controls |
| `docs/13-TESTING-STRATEGY.md` | Tests and definition of done |
| `docs/14-IMPLEMENTATION-ROADMAP.md` | Ten phases with acceptance criteria |

Reading order for newcomers: `01` → `02` → `06` → `05` → `04` → `03` → `10` → `07` → rest.

## Getting started

From the project root, run `npm ci`, copy `.env.example` to `.env.local`, then
run `npm run dev`. The environment values are intentionally empty; external
integrations and contact channels remain inactive until configured.

Environment variables are listed in `06-TECHNICAL-ARCHITECTURE.md` §7. Never
commit secrets.

## Adding or updating site content

There is no CMS or admin dashboard yet. Content is kept in typed files under
`src/config/`; after changing content, run the checks and deploy the site.

| Content | File | Notes |
|---|---|---|
| Projects and case studies | `src/config/projects.ts` | Add one object per real project. A project appears publicly only when `status` is `"published"` and `verified` is `true`. Fill in only confirmed details; the case-study page uses the object's `slug`. |
| Testimonials | `src/config/testimonials.ts` | Add genuine feedback only after the client has given permission. `permissionConfirmed` must be `true`; testimonials then appear in the homepage section. |
| Services | `src/config/services.ts` | Add or edit service entries; use unique slugs and verified, published project slugs for `projectRefs`. |
| Skills | `src/config/skills.ts` | Edit the skills groups and items. |
| Experience | `src/config/experience.ts` | Add verified roles and dates. |
| About and photo | `src/config/about.ts` | Edit the introduction/background and set a supplied photo path if available. |
| Work process | `src/config/process.ts` | Edit the process steps. |
| Social/contact links | `src/config/social.ts` | Set profile URLs and placements. Email and WhatsApp links are currently unset. |
| Site name, description, contact details | `src/config/site.ts` | Update site metadata and approved contact details. |

Currently, the only project recorded is **Client Blog Platform**. It is still a
draft and is hidden until its details are verified and approved. Other projects
are not listed yet; add them to `src/config/projects.ts` once their names,
links, role, technologies, and publishable details are supplied and confirmed.

The `.env.example` file is **not** where project, testimonial, or social links
are added. It contains deployment configuration:

| Variable(s) | What to put there / where to get it |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The portfolio's final HTTPS domain (your Vercel domain or custom domain). |
| `SUPABASE_URL` | The Supabase project's URL from its project/API settings. |
| `SUPABASE_SERVICE_ROLE_KEY` | The Supabase service-role key from project/API settings. Keep it secret; never use a `NEXT_PUBLIC_` prefix. |
| `RESEND_API_KEY` | An API key created in your Resend account. Keep it secret. |
| `CONTACT_TO_EMAIL` | The inbox where contact-form notifications should arrive. |
| `CONTACT_FROM_EMAIL` | A sender address verified in Resend for your domain. |
| `IP_HASH_SECRET` | A strong, randomly generated secret used to hash submitted IP addresses. Keep it secret. |
| `CONTACT_SUBMISSIONS_ENABLED` | Leave `false` until privacy approval, the Supabase migration, and all required contact settings are ready; only then set it to `true`. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Optional Cloudflare Turnstile site key and secret from its widget settings. The secret must stay server-side. |

For local development, put actual values in the git-ignored `.env.local`. For
production, add them in the hosting provider's environment-variable settings
(for Vercel: Project Settings → Environment Variables). Keep `.env.example`
committed with empty values only. Public profile, project, email, and WhatsApp
links belong in the `src/config/` files above, not in environment variables.

## Contributing / agent workflow

1. Read all docs.
2. Submit an implementation plan and wait for approval.
3. Work phase by phase; report honestly; keep docs updated.

## Open questions

The owner-input register is in `docs/01-PROJECT-OVERVIEW.md` §9. Blocking items include: public email, WhatsApp number, production domain, KAP Controls details, Client Blog Platform details, About content, Supabase/Resend setup, and privacy-notice wording.

## License

To be decided by the owner. No license is granted until one is added.
