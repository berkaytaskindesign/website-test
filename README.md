# Berkay Taskin — Personal Portfolio

Single-page portfolio site. Dark theme, sharp edges, IBM Plex Sans.

## Preview locally

```bash
npx serve .
```

Then open `http://localhost:3000` in your browser.

Or open `index.html` directly in a browser (some features work best with a local server).

## Edit content

All copy lives in **`js/content.js`**. Edit that file to swap in real text, links, and project details. Placeholder strings from `docs/CONTENT-OUTLINE.md` are used as-is until you replace them.

## Edit design tokens

Colors, typography, and spacing are defined in **`css/tokens.css`**. Component styles are in `css/components.css`.

## Replace work thumbnails

Drop project images into **`assets/placeholders/`** (or update image paths in `content.js`).

## Planning docs

- `docs/PROJECT-BRIEF.md` — scope and requirements
- `docs/DESIGN-SYSTEM.md` — palette, type, components
- `docs/CONTENT-OUTLINE.md` — section copy structure

## Deploy

Static files only — deploy the project root to Netlify, GitHub Pages, Vercel, or any static host.
