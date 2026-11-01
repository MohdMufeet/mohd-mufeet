# 11 — SEO and Performance

> **Owner of:** metadata, structured data, indexing, keyword approach, performance budgets.
> Canonical base URL comes from `NEXT_PUBLIC_SITE_URL` (OQ-05).

## 1. Principles

Static HTML for every public page; one unique title/description per URL; natural wording, no keyword stuffing; performance and accessibility treated as SEO.

## 2. Next.js Metadata API

- `metadataBase` set once in root layout from `NEXT_PUBLIC_SITE_URL`.
- Root `title.template`: `%s | Mohd Mufeet`; `title.default`: `Mohd Mufeet – Freelance Full Stack Developer`.
- Each page exports static `metadata`; `/projects/[slug]` uses `generateMetadata` from project data.
- `alternates.canonical` on every page (relative path resolved against `metadataBase`).
- Open Graph: `type: website` (case studies: `article` only if appropriate), `siteName`, `locale: en_IN` (A-01), image.
- Twitter/X: `summary_large_image`.
- Default OG image: static 1200×630 file in `public/` (CURRENT); per-project dynamic OG images are OPTIONAL.
- `robots` meta: default index/follow; draft/unverified pages are not generated at all.

## 3. Page metadata (DRAFT copy)

| Route | Title | Description (≤ 160 chars) |
|---|---|---|
| `/` | Mohd Mufeet – Freelance Full Stack Developer | Freelance Full Stack Developer in Kanpur, India, building modern, scalable web applications with Next.js, React, and the MERN stack. |
| `/about` | About | Learn about Mohd Mufeet, a freelance full stack developer working with Next.js, React, Node.js, and Supabase. |
| `/services` | Services | Web development services: full stack development, Next.js, business websites, e-commerce, backend APIs, and database integration. |
| `/projects` | Projects | Selected web development projects by Mohd Mufeet, with a clear description of the role in each. |
| `/projects/[slug]` | `{Project title}` | `{Verified one-line summary}` |
| `/contact` | Contact | Tell Mohd Mufeet about your project and get in touch about freelance web development. |
| `/privacy` | Privacy Notice | How enquiry details submitted through this website are used. |
| 404 | Page not found | Excluded from index (`noindex`). |

## 4. Sitemap and robots

- `sitemap.ts`: lists `/`, `/about`, `/services`, `/projects`, `/contact`, `/privacy` (if enabled), and every **published, verified** project. Includes `lastModified` only where known truthfully.
- `robots.ts`: allow all; disallow `/api/`; reference sitemap URL.
- After launch: submit sitemap to Google Search Console and Bing Webmaster Tools (EXTERNAL, owner account).

## 5. Keyword approach

Target intents (use naturally in headings, intro text, and service copy; never repeat artificially): Freelance Full Stack Developer, MERN Stack Developer, Freelance Web Developer, Next.js Developer, Website Developer.

| Intent | Primary page |
|---|---|
| Freelance Full Stack Developer / Freelance Web Developer | `/`, `/about` |
| MERN Stack Developer | `/services` (full stack), project pages |
| Next.js Developer | `/services` (Next.js) |
| Website Developer / business website | `/services` (business websites) |

Rules: keyword mention only where it is true and descriptive; one H1 per page; descriptive internal link text; no hidden text; no location-claim stuffing (location appears where genuinely relevant).

## 6. Structured data (JSON-LD, safely serialised)

| Schema | Where | Notes |
|---|---|---|
| `WebSite` | Root layout | `name`, `url` |
| `Person` | Home and About | `name`, `jobTitle`, `url`, `address.addressLocality`/`addressRegion`/`addressCountry`, `sameAs` = confirmed profile URLs only, `knowsAbout` = confirmed skills |
| `BreadcrumbList` | Project pages | |
| `CreativeWork` | Project pages | Optional; only verified fields |

Do not add `Review`, `AggregateRating`, `Organization`/`LocalBusiness` (no company), or fabricated `worksFor`. Escape `<` in serialised JSON; validate with Google's Rich Results Test before launch.

## 7. Semantic HTML, images, fonts

- Landmarks and heading order per `05` §13.
- Images via `next/image` with width/height, responsive `sizes`, modern formats, `priority` only for the LCP image if one exists; lazy-load below the fold.
- Fonts via `next/font` (self-hosted, subset, `display: swap`).
- No third-party scripts at launch (analytics OPTIONAL, OQ-16).
- Use `next/link` for internal links; `rel="noopener noreferrer"` on external.

## 8. Performance and Core Web Vitals

| Metric | Target (mobile, p75 field / Lighthouse lab) |
|---|---|
| LCP | ≤ 2.5 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO / Best Practices | ≥ 95 / ≥ 95 |

Budgets and tactics:
- Server Components by default; client JS limited to the leaf components in `06` §4.
- Framer Motion via `LazyMotion` + `domAnimation`; animate `opacity`/`transform` only; no animation libraries beyond it.
- Hero LCP is text; avoid large hero images.
- Reserve space for images and embeds to prevent CLS.
- Compress project screenshots (target < 200 KB each, as a guideline).
- Avoid layout-shifting font swaps (size-adjust fallback via `next/font`).
- Review bundle with the Next.js build output each phase; investigate unexplained growth.

## 9. Accessibility as SEO

WCAG 2.2 AA; keyboard navigation; skip link; focus visibility; reduced motion; descriptive alt; form labels. Verified in `13`.

## 10. Migration from the existing Netlify portfolio (OQ-05)

Keep it live until the new site is approved. On cutover, redirect the old URL to the new canonical domain (Netlify-side redirect rule, EXTERNAL), keep the same top-level project/link text where possible, and avoid duplicate content by pointing canonicals only to the new domain.

## 11. Measurement

Lighthouse (local/CI), PageSpeed Insights, Search Console (after launch). Vercel Speed Insights/Analytics are OPTIONAL and require owner approval and a privacy-notice update.
