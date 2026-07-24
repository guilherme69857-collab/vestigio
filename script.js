document.getElementById("year").textContent = new Date().getFullYear();

const grain = document.createElement("div");
grain.className = "grain";
document.body.appendChild(grain);

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
  drops.forEach((drop, dropIndex) => {
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
      const card = document.createElement("a");
      card.className = "piece-card reveal";
      card.href = `peca.html?drop=${dropIndex}&id=${piece.id}`;
      card.innerHTML = `
        <img class="piece-image" src="${encodeURI(piece.img)}" alt="${piece.name}" loading="lazy">
        <h3>${piece.name}</h3>
        <p class="piece-price">${piece.price}</p>
        <p class="piece-story">${piece.story}</p>
      `;
      grid.appendChild(card);
    });

    panel.appendChild(grid);

    grid.addEventListener(
      "wheel",
      (event) => {
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
          event.preventDefault();
          grid.scrollLeft += event.deltaY;
        }
      },
      { passive: false }
    );

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

  const cursorHint = document.createElement("div");
  cursorHint.className = "gallery-cursor";
  cursorHint.textContent = "Ver peça";
  document.body.appendChild(cursorHint);

  dropsList.addEventListener("mousemove", (event) => {
    const card = event.target.closest(".piece-card");
    if (card) {
      cursorHint.style.opacity = "1";
      cursorHint.style.left = `${event.clientX}px`;
      cursorHint.style.top = `${event.clientY}px`;
    } else {
      cursorHint.style.opacity = "0";
    }
  });

  dropsList.addEventListener("mouseleave", () => {
    cursorHint.style.opacity = "0";
  });
}

const pieceDetail = document.getElementById("piece-detail");
if (pieceDetail && typeof drops !== "undefined") {
  const params = new URLSearchParams(window.location.search);
  const dropIndex = Number(params.get("drop"));
  const pieceId = params.get("id");
  const drop = drops[dropIndex];
  const piece = drop && drop.pieces.find((p) => p.id === pieceId);

  if (piece) {
    document.title = `${piece.name} — Vestígio`;
    pieceDetail.innerHTML = `
      <div class="container piece-detail-grid">
        <div class="piece-detail-image">
          <img src="${encodeURI(piece.img)}" alt="${piece.name}">
        </div>
        <div class="piece-detail-info">
          <a href="drops.html" class="piece-back">&larr; Voltar aos drops</a>
          <p class="piece-detail-number">${drop.title.toUpperCase()} &middot; Nº ${piece.id}</p>
          <h1>${piece.name}</h1>
          <p class="piece-detail-price">${piece.price}</p>
          <p class="piece-detail-story">${piece.story}</p>
          <a href="contato.html" class="piece-detail-cta">Tenho interesse</a>
        </div>
      </div>
    `;
  } else {
    pieceDetail.innerHTML = `
      <div class="container">
        <a href="drops.html" class="piece-back">&larr; Voltar aos drops</a>
        <p>Peça não encontrada.</p>
      </div>
    `;
  }
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
