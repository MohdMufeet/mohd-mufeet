# 04 — Design System

> **Owner of:** visual tokens, typography, components, motion rules.
> Colour values below are a **proposal pending owner approval (OQ-17)**. All values must be implemented as CSS variables / Tailwind theme tokens so they can change in one place. Components must not hardcode colours, sizes, or radii.

## 1. Design principles

1. **Premium through restraint.** Strong hierarchy, generous space, few elements.
2. **Typography does the heavy lifting.** One type family pair, clear scale.
3. **One accent.** Used for CTAs, focus, and small emphasis only.
4. **Motion with purpose.** Subtle, short, never required to understand content.
5. **Content-first.** Real projects and real copy, not decoration.
6. **Accessible by default.** Contrast, focus, reduced motion.

## 2. Anti-patterns (explicitly forbidden)

Generic gradient hero blobs; excessive gradients; unnecessary glassmorphism; stacks of heavily rounded cards; floating random shapes; emoji as decoration; fake stats counters; fake testimonials; skill percentage bars; auto-playing carousels; parallax overload; more than one animated element competing in a viewport.

## 3. Colour tokens (dark and light themes)

Dark is the default theme. The navbar toggle switches the whole site between
dark and light, and saves the selection in browser `localStorage` under
`portfolio-theme`. The saved theme is applied before the first paint. If there
is no saved preference, the site uses dark mode.

| Token | Dark | Light | Use |
|---|---|---|---|
| `--background` | `#0C0C0D` | `#FAFAF8` | Page background |
| `--surface` | `#141416` | `#FFFFFF` | Cards, panels |
| `--surface-raised` | `#1B1B1E` | `#F1F1ED` | Popovers, hover surfaces |
| `--border` | `#26262A` | `#DEDED8` | Dividers, outlines |
| `--foreground` | `#EDEDEA` | `#171718` | Primary text |
| `--muted-foreground` | `#A1A1A6` | `#5B5B60` | Secondary text |
| `--accent` | `#F5A524` | `#885300` | Primary CTA, links emphasis, focus ring |
| `--accent-foreground` | `#0C0C0D` | `#FFFFFF` | Text on accent |
| `--destructive` | `#F0624D` | `#B83220` | Errors |
| `--success` | `#4CC38A` | `#167347` | Success states |
| `--ring` | `var(--accent)` | `var(--accent)` | Focus ring |

Rules: body text ≥ 4.5:1, large text/UI ≥ 3:1; never rely on colour alone for
state; gradients are limited to at most one subtle background radial per page.
Keep theme colors in the CSS variables in `src/app/globals.css`; components use
the shared Tailwind tokens rather than hardcoded colors.

## 5. Typography

| Role | Font (via `next/font`, self-hosted) | Fallback |
|---|---|---|
| Sans (UI, headings, body) | Geist Sans | system-ui, sans-serif |
| Mono (code accents, labels, tech chips) | Geist Mono | ui-monospace, monospace |

Font choice is a proposal; swap allowed if the owner prefers, but keep exactly two families and `display: swap`.

Fluid scale (clamp-based; final values tuned in Phase 2):

| Token | Approx. range | Use |
|---|---|---|
| `text-display` | 40 → 72 px | Hero headline only |
| `text-h1` | 32 → 48 px | Page titles |
| `text-h2` | 28 → 36 px | Section headings |
| `text-h3` | 20 → 24 px | Card titles |
| `text-body-lg` | 18 px | Lead paragraphs |
| `text-body` | 16 px | Body |
| `text-small` | 14 px | Meta, captions |
| `text-label` (mono, uppercase, tracked) | 12–13 px | Eyebrows, chips |

Line length 60–75 characters for prose; headings use tight tracking and `text-balance`.

## 6. Spacing, layout, shape

