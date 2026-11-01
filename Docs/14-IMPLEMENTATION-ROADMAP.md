# 14 — Implementation Roadmap

> **Owner of:** phases, deliverables, dependencies, acceptance criteria.
> Process: the coding agent first submits an implementation plan and **waits for owner approval** (see `AGENTS.md`). Each phase ends with a short report listing what is done, what is not, and open OQs. Never mark incomplete work as complete.

## Overview

| Phase | Name | Depends on |
|---|---|---|
| 1 | Project Setup and Architecture | Approval of plan |
| 2 | Design System and Shared Components | 1 |
| 3 | Navbar and Hero | 2 |
| 4 | Skills and Services | 2 |
| 5 | Projects and Case Studies | 2, OQ-07/08 for content |
| 6 | About and Experience | 2, OQ-06/09 for content |
| 7 | Contact and Lead Generation | 2, OQ-01/02/05/14 |
| 8 | Responsive Design and Animations | 3–7 |
| 9 | SEO and Performance | 3–7, OQ-05 |
| 10 | Testing and Deployment | All |

Phases 3–6 may run in any order after Phase 2; Phase 7's backend work can start once Supabase/Resend accounts exist.

## Phase 1 — Project Setup and Architecture
- **Objectives:** Working Next.js project matching `06`.
- **Tasks:** Initialise Next.js (App Router, TS strict, Tailwind); configure ESLint and path alias; add Prettier only after approval under `06` §10; create the folder structure per `06` §3, typed config modules with schemas and `lib/content.ts`, `.env.example`, `.gitignore`, CI, and setup documentation; connect GitHub and Vercel when owner access is available; install only approved dependencies; record pinned versions in README.
- **Deliverables:** Running skeleton with placeholder-free empty config; CI workflow; deployment of the skeleton to a Vercel preview.
- **Dependencies:** Owner approval of plan; GitHub/Vercel access.
- **Acceptance:** `build`, type-check, lint pass; no unapproved dependencies; no secrets in repo; folder layout matches `06`.

## Phase 2 — Design System and Shared Components
- **Objectives:** Implement `04`.
- **Tasks:** Tokens in `globals.css`/Tailwind theme; fonts via `next/font`; install needed shadcn primitives; build `Container`, `Section`, `SectionHeading`, `ButtonLink`, `TechChip`, `Reveal`, `StatusMessage`, `EmptyState`, `ErrorState`, `JsonLd`; owner approves palette (OQ-17).
- **Deliverables:** Component set, plus a temporary internal preview route for design review that is removed before launch.
- **Dependencies:** Phase 1.
- **Acceptance:** Tokens only (no hardcoded colours); contrast checks pass; focus states visible; works at 320 px; reduced-motion honoured.

## Phase 3 — Navbar and Hero
- **Objectives:** First impression and navigation.
- **Tasks:** Navbar, mobile sheet, skip link, scroll-spy, smooth scroll; Hero with approved copy and manifest panel; footer shell.
- **Deliverables:** Layout shell used by all routes; Hero section.
- **Dependencies:** Phase 2.
- **Acceptance:** FR-NAV-01…05, FR-HOME-02; hero text is LCP; keyboard and screen-reader pass; no horizontal scroll at 320 px.

## Phase 4 — Skills and Services
- **Objectives:** Data-driven skills and services.
- **Tasks:** `skills.ts`, `services.ts` per `09`; Skills section; Services section and `/services` page; CTA with `?service=`; coming-soon/hidden logic.
- **Deliverables:** Sections and page; config validation.
- **Dependencies:** Phase 2; OQ-12 approval.
- **Acceptance:** FR-HOME-03/04, FR-SVC-01…03; hidden services absent everywhere; no proficiency indicators.
- **Status (2026-11-01):** Implemented. All six documented development services are active with owner approval; both service surfaces share one data-driven card, service enquiry links include `?service=<slug>`, and config validation rejects duplicate slugs or references to unverified projects. Service descriptions and benefits use draft copy from `07` and need launch review; project references remain empty pending OQ-07 verification.

## Phase 5 — Projects and Case Studies
- **Objectives:** Honest project showcase.
- **Tasks:** `projects.ts`; `ProjectCard`; `/projects`; `/projects/[slug]` with template per `05` §8; static params; unverified-field omission; empty states; Featured Projects section.
- **Deliverables:** Projects pages with verified content only.
- **Dependencies:** Phase 2; owner-verified content (OQ-07/08).
- **Acceptance:** FR-PROJ-01/02/03/05, FR-PAGE-02; no invented content; unverified projects not published.
- **Status (2026-11-01):** Verified-only cards, statically generated case-study routes, conditional case-study fields, and empty-state/404 handling are implemented. No case study is published because OQ-07 content verification is still outstanding.

