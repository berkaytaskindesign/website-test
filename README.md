# Berkay Taskin — Personal Portfolio

Single-page portfolio for Berkay Taskin. Dark theme, sharp edges, IBM Plex Sans.

**Live repo:** [github.com/berkaytaskindesign/website-test](https://github.com/berkaytaskindesign/website-test)

## Sections

| Section | ID | Notes |
|---------|-----|--------|
| Hero | `#intro` | Photo, eyebrow, intro copy, “See my work” CTA |
| Product Beliefs | `#beliefs` | Three principles |
| Work in Spotlight | `#work` | Six project cards |
| References | `#references` | Company tabs, auto-rotating quotes |
| About me | `#about` | Personal copy + rotating photo stack |
| Thoughts | `#thoughts` | LinkedIn-style posts, “Show more” |
| Contact | `#contact` | Footer with links |

Services (`#services`) is hidden in the markup for now.

## Preview locally

```bash
python3 -m http.server 3456
```

Open [http://localhost:3456](http://localhost:3456).

Or use any static server (`npx serve .`, VS Code Live Server, etc.).

## Edit content

All site copy and data live in **`js/content.js`** — hero, beliefs, work, references, about photos, thoughts, footer links.

Rendering and interactions are in **`js/main.js`** (references carousel, about photo stack, thoughts “Show more”, etc.).

## Edit design

| File | Purpose |
|------|---------|
| `css/tokens.css` | Colors, type scale, spacing |
| `css/base.css` | Reset, typography utilities |
| `css/layout.css` | Container, section layout |
| `css/components.css` | Hero, cards, references, about, footer |

Planning docs are in **`docs/`** (`PROJECT-BRIEF.md`, `DESIGN-SYSTEM.md`, `CONTENT-OUTLINE.md`).

## Design explorations

Layout and interaction options live under **`explore/`** (not linked from the main site):

| Page | What it explores |
|------|------------------|
| `explore/index.html` | Hub for all explorations |
| `explore/hero-photo.html` | Hero photo placement |
| `explore/work-cards.html` | Work card hover states |
| `explore/references.html` | Reference carousel styles |
| `explore/about.html` | About section layouts |
| `explore/about-images.html` | Subtle photo treatments |
| `explore/about-gallery.html` | Interactive photo galleries |
| `explore/about-rotate.html` | Auto-rotating portrait stacks |

## Assets

- `assets/bt_profile.png` — hero portrait
- `assets/placeholders/` — legacy SVG placeholders (work uses remote images from berkaytaskin.com)

## Deploy

Static files only. Deploy the project root to GitHub Pages, Netlify, Vercel, or any static host. No build step required.
