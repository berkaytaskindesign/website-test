(function () {
  "use strict";

  const PHOTOS = [
    {
      src: "https://www.berkaytaskin.com/lovable-uploads/6ec9d1a1-65fe-47e1-8bdb-8c5ea0279f97.png",
      alt: "Berkay wearing sunglasses"
    },
    {
      src: "https://www.berkaytaskin.com/lovable-uploads/9f0252ed-e0c5-417a-a67f-8209ff85f9f4.png",
      alt: "Berkay walking with a surfboard"
    },
    {
      src: "https://www.berkaytaskin.com/lovable-uploads/0424c991-e065-44f3-b10e-b3003982c02b.png",
      alt: "Berkay full-body portrait"
    },
    {
      src: "https://www.berkaytaskin.com/lovable-uploads/31a8af38-323f-4d46-a166-1bdf2fe24bbc.png",
      alt: "Berkay surfing"
    }
  ];

  const INTERVAL_MS = 6000;
  const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function restartProgress(root) {
    const fill = root.querySelector("[data-rotate-progress]");
    if (!fill || REDUCED_MOTION) return;

    fill.classList.remove("is-running");
    fill.style.width = "0%";
    void fill.offsetWidth;
    fill.classList.add("is-running");
  }

  function initRotator(root) {
    const mode = root.dataset.rotate;
    const slides = Array.from(root.querySelectorAll("[data-rotate-slide]"));
    const stackCards = mode === "stack"
      ? Array.from(root.querySelectorAll("[data-rotate-card]"))
      : [];
    const dots = root.querySelectorAll("[data-rotate-dot]");
    const total = mode === "stack" ? stackCards.length : slides.length;

    if (!total) return;

    let index = 0;
    let timer = null;
    let isPaused = false;

    function setDots(activeIndex) {
      dots.forEach((dot, i) => {
        const isActive = i === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });
    }

    function goTo(nextIndex) {
      index = (nextIndex + total) % total;

      if (mode === "fade" || mode === "kenburns") {
        slides.forEach((slide, i) => {
          slide.classList.toggle("is-active", i === index);
          slide.hidden = i !== index;
          slide.setAttribute("aria-hidden", i === index ? "false" : "true");
        });
      } else if (mode === "slide") {
        slides.forEach((slide, i) => {
          const wasActive = slide.classList.contains("is-active");
          slide.classList.remove("is-entering", "is-exiting", "is-active");

          if (i === index) {
            slide.hidden = false;
            slide.setAttribute("aria-hidden", "false");
            slide.classList.add("is-active", "is-entering");
          } else {
            slide.setAttribute("aria-hidden", "true");
            if (wasActive) {
              slide.classList.add("is-exiting");
              window.setTimeout(() => {
                slide.hidden = true;
                slide.classList.remove("is-exiting");
              }, REDUCED_MOTION ? 0 : 500);
            } else {
              slide.hidden = true;
            }
          }
        });
      } else if (mode === "stack") {
        stackCards.forEach((card, i) => {
          const offset = (i - index + total) % total;
          card.dataset.stackOffset = String(offset);
          card.classList.toggle("is-front", offset === 0);
          card.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
        });
      }

      setDots(index);
      restartProgress(root);
    }

    function next() {
      goTo(index + 1);
    }

    function startTimer() {
      if (REDUCED_MOTION || isPaused) return;
      clearInterval(timer);
      timer = window.setInterval(next, INTERVAL_MS);
      restartProgress(root);
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

    root.addEventListener("focusin", () => {
      isPaused = true;
      stopTimer();
    });

    root.addEventListener("focusout", (event) => {
      if (root.contains(event.relatedTarget)) return;
      isPaused = false;
      startTimer();
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        goTo(Number(dot.dataset.rotateDot));
        if (!isPaused) {
          stopTimer();
          startTimer();
        }
      });
    });

    goTo(0);
    startTimer();
  }

  document.querySelectorAll("[data-rotate]").forEach(initRotator);
})();
