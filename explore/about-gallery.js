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

  function setActiveIndex(root, index) {
    const buttons = root.querySelectorAll("[data-agallery-index]");
    const mainImg = root.querySelector("[data-agallery-main-img]");

    if (!mainImg || !buttons.length) return;

    const safeIndex = ((index % buttons.length) + buttons.length) % buttons.length;
    const photo = PHOTOS[safeIndex];

    mainImg.src = photo.src;
    mainImg.alt = photo.alt;
    root.dataset.activeIndex = String(safeIndex);

    buttons.forEach((button) => {
      const isActive = Number(button.dataset.agalleryIndex) === safeIndex;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
      button.setAttribute("tabindex", isActive ? "0" : "-1");
    });
  }

  function initGallery(root) {
    const buttons = root.querySelectorAll("[data-agallery-index]");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        setActiveIndex(root, Number(button.dataset.agalleryIndex));
      });

      button.addEventListener("keydown", (event) => {
        const current = Number(root.dataset.activeIndex || 0);
        let next = current;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          next = current + 1;
          event.preventDefault();
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          next = current - 1;
          event.preventDefault();
        } else if (event.key === "Home") {
          next = 0;
          event.preventDefault();
        } else if (event.key === "End") {
          next = buttons.length - 1;
          event.preventDefault();
        } else {
          return;
        }

        setActiveIndex(root, next);
        root.querySelector(`[data-agallery-index="${((next % buttons.length) + buttons.length) % buttons.length}"]`)?.focus();
      });
    });

    setActiveIndex(root, Number(root.dataset.activeIndex || 0));
  }

  document.querySelectorAll("[data-agallery]").forEach(initGallery);
})();
