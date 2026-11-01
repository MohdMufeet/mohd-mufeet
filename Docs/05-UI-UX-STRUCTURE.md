# 05 — UI/UX Structure

> **Owner of:** sitemap, page and section layouts, navigation behaviour, hero concept.
> Copy lives in `07`; tokens in `04`; data in `06`/`09`. Wireframes are structural, not visual.

## 1. Sitemap

| Route | Purpose | Label |
|---|---|---|
| `/` | Home, 11 sections | CURRENT |
| `/about` | Longer personal story, experience | CURRENT |
| `/services` | Full services detail | CURRENT |
| `/projects` | All projects | CURRENT |
| `/projects/[slug]` | Case study | CURRENT |
| `/contact` | Contact form + channels | CURRENT |
| `/privacy` | Privacy notice | CURRENT (conditional, OQ-22) |
| `not-found` | Custom 404 | CURRENT |
| `/blog`, `/resume` | Future pages | FUTURE |

Technical routes (not pages): `/api/contact`, `/sitemap.xml`, `/robots.txt`.

## 2. Global layout

```
[Skip link]
[Navbar — sticky]
<main id="main">  page content  </main>
[Footer]
```

- Navbar left: text wordmark "Mohd Mufeet" (links to `/`). Center/right: nav links. Far right: primary CTA button.
- Desktop nav links: Work (`/projects`), Services (`/services`), About (`/about`), Contact (`/contact`). On Home these scroll to sections; on other pages they route.
- Navbar becomes slightly opaque with a bottom border after scroll; no heavy blur.
- Mobile (< `md`): wordmark + menu button; the sheet lists the same links, the primary CTA, and (footer row) confirmed social icons.
- Footer: wordmark and one-line description, nav links, social links (confirmed only), email link (if confirmed), copyright, optional Privacy link, "Back to top".

## 3. Home page sections

Each section uses `Section` + `SectionHeading`, has an `id` for anchors, and its own empty/hidden behaviour.

| # | Section | Layout (desktop) | Data source | Mobile behaviour | Hidden when |
|---|---|---|---|---|---|
| 1 | Navbar | See §2 | `navigation` | Sheet menu | Never |
| 2 | Hero | Two columns: text left (60%), manifest panel right (40%) | `site`, `skills` | Stacked; panel below CTAs, simplified | Never |
| 3 | Portfolio Stats | Four count-up cards for verified projects, documented REST APIs, active services, and skill areas | `projects`, `services`, `skills` | Two columns, then one on narrow screens | Never; unavailable metrics show zero |
| 4 | Technologies / Skills | Five groups in a responsive grid of labelled chip lists | `skills` | Single column groups | Never |
| 5 | Services | 3-column grid of `ServiceCard` (active only) | `services` | 1 column | No active services |
| 6 | Featured Projects | Up to 3 large `ProjectCard`s, alternating media/text rows | `projects` | Stacked | No featured projects (show EmptyState with Contact CTA) |
| 7 | About Me | Text with optional photo | `about` | Photo above text | Never (text only if no photo) |
| 8 | Professional Experience | Vertical timeline/list of `ExperienceItem` | `experience` | Same, compact | No verified entries |
| 9 | Work Process | Numbered steps in a row/grid | `process` | Vertical list | Until approved (OQ-18) |
| 10 | Testimonials | Cards | `testimonials` | Single column | No entries (default) |
| 11 | Contact | Left: copy + channels; right: form | `contact`, `social`, `services` | Stacked, form first | Never |
| 12 | Footer | See §2 | | Stacked | Never |

Each section ends with an implicit forward path: Services → "Discuss your project"; Projects → "View all projects"; Experience → none; Process → Contact CTA.

## 4. Hero (conversion-focused)

```
[eyebrow: Freelance Full Stack Developer · Kanpur, India]
H1 (display):  Building Modern Web Experiences That Help Businesses Grow.
Lead:          I'm Mohd Mufeet, a Freelance Full Stack Developer specializing in
               building modern, scalable, and user-friendly web applications.
[ Let's Work Together ]  [ Explore My Work ]
(optional line: availability status — only if OQ-13 answered)

Right panel (editor-style, mono):
  profile.config
    role:     Freelance Full Stack Developer
    location: Kanpur, Uttar Pradesh, India
    stack:    [Next.js, React, TypeScript, Node.js, MongoDB, Supabase ...]
```

Rules: panel values come from config (no duplicated literals); the stack line uses a subset of confirmed skills; the headline is the only `text-display` element; no scroll-jacking; hero LCP element is text (not an image).

Portfolio stats count only published, verified projects and configured services/skill groups. API totals must come from an explicit verified project feature; do not infer years, days, or other unsupported claims. Count-up motion starts on scroll and respects reduced-motion preferences.

## 5. Services page (`/services`)

- Page intro; one section per active service: title, description, benefits list, technologies chips, related projects (links, only verified refs), CTA "Discuss this project" → `/contact?service=<slug>`.
- If `coming-soon` services exist: separate muted "Coming Soon" group after active ones (no CTAs that suggest availability). Initially none.
- Closing CTA band.

## 6. About page (`/about`)

Intro, story (OQ-09), how I work, skills overview, experience, links, CTA. All claims per `02` §3.

## 7. Projects page (`/projects`)

Grid/list of `ProjectCard`; optional filter bar (OPTIONAL, ≥ 6 projects). Empty state when none. Each card: image (if verified screenshot), title, summary, tech chips, "View case study", and "Live demo" if verified.

## 8. Case study template (`/projects/[slug]`)

Order of blocks (each rendered only if verified content exists):

1. **Header:** title, one-line summary, meta row (role, timeframe, technologies), buttons: Live Demo, GitHub.
2. **Project Overview**
3. **Problem**
4. **Solution**
5. **My Role** (mandatory; must state scope precisely)
6. **Technologies**
7. **Key Features**
8. **Challenges**
9. **Outcome** (only verified; never invented metrics)
10. **Live Demo / GitHub** links
11. Previous/next project (conditional), contact CTA band

## 9. Contact page (`/contact`)

Left: heading, short text, alternative channels (WhatsApp, Email, LinkedIn — each conditional), response expectation (only if OQ-13). Right: form. Under form: privacy notice sentence linking to `/privacy` (if enabled). Sticky submit is not used.

## 10. Custom 404

Large "404" in mono, one explanatory line, three links (Home, Projects, Contact). Same navbar/footer. Status code 404 correct.

## 11. Responsive behaviour

| Range | Behaviour |
|---|---|
| 320–639 px | Single column, stacked CTAs full-width, tap targets ≥ 44 px, menu sheet |
| 640–1023 px | Two-column grids where useful, desktop nav hidden until `md` |
| ≥ 1024 px | Full layouts as above |
| ≥ 1536 px | Container stays 1200 px, no stretched text |

## 12. Interaction and states summary

Scroll reveals run once; hover states for cards are border/colour changes (no large scaling); focus rings visible; form states per `10` §8; page transitions: none in v1.

## 13. Accessibility structure

One `h1` per page; heading order never skips; landmarks: `header`, `nav` (aria-label), `main`, `footer`; link text meaningful; images have alt; motion respects reduced-motion; form errors linked with `aria-describedby`, focus moves to first invalid field on failed submit.
