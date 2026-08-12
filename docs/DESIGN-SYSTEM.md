# Design System — Berkay Taskin Personal Site

## Design Direction
Dark, edged, editorial. Confident whitespace like elirousso.com, but sharper: no soft corners, no rounded pills, no gradients-as-decoration. Hard edges, thin rules, high-contrast type hierarchy.

## Color Palette

Do not use pure black (`#000000`). Use dark blue-grey instead — this keeps the theme dark without going flat/dead.

| Token | Hex | Use |
|---|---|---|
| `--bg-primary` | `#12151C` | Page background |
| `--bg-secondary` | `#191D26` | Section alternation / nav background |
| `--bg-tertiary` | `#222733` | Cards, hover states, input fields |
| `--border` | `#2C3140` | Dividers, card borders, nav bottom border |
| `--text-primary` | `#EEF0F4` | Off-white — headings, primary body copy |
| `--text-secondary` | `#8B93A3` | Secondary text — subheads, descriptions |
| `--text-tertiary` | `#5E6577` | Meta text — dates, labels, captions (never below 12px even here) |
| `--accent` | `#5B7CFA` | Links, CTA buttons, active nav state, hover underline |
| `--accent-hover` | `#7A96FF` | Accent hover/active variant |

Accent is a proposed cool electric blue that sits naturally in the blue-grey family. Swap for a higher-contrast option (e.g. `#FF5A36` warm orange-red) if a punchier, more "edgy" accent is preferred against the cool background — flag this choice to Cursor as configurable via a CSS variable, not hardcoded.

Do not use pure white (`#FFFFFF`) for text — use `--text-primary`.

## Typography

**Font:** IBM Plex Sans for headings and body (no secondary font). Load weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold). Use `font-feature-settings` defaults — no need for IBM Plex Mono/Serif.

**Type scale** (rem, 16px root). Minimum font size anywhere on the page is 12px — no exceptions, including footer/meta/labels.

| Role | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| H1 / Hero name | 3.5rem (56px), 2.25rem (36px) mobile | 600 | 1.05 | -0.01em |
| H2 / Section title | 2rem (32px), 1.5rem (24px) mobile | 600 | 1.15 | -0.01em |
| H3 / Card title | 1.25rem (20px) | 600 | 1.25 | normal |
| Body large / intro paragraph | 1.125rem (18px) | 400 | 1.6 | normal |
| Body | 1rem (16px) | 400 | 1.6 | normal |
| Small / secondary | 0.875rem (14px) | 400 | 1.5 | normal |
| Meta / label / caption | 0.75rem (12px) — floor, do not go smaller | 500 | 1.4 | 0.02em, uppercase optional |

## Spacing & Grid
- Base spacing unit: 8px. Use multiples (8/16/24/32/48/64/96) for padding/margin/gaps.
- Max content width: 1120–1200px, centered, with 24px side padding on mobile, 48–64px on desktop.
- Section vertical padding: 96–120px desktop, 56–64px mobile.

## Shape Language — No Border-Radius
- `border-radius: 0` globally, including buttons, cards, images, inputs, nav pills, tags, avatar/photo crops.
- Use hard 1px borders (`--border`) instead of shadows to separate cards/panels where needed.
- If depth is needed, use a flat offset (e.g. a thin accent-colored border-left on hover, or a 2px hard shadow with no blur: `box-shadow: 4px 4px 0 var(--border)`), not soft/blurred shadows — keeps the "edgy" feel.
- Dividers between sections: 1px solid `--border`, full-width or content-width.

## Components

**Sticky Nav**
- Fixed to top (`position: sticky` or `fixed`), full width, `z-index` above content.
- Background: `--bg-secondary` at ~90–95% opacity with backdrop blur (8–12px) OR solid `--bg-secondary` — no transparency-to-page-bg bleed that hurts contrast.
- Bottom border: 1px solid `--border`.
- Height: 64–72px desktop, 56px mobile.
- Nav items: uppercase or sentence case, 14px, 500 weight, `--text-secondary` default, `--text-primary` or `--accent` on hover/active.
- Active section indicator: 2px solid underline in `--accent` (square-edged, not a rounded pill).
- Mobile: horizontal scroll of links, or a square hamburger icon (three straight bars, no rounded caps) that opens a full-bleed square-cornered overlay menu.

**Buttons**
- Rectangular, no radius. Primary: solid `--accent` background, `--bg-primary` or `--text-primary` text depending on contrast check, on hover shift to `--accent-hover`. Secondary: 1px border `--border`, transparent background, text `--text-primary`, hover border `--accent`.
- Padding: 12px 24px (14–16px text).

**Cards (Case Study / Work entries)**
- `--bg-tertiary` background, 1px `--border`, no radius.
- Image/thumbnail: full-bleed top of card, hard-cropped rectangle, no radius, subtle desaturation with full color on hover.
- Title (H3) + one-line meta (category/year, 12px, `--text-tertiary`).
- Entire card is a link; hover state: border shifts to `--accent`, slight translateY(-2px) optional.

**Product Belief blocks (3-up)**
- 3-column grid desktop (stacks to 1 column mobile), each with a number or short label (e.g. "01"), H3 title, 1–2 sentence body in `--text-secondary`.
- Separated by 1px vertical `--border` between columns on desktop, horizontal rule on mobile.

**Blog/Writing entry**
- Single horizontal card or row: title, date + read-time meta (12px), 1–2 line excerpt, arrow/link affordance. No radius, 1px border, hover accent border.

## Accessibility
- Maintain WCAG AA contrast: `--text-primary` on `--bg-primary`/`--bg-secondary` passes; verify `--text-secondary` and `--accent` against backgrounds before finalizing.
- Visible focus states on all interactive elements: 2px solid `--accent` outline, offset 2px, square corners (no radius on focus ring either).
