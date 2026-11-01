# 03 — Functional Requirements

> **Owner of:** behavioural requirements (FR) and non-functional requirements (NFR).
> Labels follow `01` §4. Layout detail lives in `05`; field rules in `10`; controls in `12`.

## 1. Global state requirements

Every data-driven or async UI must define four states.

| State | Requirement |
|---|---|
| Loading | Skeleton or disabled control; never a blank layout shift. Static pages need none; form submit needs one. |
| Empty | Meaningful message with next action (e.g., no projects → "Projects are being added" + contact CTA). |
| Error | Human-readable message, retry or alternative path (email/WhatsApp), no stack traces. |
| Success | Explicit confirmation, announced to assistive tech (`aria-live`). |

## 2. Functional requirements

### Navigation
| ID | Requirement | Label |
|---|---|---|
| FR-NAV-01 | Sticky navbar with brand wordmark, links (Home sections/pages per `05`), and primary CTA "Let's Work Together". | CURRENT |
| FR-NAV-02 | Mobile menu (< `md` breakpoint) opens as an accessible sheet: focus trapped, `Esc` closes, closes on route change/link press, body scroll locked, trigger has `aria-expanded`. | CURRENT |
| FR-NAV-03 | Active link state reflects current page; on Home, reflects the section in view. | CURRENT |
| FR-NAV-04 | Skip-to-content link is the first focusable element. | CURRENT |
| FR-NAV-05 | Smooth in-page scrolling to section anchors with sticky-header offset; disabled under `prefers-reduced-motion`. URL hash updates. | CURRENT |

### Home sections
| ID | Requirement | Label |
|---|---|---|
| FR-HOME-01 | Section order: Navbar, Hero, Technologies/Skills, Services, Featured Projects, About, Experience, Work Process, Testimonials, Contact, Footer. | CURRENT |
| FR-HOME-02 | Hero communicates who, what, problems solved, and why to contact, with primary and secondary CTA (copy in `07`). | CURRENT |
| FR-HOME-03 | Skills render from `skills` config grouped by Frontend, Backend, Database, Tools, Core Concepts; no proficiency indicators. | CURRENT |
| FR-HOME-04 | Services render from `services` config; only `status: "active"` shown. | CURRENT |
| FR-HOME-05 | Featured Projects render projects flagged `featured`; max 3; links to case study. | CURRENT |
| FR-HOME-06 | Testimonials section renders only if ≥ 1 entry exists in `testimonials` config; otherwise the section and its nav/anchor are absent. | CURRENT (conditional) |
| FR-HOME-07 | Experience entries render from `experience` config; unverified fields omitted. | CURRENT |
| FR-HOME-08 | Contact section includes the form plus alternative channels. | CURRENT |

### Pages
| ID | Requirement | Label |
|---|---|---|
| FR-PAGE-01 | `/about`, `/services`, `/projects`, `/projects/[slug]`, `/contact` exist with unique metadata. | CURRENT |
| FR-PAGE-02 | `/projects/[slug]` is statically generated for every project; unknown slug → custom 404. | CURRENT |
| FR-PAGE-03 | Custom 404 with brand styling, explanation, links to Home, Projects, Contact. | CURRENT |
| FR-PAGE-04 | `/privacy` page describing enquiry data handling. | CURRENT (conditional, OQ-22) |

### Projects
| ID | Requirement | Label |
|---|---|---|
| FR-PROJ-01 | Project cards show title, one-line summary, technology chips, and link to detail; live-demo link only if verified. | CURRENT |
| FR-PROJ-02 | Case study template renders the sections in `05` §8 / `06` §6; any section with no verified content is omitted, not stubbed. | CURRENT |
| FR-PROJ-03 | Previous/next project navigation on detail pages when > 1 project. | CURRENT (conditional) |
| FR-PROJ-04 | Technology filter on `/projects`. Enable only when ≥ 6 projects. | OPTIONAL |
| FR-PROJ-05 | Empty state if no projects are published. | CURRENT |

