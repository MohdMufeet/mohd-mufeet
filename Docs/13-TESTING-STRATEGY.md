# 13 — Testing Strategy

> **Owner of:** test approach, coverage expectations, and definition of done.
> Test-only dev dependencies are permitted by `06` §10. Tests must never use real personal data or real credentials.

## 1. Approach

| Layer | Tool (dev dependency) | Scope |
|---|---|---|
| Unit | Vitest | Zod schemas, link builders, config validators, rate-limit logic, metadata/JSON-LD builders, sanitisers |
| Component | Vitest + React Testing Library | Contact form states, mobile menu behaviour, conditional sections |
| End-to-end | Playwright | Key journeys on desktop and mobile viewports |
| Accessibility | `@axe-core/playwright` (or equivalent) + manual | Automated scan per page + keyboard/screen-reader checks |
| Performance | Lighthouse (local/CI) | Budgets in `11` §8 |
| Static | TypeScript, ESLint | Zero errors required |

Keep the suite small and meaningful; prefer testing behaviour over implementation details.

## 2. Test matrix

| ID | Area | Cases | Maps to |
|---|---|---|---|
| T-CFG-01 | Config integrity | Unique service/project slugs; valid statuses; `projectRefs` resolve to published projects; hidden services absent from public output; no placeholder text in built pages | FR-SVC, FR-SOC |
| T-CFG-02 | Honesty rules | Build output contains none of: "agency", "our team", "years of experience", "architected the backend", fake stats patterns; KAP Controls entry uses approved wording | NFR-10, `02` §3 |
| T-SOC-01 | Social links | `null` URL hides link everywhere; valid URL shows in permitted placements; external attributes present; `javascript:` rejected | FR-SOC |
| T-NAV-01 | Navigation | Mobile menu opens/closes, focus trap, `Esc`, closes on navigation, `aria-expanded`; skip link works; hash scroll offset | FR-NAV |
| T-HOME-01 | Home | Section order; testimonials absent when empty; empty states render | FR-HOME |
| T-PROJ-01 | Projects | Unverified/draft projects not rendered or in sitemap; unknown slug → 404; empty state | FR-PROJ, FR-PAGE |
| T-FORM-01 | Schema (unit) | Boundaries for each field (min/max), trimming, email normalisation, enum rejection, link-count rule | `10` §3 |
| T-FORM-02 | Form UI | Inline errors, focus on first invalid, pending state, double-submit prevention, success, server error keeps input | FR-CON |
| T-API-01 | Route handler | 200 success; 400 invalid; 400 wrong origin/content-type/oversize; 405 wrong method; 429 after thresholds; 500 on DB failure with no email sent; email failure still returns 200 and sets `email_sent=false`; honeypot and fast submit store nothing | `10` §7 |
| T-SEC-01 | Security | Email HTML escaping; CR/LF stripped from subject; raw IP never stored; secrets absent from client bundle (search build output for key names) | `12` |
| T-SEC-02 | RLS | Anon key cannot read or insert `enquiries` (against a test project) | `12` §3 |
| T-SEO-01 | SEO | Unique title/description per page; canonical present; sitemap includes only published URLs; robots disallows `/api/`; JSON-LD parses and contains only confirmed `sameAs` | `11` |
| T-A11Y-01 | Accessibility | Axe: no serious/critical violations on all routes; keyboard-only completion of contact form; reduced-motion honoured | NFR-02 |
| T-RES-01 | Responsive | Screenshots/assertions at 320, 375, 768, 1024, 1440 px; no horizontal scroll | NFR-03 |
| T-PERF-01 | Performance | Lighthouse budgets met on Home and one project page (mobile profile) | NFR-01 |
| T-404-01 | 404 | Returns 404 status with branded content and links | FR-PAGE-03 |

Mocking: unit/E2E tests mock Supabase and Resend; one integration run against a dedicated test Supabase project and Resend test mode is required before launch.

## 3. Manual QA checklist (pre-launch)

- Real devices: at least one iPhone-size and one Android-size viewport; Safari, Chrome, Firefox, Edge.
- Keyboard-only walkthrough of every page; screen reader spot-check (NVDA/VoiceOver) on Home and Contact.
- Slow network (throttled 4G) and JS-disabled check: content visible; form degrades gracefully with a message.
- Print/zoom 200% and 400% reflow.
- Copy review: all DRAFT/MISSING items resolved or consciously accepted (`14` §12).
- Link check: every external link resolves; social links match confirmed URLs.
- Send a real test enquiry end-to-end in a preview environment; confirm stored row and received email.

## 4. Definition of done (per task/phase)

1. Meets the relevant FR/NFR rows and acceptance criteria in `14`.
2. TypeScript, lint, and tests pass.
3. Four states handled where applicable.
4. Responsive (320 px up) and keyboard accessible.
5. No new dependency without approval; no secrets; no invented content.
6. Documentation updated if behaviour/architecture changed.
7. Honest status: incomplete items are reported as incomplete.

## 5. CI expectations

On every PR: install from lockfile, type-check, lint, unit/component tests, build; Playwright smoke tests on preview; Lighthouse check on preview (non-blocking until Phase 10, blocking after).

## 6. Test data rules

Use obviously fake data (`test@example.com`, "Test User"); clean up test rows; never reuse production keys in tests.
