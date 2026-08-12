(function () {
  "use strict";

  const content = window.SITE_CONTENT;
  if (!content) return;

  function $(selector) {
    return document.querySelector(selector);
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function renderNav() {
    const { nav } = content;

    const linksContainer = $("[data-nav-links]");
    const overlayContainer = $("[data-nav-overlay]");

    if (linksContainer) {
      linksContainer.innerHTML = nav.links
        .map(
          (link) =>
            `<a href="${escapeHtml(link.href)}" class="site-nav__link">${escapeHtml(link.label)}</a>`
        )
        .join("");
    }

    if (overlayContainer) {
      overlayContainer.innerHTML = nav.links
        .map(
          (link) =>
            `<a href="${escapeHtml(link.href)}" class="site-nav__overlay-link">${escapeHtml(link.label)}</a>`
        )
        .join("");
    }
  }

  function renderHero() {
    const { hero } = content;

    const eyebrow = $("[data-hero-eyebrow]");
    const title = $("[data-hero-title]");
    const subhead = $("[data-hero-subhead]");
    const body = $("[data-hero-body]");
    const ctas = $("[data-hero-ctas]");

    if (eyebrow) eyebrow.textContent = hero.eyebrow;
    if (title) title.textContent = hero.title;
    if (subhead) subhead.textContent = hero.subhead;
    if (body) body.textContent = hero.body;

    if (ctas && hero.ctas) {
      ctas.innerHTML = hero.ctas
        .map(
          (cta) =>
            `<a href="${escapeHtml(cta.href)}" class="btn btn--${escapeHtml(cta.variant)}">${escapeHtml(cta.label)}</a>`
        )
        .join("");
    }
  }

  function renderBeliefs() {
    const { beliefs } = content;

    const title = $("[data-beliefs-title]");
    const intro = $("[data-beliefs-intro]");
    const grid = $("[data-beliefs-grid]");

    if (title) title.textContent = beliefs.title;
    if (intro) intro.textContent = beliefs.intro;

    if (grid) {
      grid.innerHTML = beliefs.items
        .map(
          (item) => `
          <article class="belief">
            <p class="text-meta belief__number">${escapeHtml(item.number)}</p>
            <h3 class="text-h3 belief__title">${escapeHtml(item.title)}</h3>
            <p class="text-body belief__body">${escapeHtml(item.body)}</p>
          </article>
        `
        )
        .join("");
    }
  }

  function renderWork() {
    const { work } = content;

    const title = $("[data-work-title]");
    const intro = $("[data-work-intro]");
    const grid = $("[data-work-grid]");
    const cta = $("[data-work-cta]");

    if (title) title.textContent = work.title;
    if (intro) intro.textContent = work.intro;

    if (grid) {
      grid.innerHTML = work.projects
        .map(
          (project) => `
          <a href="${escapeHtml(project.href)}" class="work-card">
            <div class="work-card__image-wrap">
              <img
                class="work-card__image"
                src="${escapeHtml(project.image)}"
                alt=""
                width="560"
                height="350"
                loading="lazy"
              >
            </div>
            <div class="work-card__content">
              <h3 class="text-h3 work-card__title">${escapeHtml(project.title)}</h3>
              <p class="text-meta work-card__meta">${escapeHtml(project.meta)}</p>
              <p class="work-card__description">${escapeHtml(project.description)}</p>
            </div>
          </a>
        `
        )
        .join("");
    }

    if (cta && work.cta) {
      cta.innerHTML = `<a href="${escapeHtml(work.cta.href)}" class="btn btn--secondary">${escapeHtml(work.cta.label)}</a>`;
    }
  }

  function renderAbout() {
    const { about } = content;

    const title = $("[data-about-title]");
    const paragraphs = $("[data-about-paragraphs]");
    const facts = $("[data-about-facts]");

    if (title) title.textContent = about.title;

    if (paragraphs) {
      paragraphs.innerHTML = about.paragraphs
        .map((p) => `<p class="text-body">${escapeHtml(p)}</p>`)
        .join("");
    }

    if (facts) {
      facts.innerHTML = about.facts
        .map((fact) => {
          const value = fact.href
            ? `<a href="${escapeHtml(fact.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(fact.value)}</a>`
            : escapeHtml(fact.value);
          return `
            <div class="about__fact">
              <span class="text-meta about__fact-label">${escapeHtml(fact.label)}</span>
              <span class="about__fact-value">${value}</span>
            </div>
          `;
        })
        .join("");
    }
  }

  function renderWriting() {
    const { writing } = content;

    const title = $("[data-writing-title]");
    const intro = $("[data-writing-intro]");
    const list = $("[data-writing-list]");

    if (title) title.textContent = writing.title;
    if (intro) intro.textContent = writing.intro;

    if (list) {
      list.innerHTML = writing.entries
        .map(
          (entry) => `
          <li>
            <a href="${escapeHtml(entry.href)}" class="writing-entry" target="_blank" rel="noopener noreferrer">
              <div class="writing-entry__header">
                <h3 class="text-h3 writing-entry__title">${escapeHtml(entry.title)}</h3>
                <span class="text-meta writing-entry__meta">${escapeHtml(entry.date)} · ${escapeHtml(entry.readTime)}</span>
              </div>
              <p class="writing-entry__excerpt">${escapeHtml(entry.excerpt)}</p>
              <span class="writing-entry__arrow" aria-hidden="true">Read →</span>
            </a>
          </li>
        `
        )
        .join("");
    }
  }

  function renderFooter() {
    const { footer } = content;

    const contactLabel = $("[data-footer-contact-label]");
    const email = $("[data-footer-email]");
    const links = $("[data-footer-links]");
    const copyright = $("[data-footer-copyright]");

    if (contactLabel) contactLabel.textContent = footer.contactLabel;

    if (email) {
      email.textContent = footer.email;
      email.href = `mailto:${footer.email}`;
    }

    if (links) {
      links.innerHTML = footer.links
        .map(
          (link) =>
            `<a href="${escapeHtml(link.href)}" class="site-footer__link" ${link.href.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>${escapeHtml(link.label)}</a>`
        )
        .join("");
    }

    if (copyright) copyright.textContent = footer.copyright;
  }

  function initMobileMenu() {
    const toggle = $("[data-nav-toggle]");
    const overlay = $("[data-nav-overlay]");

    if (!toggle || !overlay) return;

    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      overlay.classList.remove("is-open");
    }

    function openMenu() {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      overlay.classList.add("is-open");
    }

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener("click", (e) => {
      if (e.target.matches(".site-nav__overlay-link")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener("click", (e) => {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      const pill = toggle.closest(".site-nav__pill");
      if (pill && !pill.contains(e.target)) {
        closeMenu();
      }
    });
  }

  function initSmoothScroll() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const id = link.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  }

  function init() {
    renderNav();
    renderHero();
    renderBeliefs();
    renderWork();
    renderAbout();
    renderWriting();
    renderFooter();
    initMobileMenu();
    initSmoothScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