### Contact and leads
| ID | Requirement | Label |
|---|---|---|
| FR-CON-01 | Form fields: Full Name, Email, Subject, Service Required, Project Budget (optional), Project Description (rules in `10` §3). | CURRENT |
| FR-CON-02 | Client-side validation (React Hook Form + Zod) with inline, accessible error messages; the **same Zod schema** is re-run on the server (authoritative). | CURRENT |
| FR-CON-03 | Server validates, rate-limits, stores in Supabase, then sends Resend notification (flow in `06` §5). | CURRENT + EXTERNAL |
| FR-CON-04 | Submit button shows pending state, prevents double-submit. | CURRENT |
| FR-CON-05 | Success: form replaced/accompanied by confirmation message; errors keep user input intact. | CURRENT |
| FR-CON-06 | `?service=<slug>` query param pre-selects a valid active service; invalid values ignored. | CURRENT |
| FR-CON-07 | WhatsApp CTA opens `wa.me` link in new tab; hidden if number missing. | CURRENT (conditional) |
| FR-CON-08 | Direct email (`mailto:`) and LinkedIn links shown; hidden if value missing. | CURRENT (conditional) |
| FR-CON-09 | Resume download button; hidden if file not configured. | CURRENT (conditional) |
| FR-CON-10 | Auto-reply email to the enquirer. | OPTIONAL |

### Social and links
| ID | Requirement | Label |
|---|---|---|
| FR-SOC-01 | All social/contact links come from one config module (`08`). Null URLs are not rendered. | CURRENT |
| FR-SOC-02 | Social links appear in Contact section and Footer; in the mobile menu footer; not in the desktop navbar. | CURRENT |
| FR-SOC-03 | External links: `target="_blank"` with `rel="noopener noreferrer"`, and an accessible label that mentions "opens in a new tab". | CURRENT |

### Notifications
| ID | Requirement | Label |
|---|---|---|
| FR-NOT-01 | Success and error feedback via an inline `role="status"`/`role="alert"` region; optional toast via shadcn Sonner for the same message. Never toast-only. | CURRENT |

### Services
| ID | Requirement | Label |
|---|---|---|
| FR-SVC-01 | Service model per `09` (title, description, benefits, technologies, projectRefs, CTA, status). | CURRENT |
| FR-SVC-02 | `status: "hidden"` services never render or appear in sitemap, metadata, or form options. | CURRENT |
| FR-SVC-03 | `status: "coming-soon"` services render only in a clearly muted "Coming Soon" group, never in the form's service dropdown. Initial state: no coming-soon services shown. | CURRENT (conditional) |

### SEO surfaces
| ID | Requirement | Label |
|---|---|---|
| FR-SEO-01 | Per-page metadata, canonical, Open Graph, Twitter card, sitemap, robots, JSON-LD (see `11`). | CURRENT |

## 3. Non-functional requirements

| ID | Category | Requirement |
|---|---|---|
| NFR-01 | Performance | Core Web Vitals targets in `11` §8 on mobile (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1). |
| NFR-02 | Accessibility | WCAG 2.2 AA target: contrast, keyboard operation, visible focus, labelled controls, reduced motion. |
| NFR-03 | Responsiveness | Works from 320 px to 1920 px; mobile-first; no horizontal scroll. |
| NFR-04 | Security | Controls in `12`; no secrets client-side. |
| NFR-05 | Maintainability | Content in typed config; reusable components; strict TypeScript; no `any`. |
| NFR-06 | Dependencies | Only those listed in `06` §2 plus approved additions (`06` §10). |
| NFR-07 | Reliability | Contact form never loses a validated enquiry because of an email failure (store first, notify second). |
| NFR-08 | Browser support | Last two versions of Chrome, Edge, Firefox, Safari (desktop and mobile). |
| NFR-09 | Privacy | Store only fields in `10` §6; no third-party trackers by default. |
| NFR-10 | Honesty | No content violates `02` §3. Checked in `13`. |
| NFR-11 | Observability | Server errors logged without personal data (`06` §8). |
| NFR-12 | SEO | Server-rendered/static HTML for all public content; no content that depends on client JS to be indexable. |

## 4. Acceptance summary

A feature is accepted only when it meets its FR/NFR rows, handles all four states, passes tests mapped in `13`, and has no violation of `02` §3.
