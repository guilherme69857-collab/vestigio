document.getElementById("year").textContent = new Date().getFullYear();

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
      card.className = "piece-card";
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
    });

    item.appendChild(button);
    item.appendChild(panel);
    dropsList.appendChild(item);
  });
}