## Phase 6 — About and Experience
- **Objectives:** Credible, accurate personal story.
- **Tasks:** `about.ts`, `experience.ts`, `process.ts`; About section/page; Experience; Work Process; conditional Testimonials section.
- **Deliverables:** About, Experience, Process, Testimonials (hidden).
- **Dependencies:** Phase 2; OQ-06/09/18.
- **Acceptance:** KAP Controls wording matches `07` §7 exactly; no forbidden phrasing; testimonials hidden when empty; unresolved MISSING items listed.
- **Status (2026-11-01):** About, skills, services links, and conditional experience surfaces are implemented. Unverified experience and missing personal story fields remain omitted; process and testimonials remain absent until approved/genuine content is supplied (OQ-06/09/18/20).

## Phase 7 — Contact and Lead Generation
- **Objectives:** Working enquiry pipeline.
- **Tasks:** Zod schema; `ContactForm`; `/api/contact` per `06` §5/`10` §7; Supabase migration and RLS; Resend integration; rate limiting; honeypot/time check; origin check; contact channels; social config (`08`); `/privacy` (if approved); optional Turnstile (if OQ-15).
- **Deliverables:** End-to-end contact flow on a preview environment.
- **Dependencies:** Phase 2; Supabase/Resend accounts, verified sender (OQ-14), contact details (OQ-01/02).
- **Acceptance:** FR-CON-01…09, FR-SOC-01…03, T-FORM, T-API, T-SEC, T-SOC tests pass; real test enquiry stored and emailed; secrets absent from bundle; rate limit verified.
- **Status (2026-11-01):** Shared client/server Zod validation, accessible form UI, origin/body checks, honeypot/time checks, hashed-IP and email DB-backed limits, Supabase store-first/Resend notification, and RLS migration are implemented. Form submissions are deliberately disabled until OQ-22 privacy approval and Supabase/Resend configuration are complete. No real integration test has been run.

## Phase 8 — Responsive Design and Animations
- **Objectives:** Polish without bloat.
- **Tasks:** Review all breakpoints; add `Reveal` and hover/focus transitions per `04` §7; `LazyMotion`; reduced-motion behaviour; fix layout issues.
- **Deliverables:** Responsive, lightly animated site.
- **Dependencies:** Phases 3–7.
- **Acceptance:** T-RES-01; no CLS from animation; animations limited to allowed list; INP unaffected.
- **Status (2026-11-01):** Responsive form layouts, mobile-stacked hero CTAs, card hover/focus transitions, and reduced-motion styles are implemented. Manual multi-browser/device review remains pending.

## Phase 9 — SEO and Performance
- **Objectives:** Meet `11`.
- **Tasks:** Metadata for all routes; canonical; OG/Twitter; default OG image; sitemap; robots; JSON-LD; image/font optimisation; bundle review; Lighthouse fixes; security headers (CSP report-only → enforce).
- **Deliverables:** SEO and performance baseline report.
- **Dependencies:** Phases 3–7; OQ-05 for canonical domain.
- **Acceptance:** T-SEO-01, T-PERF-01; budgets in `11` §8 met or deviations documented with reason.
- **Status (2026-11-01):** Per-route metadata, generated OG image, safe Person/WebSite/CreativeWork JSON-LD, sitemap, robots, and report-only CSP/security headers are implemented. Canonicals and sitemap URLs remain unavailable until OQ-05 supplies a production URL; Lighthouse targets have not been measured.

## Phase 10 — Testing and Deployment
- **Objectives:** Launch-ready site.
- **Tasks:** Complete test matrix (`13`); manual QA; accessibility audit; production env setup; domain/DNS; Resend domain verification; Search Console/Bing submission; Netlify redirect plan; final doc review; launch checklist.
- **Deliverables:** Production deployment; handover notes.
- **Dependencies:** All prior phases; OQ-05/14.
- **Acceptance:** Definition of done (`13` §4) for every feature; launch checklist (§12) complete; docs match the implemented behaviour.
- **Status (2026-11-01):** Lint, TypeScript, unit tests, production dependency audit, and production build are covered in CI. Production deployment, manual accessibility/performance QA, RLS verification, live enquiry test, production security-header verification, and owner launch sign-off remain outstanding.

## 11. Approval gates

1. Implementation plan approval before Phase 1.
2. Palette/typography approval at end of Phase 2.
3. Content approval (copy, projects, experience) before Phases 5–6 publish.
4. Preview review before Phase 9.
5. Final owner sign-off before production cutover.

## 12. Pre-launch checklist

- [ ] All blocking OQs in `01` §9 answered or consciously deferred (and the related UI hidden)
- [ ] Every `MISSING` and `DRAFT` item in `07` resolved or approved as-is
- [ ] No `null` launch-required values rendered or silently broken
- [ ] KAP Controls and Client Blog Platform copy verified by owner
- [ ] Contact flow tested end to end on production-like environment
- [ ] Security acceptance (`12` §13) complete
- [ ] SEO and performance budgets checked
- [ ] Privacy notice approved (OQ-22)
- [ ] Redirect/cutover plan for the Netlify site ready (OQ-05)

## 13. Post-launch backlog (FUTURE, not planned work)

Analytics decision, blog, resume page, admin dashboard, additional service categories, testimonials once genuine.
