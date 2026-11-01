# AGENTS.md — Instructions for Coding Agents

Project: **Mohd Mufeet – Freelance Developer Portfolio** (personal brand site, not an agency).
Status: Phases 1–4 implemented; continue phase by phase after owner approval.

## 0. First actions (mandatory)

1. Read **all** files in `docs/` (`01`–`14`) and `README.md` before writing anything.
2. Prepare a written **implementation plan** (phases from `docs/14`, files to create, dependencies to add, open questions that block you).
3. **Stop and wait for the owner's explicit approval** of the plan. Do not scaffold, install, or generate code before approval.
4. After approval, work one phase at a time and report at the end of each phase.

## 1. Rules

1. **Read all documentation before implementation.** Re-read the relevant doc before each task.
2. **Follow the approved design system** (`docs/04`): tokens only; no hardcoded colours, radii, or spacing; respect the anti-pattern list.
3. **Respect the selected architecture** (`docs/06`): Next.js App Router, static generation, typed config, `lib/content.ts` as the only content access layer, Route Handler for `/api/contact`. Architecture changes need an ADR and owner approval.
4. **Build reusable, maintainable components.** Content and data live in `src/config/*`, never inside components.
5. **Write clean, typed TypeScript.** Strict mode, no `any`, no unused code, no non-null assertions without justification.
6. **Avoid unnecessary dependencies.** Only those allowed in `docs/06` §10. Ask before adding anything else.
7. **Never invent personal or project information.** No fake names, clients, statistics, testimonials, dates, results, social URLs, or years of experience. Use `null` per the placeholder rule (`docs/01` §5) and list the item as an open question.
8. **Never expose secrets.** No credentials in code, docs, commits, logs, or client bundles. Never ask the owner to paste secrets into chat. Use `.env.example` with empty values.
9. **Ensure responsive behaviour** from 320 px up; test at the viewports in `docs/13`.
10. **Follow accessibility best practices** (WCAG 2.2 AA): semantic HTML, keyboard access, visible focus, labels, contrast, reduced motion.
11. **Test important functionality** per `docs/13`. Write tests with the feature, not afterwards.
12. **Update documentation** whenever behaviour or architecture changes; keep documents consistent with each other (ownership table in `docs/01` §6).
13. **Never mark incomplete tasks as completed.** Report partial work, failing tests, skipped items, and unresolved questions plainly.

## 2. Accuracy rules (non-negotiable)

- The owner did **not** create the original Node.js/Express.js backend at KAP Controls. Say only what `docs/07` §7 approves: migration of existing backend functionality to Supabase under senior developer guidance, plus frontend UI implementation and integration. Never imply he architected or built the original backend.
- This is a personal freelancer brand: first person singular; no company name, team, or "agency" language.
- Future services (SEO, social media marketing, Google Ads, digital marketing, branding) stay `hidden` or `coming-soon` and are never advertised as available. Development remains the primary identity.
- Only GitHub and LinkedIn URLs are confirmed; all other social URLs, email, WhatsApp number, resume file, and domain are unknown until the owner supplies them.
- Do not add proficiency levels, certifications, ratings, or metrics.
- Testimonials render only when genuine entries exist.

## 3. Source-of-truth and conflicts

Use the ownership table in `docs/01` §6. If documents conflict, the owning document wins; flag the conflict to the owner and fix the other document. If the docs are silent or ambiguous, **ask** rather than assume; record the assumption only after approval.

## 4. Security and validation

Follow `docs/12` and `docs/10`: one shared Zod schema, server-side validation as authority, store-then-notify, RLS enabled with no public policies, server-only secrets, hashed IPs, escaped email content, `rel="noopener noreferrer"` on external links, no `dangerouslySetInnerHTML` except the safe JSON-LD component.

## 5. Working method

- Small, reviewable changes; clear commit messages; no unrelated refactors.
- Every UI element handles loading, empty, error, and success states where applicable (`docs/03` §1).
- Prefer Server Components; add `"use client"` only for the leaf components listed in `docs/06` §4.
- Performance: respect budgets in `docs/11` §8; use `LazyMotion`; animate `opacity`/`transform` only.
- Before finishing a task: type-check, lint, tests, build; verify against the phase acceptance criteria in `docs/14`.

## 6. Reporting format (end of each phase)

1. What was completed (mapped to FR/NFR IDs).
2. What was **not** completed or deviates, and why.
3. Tests run and results (including failures).
4. New or still-open questions (OQ IDs).
5. Proposed next step; wait for approval where a gate applies (`docs/14` §11).

## 7. Out of scope unless approved

Blog, admin dashboard, CMS, authentication, payments, analytics, i18n, auto-reply emails, Turnstile, project filtering (before 6 projects).
