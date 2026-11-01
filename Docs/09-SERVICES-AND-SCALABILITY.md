# 09 — Services and Scalability

> **Owner of:** service data model, initial service list, expansion process, scalability triggers.

## 1. Service data model

Defined in `06` §6.1 (`Service`). Key behaviours:

| Field | Behaviour |
|---|---|
| `category` | `"development"` initially; future values (e.g., `"growth"`, `"branding"`) group services |
| `status` | `active` → shown everywhere; `coming-soon` → muted group on `/services` only; `hidden` → exists in config but appears nowhere (UI, sitemap, form, metadata) |
| `projectRefs` | Slugs of **verified, published** projects; an unknown or unpublished slug is ignored and flagged by tests |
| `cta.href` | `/contact?service=<slug>` |
| `order` | Display order within category |

All service UI reads through `getServices({ status })` in `lib/content.ts`. No component embeds service text.

## 2. Initial services (all `development` / `active`; grouping needs approval — OQ-12)

| Order | Slug | Title | Covers brief items |
|---|---|---|---|
| 1 | `full-stack-web-development` | Full Stack Web Development | Full Stack Web Development, MERN Stack Development |
| 2 | `nextjs-development` | Next.js Development | Next.js Development |
| 3 | `business-website-development` | Business Website Development | Business Website Development |
| 4 | `ecommerce-development` | E-commerce Development | E-commerce Development |
| 5 | `backend-api-development` | Backend Development & API Integration | Backend Development, API Integration |
| 6 | `database-integration` | Database Integration | Database Integration |

Copy, benefits, and technologies: `07` §5. Project references at launch: only verified projects (OQ-07, OQ-12); a service with none shows no "Related projects" block.

## 3. Future services (all `hidden` at launch)

| Slug | Title | Category |
|---|---|---|
| `seo` | Search Engine Optimization | growth |
| `social-media-marketing` | Social Media Marketing | growth |
| `google-ads` | Google Ads | growth |
| `digital-marketing` | Digital Marketing | growth |
| `personal-branding` | Personal Branding | branding |
| `business-branding` | Business Branding | branding |

These entries are **not required** in the initial config. If included for convenience they must be `hidden` with `description` empty; their absence from every public surface is tested (`13`).

## 4. Activation checklist for a new service or category

1. Owner confirms the service is actually deliverable.
2. Add/modify entry in `services.ts` with copy, benefits, technologies (only what the owner can honestly claim).
3. Add verified project references or leave empty.
4. Set `status: "coming-soon"` (preview) or `"active"` (live).
5. If a new `category`: add it to the category union and the category label map; `/services` renders category groups with development first.
6. Update `07` copy, `11` metadata/keywords, sitemap inclusion (automatic from `status`), and form enum (automatic from active services).
7. Confirm the Hero, nav, and brand line still lead with development (`02` §8).
8. Update documentation and tests; owner approves.

## 5. Guardrails

- No redesign is needed to add a service: layout is data-driven.
- Hero headline, brand line, and navbar do not change when marketing services are activated.
- Marketing services never appear in Skills ("technologies I build with").
- Coming-soon services show no price, no CTA that implies availability, and are excluded from the contact dropdown.

## 6. Scalability roadmap (FUTURE — not built)

| Capability | Trigger to build | Approach |
|---|---|---|
| Blog | Owner wants regular articles | New `/blog` route, content in MDX or Supabase; needs ADR |
| Admin dashboard | Enquiry volume or non-code edits needed | `/admin` behind Supabase Auth; read `enquiries`, update `status` |
| Lead management | Dashboard exists | Use `status` lifecycle in `10` §6 |
| Project/service/testimonial management | > ~10 projects or frequent edits | Move config to Supabase tables; change only `lib/content.ts` |
| CMS | Content editors besides owner | Evaluate then; ADR required |
| Dark/light theme toggle | CURRENT | Dark default; selection persists in browser storage; tokens in `04` §3 |
| i18n | OQ-21 | Evaluate Next.js i18n routing |

Avoid premature engineering: none of the above may add code, tables, or dependencies before its trigger and owner approval.

## 7. Non-functional notes

Config validation (schema-checked at build) catches duplicate slugs, invalid statuses, missing required fields, and references to non-existent projects.
