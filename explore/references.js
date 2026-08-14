(function () {
  "use strict";

  const INTERVAL_MS = 10000;
  const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const REFERENCES = [
    {
      company: "EVBox",
      text: "Great collaboration for sure, perfect workshop facilitation by Berkay! Very happy with this discovery team. We are also learning a lot from support engineers on technical insights. It is nice that we validate the ideas with users in multiple sessions, multiple times",
      name: "Erik van Aalzum",
      role: "Lead Product Manager @ EVBox"
    },
    {
      company: "Studyportals",
      text: "Relentless drive to improve the product, processes and own skills comes to mind when I think about Berkay. I had the pleasure of working with Berkay for 5.5 years at Studyportals. During this time, Berkay made things happen in the design system, website redesign, product strategy workflow improvements and many more projects. He also helped other designers and product owners to grow by sharing his learnings and providing encouragement. I am looking forward to the next time we can collaborate again!",
      name: "Den Tserkovnyi",
      role: "UX Team Lead @ Studyportals"
    },
    {
      company: "Sappi",
      text: "I hired Berkay, when I was Head of UX in Sappi, as a freelance product designer on the redesign of a complex decision-support application. Berkay executed with high quality and speed and integrated seamlessly with our team. The result was very well-received from our end-users and had material impact for their needs. Berkay turned a complex data-heavy application in a simple-to-use, aesthetically pleasing artefact! I would highly recommend Berkay for all design projects and particularly very demanding ones!",
      name: "Javed-Vassilis Khan",
      role: "Former Head of UX at Sappi"
    }
  ];

  const progressMarkup = `
    <div class="ref-carousel__progress" aria-hidden="true">
      <div class="ref-carousel__progress-fill" data-carousel-progress></div>
    </div>
  `;

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function slideMarkup(ref, index, isSlideTrack) {
    const hiddenAttr = isSlideTrack ? "" : index === 0 ? "" : ' hidden aria-hidden="true"';
    return `
      <blockquote class="ref-carousel__slide" data-slide="${index}"${hiddenAttr ? " " + hiddenAttr.trim() : ""}>
        <p class="text-meta ref-carousel__company">${escapeHtml(ref.company)}</p>
        <p class="ref-carousel__text">${escapeHtml(ref.text)}</p>
        <footer class="ref-carousel__attribution">
          <p class="ref-carousel__name">${escapeHtml(ref.name)}</p>
          <p class="ref-carousel__role">${escapeHtml(ref.role)}</p>
        </footer>
      </blockquote>
    `;
  }

  function initCarousel(root) {
    const type = root.dataset.carousel;
    const track = root.querySelector("[data-carousel-track]");
    const prevBtn = root.querySelector("[data-carousel-prev]");
    const nextBtn = root.querySelector("[data-carousel-next]");
    const dots = root.querySelectorAll("[data-carousel-dot]");
    const tabs = root.querySelectorAll("[data-carousel-tab]");
    const counter = root.querySelector("[data-carousel-counter]");
    const progressFill = root.querySelector("[data-carousel-progress]");
    const slides = () => root.querySelectorAll("[data-slide]");

    let index = 0;
    const total = REFERENCES.length;
    let isPaused = false;

    function restartProgress() {
      if (!progressFill || REDUCED_MOTION) return;

      progressFill.classList.remove("is-running");
      progressFill.style.width = "0%";
      void progressFill.offsetWidth;
      progressFill.classList.add("is-running");
    }

    function goTo(nextIndex) {
      index = (nextIndex + total) % total;
      const allSlides = slides();

      allSlides.forEach((slide, i) => {
        const active = i === index;
        if (type === "slide") {
          slide.hidden = false;
          slide.setAttribute("aria-hidden", active ? "false" : "true");
        } else {
          slide.hidden = !active;
          slide.setAttribute("aria-hidden", active ? "false" : "true");
        }
        slide.classList.toggle("is-active", active);
      });

      if (type === "slide" && track) {
        track.style.transform = `translateX(-${index * 100}%)`;
      }

      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
        dot.setAttribute("aria-selected", i === index ? "true" : "false");
      });

      tabs.forEach((tab, i) => {
        tab.classList.toggle("is-active", i === index);
        tab.setAttribute("aria-selected", i === index ? "true" : "false");
      });

      if (counter) {
        counter.textContent =
          String(index + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");
      }

      restartProgress();
    }

    function pause() {
      isPaused = true;
      root.classList.add("is-paused");
    }

    function resume() {
      isPaused = false;
      root.classList.remove("is-paused");
      restartProgress();
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => goTo(index - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => goTo(index + 1));
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => goTo(i));
    });

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => goTo(i));
    });

    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(index - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(index + 1);
      }
    });

    root.addEventListener("mouseenter", pause);
    root.addEventListener("mouseleave", resume);
    root.addEventListener("focusin", pause);
    root.addEventListener("focusout", (e) => {
      if (!root.contains(e.relatedTarget)) resume();
    });

    if (progressFill) {
      progressFill.style.setProperty("--ref-interval", INTERVAL_MS + "ms");
      progressFill.addEventListener("animationend", (e) => {
        if (e.target !== progressFill || isPaused || REDUCED_MOTION) return;
        goTo(index + 1);
      });
    }

    goTo(0);
  }

  function buildCarousel(type) {
    const isSlideTrack = type === "slide";
    const slidesHtml = REFERENCES.map((ref, i) => slideMarkup(ref, i, isSlideTrack)).join("");
    const dotsHtml = REFERENCES.map(
      (_, i) =>
        `<button type="button" class="ref-carousel__dot${i === 0 ? " is-active" : ""}" data-carousel-dot="${i}" aria-label="Reference ${i + 1}" aria-selected="${i === 0 ? "true" : "false"}"></button>`
    ).join("");
    const tabsHtml = REFERENCES.map(
      (ref, i) =>
        `<button type="button" class="ref-carousel__tab${i === 0 ? " is-active" : ""}" data-carousel-tab="${i}" aria-selected="${i === 0 ? "true" : "false"}">${escapeHtml(ref.company)}</button>`
    ).join("");

    if (type === "arrows") {
      return `
        <div class="ref-carousel ref-carousel--arrows" data-carousel="arrows" tabindex="0">
          <div class="ref-carousel__viewport" data-carousel-viewport>
            <div class="ref-carousel__track" data-carousel-track>${slidesHtml}</div>
          </div>
          ${progressMarkup}
          <div class="ref-carousel__footer">
            <button type="button" class="ref-carousel__arrow" data-carousel-prev aria-label="Previous reference">←</button>
            <div class="ref-carousel__dots" role="tablist" aria-label="References">${dotsHtml}</div>
            <button type="button" class="ref-carousel__arrow" data-carousel-next aria-label="Next reference">→</button>
          </div>
        </div>
      `;
    }

    if (type === "tabs") {
      return `
        <div class="ref-carousel ref-carousel--tabs" data-carousel="tabs" tabindex="0">
          <div class="ref-carousel__tabs" role="tablist" aria-label="Select company">${tabsHtml}</div>
          <div class="ref-carousel__viewport" data-carousel-viewport>
            <div class="ref-carousel__track" data-carousel-track>${slidesHtml}</div>
          </div>
          ${progressMarkup}
        </div>
      `;
    }

    if (type === "slide") {
      return `
        <div class="ref-carousel ref-carousel--slide" data-carousel="slide" tabindex="0">
          <div class="ref-carousel__viewport" data-carousel-viewport>
            <div class="ref-carousel__track ref-carousel__track--slide" data-carousel-track>${slidesHtml}</div>
          </div>
          ${progressMarkup}
          <div class="ref-carousel__footer">
            <button type="button" class="ref-carousel__arrow" data-carousel-prev aria-label="Previous reference">←</button>
            <div class="ref-carousel__dots" role="tablist" aria-label="References">${dotsHtml}</div>
            <button type="button" class="ref-carousel__arrow" data-carousel-next aria-label="Next reference">→</button>
          </div>
        </div>
      `;
    }

    if (type === "counter") {
      return `
        <div class="ref-carousel ref-carousel--counter" data-carousel="counter" tabindex="0">
          <div class="ref-carousel__viewport" data-carousel-viewport>
            <div class="ref-carousel__track" data-carousel-track>${slidesHtml}</div>
          </div>
          ${progressMarkup}
          <div class="ref-carousel__footer ref-carousel__footer--counter">
            <p class="ref-carousel__counter" data-carousel-counter aria-live="polite">01 / 03</p>
            <div class="ref-carousel__text-nav">
              <button type="button" class="ref-carousel__text-btn" data-carousel-prev>Previous</button>
              <span class="ref-carousel__divider" aria-hidden="true">·</span>
              <button type="button" class="ref-carousel__text-btn" data-carousel-next>Next</button>
            </div>
          </div>
        </div>
      `;
    }

    return "";
  }

  document.querySelectorAll("[data-carousel-mount]").forEach((mount) => {
    const type = mount.dataset.carouselMount;
    mount.innerHTML = buildCarousel(type);
    const carousel = mount.querySelector("[data-carousel]");
    if (carousel) initCarousel(carousel);
  });
})();
