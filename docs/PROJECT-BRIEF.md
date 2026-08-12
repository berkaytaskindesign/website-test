# Project Brief — Berkay Taskin Personal Site (One-Pager)

## Reference
Base structural/behavioral reference: https://www.elirousso.com/
Pull from it: single long-scroll page, sticky top nav that jumps to sections, editorial/confident tone, work-entries-as-cards pattern, minimal footer with social links.
Do not copy: light theme, exact copy, exact fonts, or rounded/soft styling — this build is dark and edged instead.

## Goal
A single-page personal site for Berkay Taskin (product/UX designer, Salty Minds studio founder) that works as a portfolio landing page, a LinkedIn/speaking-bio reference, and a case-study jump-off point.

## Page Type
Single page (`index.html` or one route if using a framework). All sections live on one scroll; nav links are in-page anchors, not separate routes.

## Required Sections (in order)
1. **Nav** — sticky, top of viewport, present through entire scroll.
2. **Intro / Hero** — name, one-line positioning, short intro paragraph, primary CTA (e.g. contact/email).
3. **Product Beliefs** — exactly 3 beliefs/principles that define how Berkay approaches product/UX work. Each needs a short title + 1–2 sentence explanation.
4. **Work / Case Studies** — entry points only (cards/list linking to external case studies or a future `/work` page). Not full case study content on this page.
5. **About / Personal Detail** — longer-form bio: background, experience, Salty Minds, current focus (open to opportunities), interests. More detailed than the hero intro.
6. **Writing / Blog Entry** — pointer to latest LinkedIn post or blog entry (title, date, short excerpt, link out).
7. **Footer** — contact/email, social links (LinkedIn, website, Salty Minds), copyright line.

## Functional Requirements
- Sticky nav stays fixed on scroll; active-section highlighting as the user scrolls (scrollspy) is a nice-to-have, not required for v1.
- Smooth scroll to anchor on nav click.
- Fully responsive: mobile, tablet, desktop. Nav collapses to a simple horizontal list or hamburger on small screens (no rounded hamburger icon — keep it edged/geometric).
- No border-radius anywhere in the UI (buttons, cards, images, nav, inputs) — see DESIGN-SYSTEM.md.
- Dark theme only, no light-mode toggle needed for v1.
- Fonts: IBM Plex Sans for both headings and body (see DESIGN-SYSTEM.md for weights/scale).
- No text below 12px anywhere, including labels, meta text, and footer legal text.

## Tech Notes (for Cursor to decide/confirm in Plan mode)
- Suggested stack: plain HTML/CSS/JS or a lightweight static framework (Astro/Next static export). Cursor should propose the simplest option that supports a single static page with good Lighthouse scores.
- Self-host IBM Plex Sans (variable or static woff2) rather than relying on Google Fonts CDN if performance matters; otherwise `@font-face` via Google Fonts is acceptable for v1.
- No CMS needed — content is hardcoded in this pass. Structure content so it could be pulled into a CMS/JSON later.
- Case study and blog links point to external URLs for now (placeholders — see CONTENT-OUTLINE.md).

## Out of Scope (v1)
- Individual case study pages/content.
- Full blog/writing archive.
- CMS integration.
- Light theme.
- Animations beyond simple scroll/hover transitions.

## Open Questions for Berkay (fill in before/during build)
- Final copy for hero, 3 beliefs, about section, and blog excerpt (currently placeholder in CONTENT-OUTLINE.md).
- Real case study links/thumbnails.
- Accent color choice — DESIGN-SYSTEM.md proposes one option, confirm or swap.
- Domain/URL structure: does "Work" link to www.berkaytaskin.com/work, external case study links, or PDFs?
