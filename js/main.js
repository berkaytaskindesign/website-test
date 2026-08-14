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

  function renderHero() {
    const { hero } = content;

    const eyebrow = $("[data-hero-eyebrow]");
    const title = $("[data-hero-title]");
    const subhead = $("[data-hero-subhead]");
    const body = $("[data-hero-body]");
    const photo = $("[data-hero-photo]");
    const cta = $("[data-hero-cta]");

    if (eyebrow) eyebrow.textContent = hero.eyebrow;
    if (title) title.textContent = hero.title;
    if (subhead) subhead.textContent = hero.subhead;
    if (body) body.textContent = hero.body;
    if (photo && hero.image) {
      photo.src = hero.image;
      photo.alt = hero.imageAlt || "";
    }
    if (cta && hero.cta) {
      cta.textContent = hero.cta.label;
      cta.href = hero.cta.href;
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
  }

  function renderReferences() {
    const { references } = content;
    if (!references) return;

    const title = $("[data-references-title]");
    const intro = $("[data-references-intro]");
    const root = $("[data-references-root]");

    if (title) title.textContent = references.title;
    if (intro) intro.textContent = references.intro;

    if (!root) return;

    const tabsHtml = references.items
      .map(
        (item, i) =>
          `<button type="button" class="refs__tab${i === 0 ? " is-active" : ""}" data-refs-tab="${i}" aria-selected="${i === 0 ? "true" : "false"}">${escapeHtml(item.company)}</button>`
      )
      .join("");

    const slidesHtml = references.items
      .map((item, i) => {
        const hidden = i === 0 ? "" : ' hidden aria-hidden="true"';
        const projectLink = item.projectHref
          ? `<a href="${escapeHtml(item.projectHref)}" class="refs__project-link" target="_blank" rel="noopener noreferrer">${escapeHtml(item.projectLabel || "View project")} →</a>`
          : "";
        return `
          <blockquote class="refs__slide${i === 0 ? " is-active" : ""}" data-refs-slide="${i}"${hidden ? " " + hidden.trim() : ""}>
            <p class="refs__text">${escapeHtml(item.text)}</p>
            <footer class="refs__attribution">
              <div class="refs__rule" aria-hidden="true">
                <div class="refs__rule-fill" data-refs-progress></div>
              </div>
              <div class="refs__attribution-row">
                <div>
                  <p class="refs__name">${escapeHtml(item.name)}</p>
                  <p class="refs__role">${escapeHtml(item.role)}</p>
                </div>
                ${projectLink}
              </div>
            </footer>
          </blockquote>
        `;
      })
      .join("");

    root.innerHTML = `
      <div class="refs__carousel" data-refs-carousel tabindex="0" style="--refs-interval: ${references.intervalMs || 10000}ms">
        <div class="refs__tabs" role="tablist" aria-label="Select company">${tabsHtml}</div>
        <div class="refs__viewport">
          <div class="refs__track">${slidesHtml}</div>
        </div>
      </div>
    `;

    initReferencesCarousel(root.querySelector("[data-refs-carousel]"), references);
  }

  function initReferencesCarousel(carousel, references) {
    if (!carousel) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tabs = carousel.querySelectorAll("[data-refs-tab]");
    const slides = () => carousel.querySelectorAll("[data-refs-slide]");
    const total = references.items.length;
    let index = 0;
    let isPaused = false;

    function restartProgress(slide) {
      if (reducedMotion || !slide) return;
      const fill = slide.querySelector("[data-refs-progress]");
      if (!fill) return;
      fill.classList.remove("is-running");
      fill.style.width = "0%";
      void fill.offsetWidth;
      fill.classList.add("is-running");
    }

    function goTo(nextIndex) {
      index = (nextIndex + total) % total;
      const allSlides = slides();

      allSlides.forEach((slide, i) => {
        const active = i === index;
        slide.hidden = !active;
        slide.setAttribute("aria-hidden", active ? "false" : "true");
        slide.classList.toggle("is-active", active);
        const fill = slide.querySelector("[data-refs-progress]");
        if (fill) fill.classList.remove("is-running");
      });

      tabs.forEach((tab, i) => {
        tab.classList.toggle("is-active", i === index);
        tab.setAttribute("aria-selected", i === index ? "true" : "false");
      });

      const activeSlide = allSlides[index];
      restartProgress(activeSlide);
    }

    function pause() {
      isPaused = true;
      carousel.classList.add("is-paused");
    }

    function resume() {
      isPaused = false;
      carousel.classList.remove("is-paused");
      restartProgress(slides()[index]);
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => goTo(i));
    });

    carousel.addEventListener("mouseenter", pause);
    carousel.addEventListener("mouseleave", resume);
    carousel.addEventListener("focusin", pause);
    carousel.addEventListener("focusout", (e) => {
      if (!carousel.contains(e.relatedTarget)) resume();
    });

    slides().forEach((slide) => {
      const fill = slide.querySelector("[data-refs-progress]");
      if (!fill) return;
      fill.addEventListener("animationend", (e) => {
        if (e.target !== fill || isPaused || reducedMotion) return;
        if (slide.classList.contains("is-active")) goTo(index + 1);
      });
    });

    goTo(0);
  }

  function renderServices() {
    const { services } = content;
    if (!services) return;

    const title = $("[data-services-title]");
    const intro = $("[data-services-intro]");

    if (title) title.textContent = services.title;
    if (intro) intro.textContent = services.intro;
  }

  function renderAbout() {
    const { about } = content;

    const title = $("[data-about-title]");
    const paragraphs = $("[data-about-paragraphs]");
    const stack = $("[data-about-stack]");

    if (title) title.textContent = about.title;

    if (paragraphs) {
      paragraphs.innerHTML = about.paragraphs
        .map((p) => `<p class="text-body">${escapeHtml(p)}</p>`)
        .join("");
    }

    if (stack && about.photos?.length) {
      const cards = about.photos
        .map(
          (photo, i) => `
            <figure class="about__stack-card${i === 0 ? " is-front" : ""}" data-about-card data-stack-offset="${i}"${i === 0 ? "" : ' aria-hidden="true"'}>
              <img
                class="about__stack-img"
                src="${escapeHtml(photo.src)}"
                alt="${escapeHtml(photo.alt)}"
                width="208"
                height="296"
                loading="${i === 0 ? "eager" : "lazy"}"
              >
            </figure>
          `
        )
        .join("");

      stack.innerHTML = `<div class="about__stack-frame">${cards}</div>`;
    }
  }

  function initAboutStack() {
    const root = $("[data-about-stack]");
    if (!root) return;

    const cards = Array.from(root.querySelectorAll("[data-about-card]"));
    const total = cards.length;
    if (!total) return;

    const INTERVAL_MS = 4000;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let index = 0;
    let timer = null;
    let isPaused = false;

    function goTo(nextIndex) {
      index = (nextIndex + total) % total;
      cards.forEach((card, i) => {
        const offset = (i - index + total) % total;
        card.dataset.stackOffset = String(offset);
        card.classList.toggle("is-front", offset === 0);
        card.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
      });
    }

    function startTimer() {
      if (reducedMotion || isPaused) return;
      clearInterval(timer);
      timer = window.setInterval(() => goTo(index + 1), INTERVAL_MS);
    }

    function stopTimer() {
      clearInterval(timer);
      timer = null;
    }

    root.addEventListener("mouseenter", () => {
      isPaused = true;
      stopTimer();
    });

    root.addEventListener("mouseleave", () => {
      isPaused = false;
      startTimer();
    });

    goTo(0);
    startTimer();
  }

  function renderWriting() {
    const { writing } = content;

    const title = $("[data-writing-title]");
    const intro = $("[data-writing-intro]");
    const list = $("[data-writing-list]");
    const moreWrap = $("[data-writing-more]");
    const moreBtn = $("[data-writing-more-btn]");

    if (title) title.textContent = writing.title;
    if (intro) intro.textContent = writing.intro;

    const initialVisible = writing.initialVisible ?? writing.entries.length;

    if (list) {
      list.innerHTML = writing.entries
        .map(
          (entry, i) => `
          <li class="writing-list__item${i >= initialVisible ? " writing-list__item--collapsed" : ""}">
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

    if (moreWrap && moreBtn && writing.entries.length > initialVisible) {
      moreWrap.hidden = false;
      moreBtn.textContent = writing.showMoreLabel || "Show more";
      moreBtn.addEventListener("click", () => {
        list.querySelectorAll(".writing-list__item--collapsed").forEach((item) => {
          item.classList.remove("writing-list__item--collapsed");
        });
        moreWrap.hidden = true;
      });
    }
  }

  function renderFooter() {
    const { footer, hero } = content;

    const contactLabel = $("[data-footer-contact-label]");
    const title = $("[data-footer-title]");
    const role = $("[data-footer-role]");
    const links = $("[data-footer-links]");

    if (title) title.textContent = hero.title;

    if (role) role.textContent = hero.eyebrow;

    if (contactLabel) contactLabel.textContent = footer.contactLabel;

    if (links) {
      links.innerHTML = footer.links
        .map(
          (link) =>
            `<a href="${escapeHtml(link.href)}" class="site-footer__link" ${link.href.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>${escapeHtml(link.label)}</a>`
        )
        .join("");
    }
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
    renderHero();
    renderBeliefs();
    renderWork();
    renderReferences();
    renderServices();
    renderAbout();
    initAboutStack();
    renderWriting();
    renderFooter();
    initSmoothScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
