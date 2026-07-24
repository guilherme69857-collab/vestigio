document.getElementById("year").textContent = new Date().getFullYear();

const overlayHeader = document.querySelector(".site-header--overlay");
if (overlayHeader) {
  const updateHeader = () => {
    overlayHeader.classList.toggle("scrolled", window.scrollY > 60);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

const dropsList = document.getElementById("drops-list");
if (dropsList && typeof drops !== "undefined") {
  drops.forEach((drop, index) => {
    const item = document.createElement("div");
    item.className = "drop-item";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "drop-toggle";
    button.setAttribute("aria-expanded", "false");
    button.textContent = drop.title.toUpperCase();

    const panel = document.createElement("div");
    panel.className = "drop-panel";
    panel.hidden = true;

    const grid = document.createElement("div");
    grid.className = "piece-grid";

    drop.pieces.forEach((piece) => {
      const card = document.createElement("article");
      card.className = "piece-card reveal";
      card.innerHTML = `
        <img class="piece-image" src="${encodeURI(piece.img)}" alt="${piece.name}" loading="lazy">
        <h3>${piece.name}</h3>
        <p class="piece-price">${piece.price}</p>
        <p class="piece-story">${piece.story}</p>
      `;
      grid.appendChild(card);
    });

    panel.appendChild(grid);

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      panel.hidden = isOpen;
      if (!isOpen) {
        requestAnimationFrame(() => {
          grid.querySelectorAll(".piece-card").forEach((card) => card.classList.add("is-visible"));
        });
      }
    });

    item.appendChild(button);
    item.appendChild(panel);
    dropsList.appendChild(item);
  });
}

const scrollRevealEls = document.querySelectorAll(".reveal:not(.piece-card)");
if (scrollRevealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  scrollRevealEls.forEach((el) => observer.observe(el));
}