- Spacing base unit 4 px; use Tailwind scale only.
- Container: max width 1200 px; horizontal padding 20 px (mobile) / 32 px (≥ `md`) / 40 px (≥ `lg`).
- Section vertical rhythm: 80 px mobile / 120 px desktop (tokens `--section-y`).
- Breakpoints: Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`).
- Radius: `sm 6px`, `md 10px`, `lg 14px`; cards use `md`; pills only for chips/badges. No radius above 14 px except avatar circles.
- Borders over shadows: 1 px `--border`; shadows only for popovers/sheets.
- Z-index scale: base 0, sticky nav 40, sheet/overlay 50, toast 60.

## 7. Motion

| Token | Value |
|---|---|
| `--duration-fast` | 150 ms |
| `--duration-base` | 250 ms |
| `--duration-slow` | 400 ms |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |

Rules:
- Allowed: fade/translate-up reveal on scroll (once), hover/focus transitions, mobile menu transition, subtle hero entrance, button press feedback.
- Max translate 16 px; no looping animation except an optional blinking caret in the hero code panel (static under reduced motion).
- Respect `prefers-reduced-motion`: replace movement with instant or opacity-only changes.
- Use Framer Motion's `LazyMotion` with `m` components and the `domAnimation` feature set to limit bundle size; Server Components stay server-rendered, with motion wrappers as small client components.
- Animate `opacity` and `transform` only.

## 8. Component inventory

### shadcn/ui primitives (install only these when needed)
`button`, `input`, `textarea`, `select`, `label`, `form`, `sheet` (mobile menu), `badge`, `separator`, `sonner` (toast), `skeleton`, `tooltip` (only if used).

### Project components
| Component | Responsibility | Key variants / props |
|---|---|---|
| `Container` | Width + padding | `as`, `size` |
| `Section` | Anchor id, vertical rhythm, heading slot | `id`, `eyebrow`, `title`, `description` |
| `SectionHeading` | Eyebrow + H2 + lead | |
| `Navbar` / `MobileMenu` | Navigation | |
| `ButtonLink` | Link styled as button, handles external attrs | `variant: primary \| secondary \| ghost`, `external` |
| `TechChip` | Technology label (mono) | |
| `ServiceCard` | Service summary + CTA | |
| `ProjectCard` | Project summary | `featured` |
| `CaseStudySection` | Titled block for case study fields | |
| `ExperienceItem` | Role, company, dates, bullets | |
| `ProcessStep` | Numbered step | |
| `TestimonialCard` | Quote + author (conditional) | |
| `SocialLinks` | Renders from social config | `variant`, `platforms` |
| `ContactForm` | RHF + Zod + states | |
| `FormField` | Label, control, description, error | |
| `StatusMessage` | `role=status/alert` region | `type` |
| `Reveal` | Scroll reveal wrapper (client) | `delay` |
| `EmptyState`, `ErrorState` | Standard states | |
| `JsonLd` | Safe JSON-LD injection | |

Each component: typed props, no business data inside, a11y notes in code comments where non-obvious, works in 320 px.

## 9. Interaction states (all interactive elements)

Default, hover (not the only affordance), `:focus-visible` (2 px accent ring, 2 px offset), active, disabled (reduced contrast + `aria-disabled`), loading (button spinner + `aria-busy`).

## 10. Iconography

Lucide React for generic UI icons (menu, close, arrow, mail, download, external-link). Brand icons use local SVG components (see `08` §5 / ADR-07). Icon size scale 16/20/24 px; decorative icons `aria-hidden`.

## 11. Imagery

Next `Image` with explicit dimensions; descriptive `alt`; project screenshots must be real screenshots of verified projects, compressed; no stock "team" photos; the owner's photo only if supplied (OQ-09).

## 12. Hero visual spec (summary; layout in `05`)

A restrained, editor-style panel (monospace) presenting a profile "manifest": role, location, and the actual stack names from the skills config. Static content; optional short typing reveal; no invented metrics, no fake terminal output claiming results. Replaced by a plain typographic layout if the panel harms performance or accessibility.
