# 01 — Project Overview

> **Owner of:** project scope, feature status classification, conventions, open-questions register, document map.
> **Status:** Phases 1–4 implemented. OQ-12 service grouping and launch status approved on 2026-11-01; service copy remains draft pending launch review.

## 1. Purpose

**Project name:** Mohd Mufeet – Freelance Developer Portfolio
**Brand line:** "Mohd Mufeet – Freelance Full Stack Developer"
**Location:** Kanpur, Uttar Pradesh, India

A personal freelancer brand website. Its job is to:

1. Establish a professional identity for Mohd Mufeet.
2. Demonstrate technical expertise through real, verified projects.
3. Build trust honestly (no fake statistics, testimonials, or inflated claims).
4. Convert visitors into freelance client enquiries.
5. Provide a foundation that can later host additional service categories without a rebuild.

This is **not** a software agency site. There is no company name, team, or employees. See `02-BRAND-AND-BUSINESS-STRATEGY.md`.

## 2. Confirmed facts (the only facts agents may use)

| Item | Value |
|---|---|
| Name | Mohd Mufeet |
| Title | Freelance Full Stack Developer (MERN Stack) |
| Location | Kanpur, Uttar Pradesh, India |
| Existing portfolio | https://mufeetportfolio.netlify.app/ |
| GitHub | https://github.com/MohdMufeet |
| LinkedIn | https://www.linkedin.com/in/mohd-mufeet/ |
| Known project | Client Blog Platform — https://blog-for-client-fhod.vercel.app/ (details unverified, see OQ-07) |
| Experience | KAP Controls (https://www.kapcontrols.com/) — Web Developer, September 2025 (type/dates unverified, see OQ-06) |
| Skills list | As given in `07-CONTENT-AND-COPY.md` §6 (no proficiency levels, no years claimed) |

Anything not in this table or in the owner's brief is **unknown** and must follow the placeholder rule (§5).

## 3. Scope

### In scope (initial release)
Home page (11 sections), About, Services, Projects, Project Case Studies, Contact, custom 404, contact form with Supabase storage and Resend notification, WhatsApp/email/LinkedIn CTAs, centralised social config, SEO foundations, accessibility, performance work, tests, Vercel deployment.

### Out of scope (initial release)
Blog, admin dashboard, CMS, lead management UI, testimonials management, payments, user accounts, SEO/marketing service delivery pages as "live" services, and multi-language support. These are architecturally anticipated (see `09`) but **not built**.

## 4. Feature status classification

Every feature in every document uses one of these labels.

| Label | Meaning |
|---|---|
| **CURRENT** | Built in the initial release |
| **CURRENT (conditional)** | Built, but renders only when its data/condition is satisfied |
| **OPTIONAL** | Built only if the owner approves; not required for launch |
| **FUTURE** | Not built now; architecture must not block it |
| **EXTERNAL** | Needs external configuration or owner-supplied data (accounts, keys, domain, files) |

### Master feature table

| Feature | Label | Notes / dependency |
|---|---|---|
| Navbar, mobile menu, smooth scrolling | CURRENT | |
| Hero, Skills, Services, Featured Projects, About, Experience, Process, Contact, Footer sections | CURRENT | Content gated by OQs |
| Testimonials section | CURRENT (conditional) | Hidden until ≥1 genuine, permitted testimonial exists (OQ-20) |
| Pages: About, Services, Projects, Case Studies, Contact, 404 | CURRENT | |
| Privacy notice page (`/privacy`) | CURRENT (conditional) | Recommended because personal data is stored; needs owner approval + wording (OQ-22) |
| Contact form → validate → Supabase → Resend | CURRENT + EXTERNAL | Supabase project, Resend key, verified sender domain |
| WhatsApp CTA | CURRENT (conditional) + EXTERNAL | Needs number (OQ-02) |
| Direct email link | CURRENT (conditional) + EXTERNAL | Needs public address (OQ-01) |
| Resume download | CURRENT (conditional) + EXTERNAL | Needs PDF (OQ-03); hidden if absent |
| Social links | CURRENT | Only confirmed URLs render |
| Dark and light themes with navbar toggle | CURRENT | Dark is default; preference is saved in browser storage |
| Project filtering | OPTIONAL | Enable only when ≥ 6 projects exist |
| Cloudflare Turnstile | OPTIONAL + EXTERNAL | Baseline protection is honeypot + rate limit (OQ-15) |
| Auto-reply email to enquirer | OPTIONAL | |
| Analytics | OPTIONAL | Privacy-friendly only; OQ-16 |
| Dynamic OG images | OPTIONAL | Static default OG image is CURRENT |
| Blog / Articles | FUTURE | |
| Resume page | FUTURE | Download button is CURRENT (conditional) |
| Admin dashboard, lead management, CMS, service/project/testimonial management | FUTURE | |
| SEO, Social Media Marketing, Google Ads, Digital Marketing, Personal/Business Branding services | FUTURE | Hidden by default; never shown as available |

## 5. Conventions used across all documents

- **Placeholder rule:** an unconfirmed value is stored as `null` in its config module and documented with an OQ ID. UI components **omit** anything whose value is `null`. They never render fake or placeholder text publicly. A pre-launch checklist (`14`) verifies every launch-required `null` is resolved.
- **Content status tags** in `07`: `APPROVED` (given by owner), `DRAFT` (proposed, needs confirmation), `MISSING` (owner must supply).
- **IDs:** `FR-*` functional requirement, `NFR-*` non-functional, `OQ-*` open question, `ADR-*` architecture decision (in `06`), `A-*` assumption.

## 6. Single source of truth (document ownership)

If two documents disagree, the owning document wins, and the other must be corrected.

| Topic | Owner |
|---|---|
| Scope, feature labels, OQs | `01` |
| Brand rules, claims policy | `02` |
| Behaviour requirements (FR/NFR) | `03` |
| Tokens, components, motion | `04` |
| Layouts, page/section structure | `05` |
| Stack, folders, data flow, env vars, schema, ADRs | `06` |
| All public copy | `07` |
| Social config and link rules | `08` |
| Service data model, expansion process | `09` |
| Form fields, validation rules, API contract, rate limits | `10` |
| Metadata, structured data, performance budgets | `11` |
| Security controls | `12` |
| Tests and definition of done | `13` |
| Phases, deliverables, acceptance | `14` |
| Agent behaviour | `AGENTS.md` |

## 7. Document map

`01` Overview · `02` Brand & Business · `03` Functional Requirements · `04` Design System · `05` UI/UX Structure · `06` Technical Architecture · `07` Content & Copy · `08` Social Integration · `09` Services & Scalability · `10` Contact & Lead Gen · `11` SEO & Performance · `12` Security & Validation · `13` Testing · `14` Roadmap · `AGENTS.md` · `README.md`

## 8. Assumptions (made explicit; owner may overrule)

| ID | Assumption |
|---|---|
| A-01 | Site language is English only at launch. |
| A-02 | Primary audience: small businesses, startups, and individuals needing web applications or business websites. Unverified hypothesis; used only to shape tone, never as a public claim. |
| A-03 | Dark is the default theme; visitors can switch to light mode and their preference is saved in the browser. |
| A-04 | Production host is Vercel; the current Netlify portfolio stays live until the new site is approved (OQ-05). |
| A-05 | Latest stable versions of Next.js, React, Tailwind, shadcn/ui are used at Phase 1 and then pinned. |
| A-06 | Project data lives in typed TypeScript config files, not a database, in v1 (ADR-04). |
| A-07 | Contact form is the only feature that writes to Supabase in v1. |

## 9. Open questions register

Blocking = needed before launch. Non-blocking = a sensible default exists.

| ID | Question | Needed for | Blocking? | Default if unanswered |
|---|---|---|---|---|
| OQ-01 | Public contact email address | Contact, footer, mailto | Yes | Hide email link |
| OQ-02 | WhatsApp number (international format) and prefilled message | WhatsApp CTA | Yes (for CTA) | Hide WhatsApp CTA |
| OQ-03 | Resume PDF file and filename | Resume download | No | Hide download |
| OQ-04 | Do Instagram, Facebook, X, YouTube profiles exist? URLs? | Social config | No | `null`, hidden |
| OQ-05 | Production domain; Netlify→Vercel migration and redirect plan | Canonical URLs, sitemap, Resend domain, launch | Yes | Use Vercel preview URL only |
| OQ-06 | KAP Controls: employment type, exact dates, still current?, permission to name/link the company | Experience section | Yes (for section) | Show only "Web Developer, September 2025" wording in `07` |
| OQ-07 | Client Blog Platform: verified stack, features, challenges, outcome, my exact role, client name permission, public repo? | Case study | Yes (for case study) | Card with name + live link only |
| OQ-08 | Additional real projects to showcase | Projects | No | Show verified projects only |
| OQ-09 | About copy, education, professional photo | About | Yes (for About) | Draft in `07` with markers |
| OQ-10 | Any verifiable years of experience, certifications, proficiency levels | Skills/About | No | Claim none |
| OQ-11 | Budget ranges and currency for the form | Contact form | No | Ranges in `10` §3, flagged DRAFT |
| OQ-12 | Verified project references per service | Services | Yes (for references) | Six documented development services approved active on 2026-11-01; keep project references empty until projects are verified (OQ-07) |
| OQ-13 | Availability / response-time statement (only if true) | Hero/Contact | No | Omit |
| OQ-14 | Supabase org/region; Resend account and verified sending domain | Contact backend | Yes | Dev-only keys until resolved |
| OQ-15 | Add Turnstile (or similar) beyond honeypot + rate limit? | Spam protection | No | Honeypot + rate limit only |
| OQ-16 | Analytics at launch? | Analytics | No | None |
| OQ-17 | Logo/wordmark and accent colour approval | Design system | No | Text wordmark; proposed palette in `04`; dark/light toggle added |
| OQ-18 | Approve work-process steps and any support promises | Process section | No | Draft in `07` §8 |
| OQ-19 | Pricing / engagement models shown? | Services | No | Not shown |
| OQ-20 | Any genuine, permitted testimonials | Testimonials | No | Section hidden |
| OQ-21 | Languages beyond English? | i18n | No | English only |
| OQ-22 | Privacy notice wording and applicable data-protection obligations (e.g., India's DPDP Act, 2023) — owner to confirm with qualified advice | `/privacy`, form notice | Yes | Draft notice flagged DRAFT |
| OQ-23 | Is the Client Blog Platform connected to KAP Controls? (assumed **no**; they are never linked) | Case study | No | Treated as separate |
