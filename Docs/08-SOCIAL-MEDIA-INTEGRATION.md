# 08 — Social Media Integration

> **Owner of:** social/contact link configuration, display rules, and link security.

## 1. Principle

All social and contact links come from **one config module** (`src/config/social.ts`). No component hard-codes a profile URL. **Never invent a profile URL.** Unconfirmed = `null` = not rendered.

## 2. Platform register

| Platform | `id` | URL | Status |
|---|---|---|---|
| GitHub | `github` | https://github.com/MohdMufeet | Confirmed |
| LinkedIn | `linkedin` | https://www.linkedin.com/in/mohd-mufeet/ | Confirmed |
| Instagram | `instagram` | `null` | Unconfirmed (OQ-04) |
| Facebook | `facebook` | `null` | Unconfirmed (OQ-04) |
| X (Twitter) | `x` | `null` | Unconfirmed (OQ-04) |
| YouTube | `youtube` | `null` | Unconfirmed (OQ-04) |
| WhatsApp | `whatsapp` | built from number; `null` until OQ-02 | Unconfirmed |
| Email | `email` | built from address; `null` until OQ-01 | Unconfirmed |

Canonical GitHub URL has no trailing slash (the brief used both forms).

## 3. Config shape

| Field | Type | Notes |
|---|---|---|
| `id` | union of ids above | |
| `label` | string | Visible/accessible name, e.g. "GitHub" |
| `url` | string \| null | Full URL; `null` → hidden everywhere |
| `kind` | `profile` \| `message` \| `mailto` | Drives href building and `target` |
| `handle` | string \| null | Optional display text |
| `placements` | array of `contact` \| `footer` \| `mobile-menu` \| `navbar` | Where it may render |
| `order` | number | |

Helper: `getVisibleSocialLinks(placement)` filters out `null` URLs and non-matching placements. When a new URL is confirmed, only `social.ts` changes.

## 4. Placement rules

| Placement | Which links |
|---|---|
| Navbar (desktop) | None — navbar holds nav links and the primary CTA only (keeps it minimal) |
| Mobile menu footer row | Confirmed profile links (GitHub, LinkedIn, others when set) |
| Contact section | WhatsApp, Email, LinkedIn as channel buttons; GitHub and others as icon row |
| Footer | All confirmed profile links + email |

## 5. Icons (ADR-07)

Brand icons are local SVG components in `components/icons/` (one per platform, `currentColor`, `aria-hidden="true"`). Lucide supplies non-brand icons (mail, external-link). Verify the installed Lucide version before relying on any brand icon from it.

## 6. Accessibility and security

- Icon-only links need `aria-label="{Platform} (opens in a new tab)"`; visible-text links include the platform name.
- Minimum 44×44 px hit area; visible focus ring (`04` §9).
- External links: `target="_blank"` and `rel="noopener noreferrer"`. `mailto:` and `tel:`-style links do not use `target`.
- Validate configured URLs at build time: `https:` scheme only for profiles; reject `javascript:` and unknown protocols.

## 7. Link builders

| Kind | Format | Notes |
|---|---|---|
| WhatsApp | `https://wa.me/<digits only, with country code>?text=<URL-encoded message>` | Strip `+`, spaces, dashes; prefilled text from `site.ts` (DRAFT: "Hi Mufeet, I'd like to discuss a project.") |
| Email | `mailto:<address>?subject=<encoded>` | Subject optional |

## 8. Structured data

JSON-LD `Person.sameAs` includes only confirmed profile URLs (`11` §6).

## 9. Acceptance

Setting a URL to `null` removes it from every placement with no other change; setting a valid URL shows it in all permitted placements; tests in `13` cover both.
