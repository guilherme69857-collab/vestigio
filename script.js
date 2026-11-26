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

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".site-header nav");
if (menuToggle && mainNav) {
  const backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  document.body.appendChild(backdrop);

  const closeMenu = () => {
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("open");
    backdrop.classList.remove("open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    mainNav.classList.toggle("open", isOpen);
    backdrop.classList.toggle("open", isOpen);
  });

  backdrop.addEventListener("click", closeMenu);
  mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}

const acervoList = document.getElementById("acervo-list");
if (acervoList && typeof acervo !== "undefined") {
  acervo.forEach((piece) => {
    const card = document.createElement("a");
    card.className = "piece-card reveal";
    card.href = `peca.html?id=${piece.id}`;
    card.innerHTML = `
      <img class="piece-image" src="${encodeURI(piece.img)}" alt="${piece.name}" loading="lazy">
      <h3>${piece.name}</h3>
      <p class="piece-designer">${piece.designer}</p>
      <p class="piece-story">${piece.story}</p>
    `;
    acervoList.appendChild(card);
  });

  const cursorHint = document.createElement("div");
  cursorHint.className = "gallery-cursor";
  cursorHint.textContent = "Ver peça";
  document.body.appendChild(cursorHint);

  acervoList.addEventListener("mousemove", (event) => {
    const card = event.target.closest(".piece-card");
    if (card) {
      cursorHint.style.opacity = "1";
      cursorHint.style.left = `${event.clientX}px`;
      cursorHint.style.top = `${event.clientY}px`;
    } else {
      cursorHint.style.opacity = "0";
    }
  });

  acervoList.addEventListener("mouseleave", () => {
    cursorHint.style.opacity = "0";
  });
}

const pieceDetail = document.getElementById("piece-detail");
if (pieceDetail && typeof acervo !== "undefined") {
  const params = new URLSearchParams(window.location.search);
  const pieceId = params.get("id");
  const piece = acervo.find((p) => p.id === pieceId);

  if (piece) {
    document.title = `${piece.name} — Vestígio`;
    pieceDetail.innerHTML = `
      <div class="container piece-detail-grid">
        <div class="piece-detail-image">
          <img src="${encodeURI(piece.img)}" alt="${piece.name}">
        </div>
        <div class="piece-detail-info">
          <a href="acervo.html" class="piece-back">&larr; Voltar ao acervo</a>
          <p class="piece-detail-number">ACERVO &middot; Nº ${piece.id}</p>
          <h1>${piece.name}</h1>
          <p class="piece-detail-designer">${piece.designer}</p>
          <p class="piece-detail-story">${piece.story}</p>
          <a href="contato.html" class="piece-detail-cta">Tenho interesse</a>
        </div>
      </div>
    `;
  } else {
    pieceDetail.innerHTML = `
      <div class="container">
        <a href="acervo.html" class="piece-back">&larr; Voltar ao acervo</a>
        <p>Peça não encontrada.</p>
      </div>
    `;
  }
}

const scrollRevealEls = document.querySelectorAll(".reveal");
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
