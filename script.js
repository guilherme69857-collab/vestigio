document.getElementById("year").textContent = new Date().getFullYear();

const pieceGrid = document.getElementById("piece-grid");
if (pieceGrid && typeof drop1 !== "undefined") {
  drop1.forEach((piece) => {
    const card = document.createElement("article");
    card.className = "piece-card";
    card.innerHTML = `
      <img class="piece-image" src="${encodeURI(piece.img)}" alt="${piece.name}" loading="lazy">
      <h3>${piece.name}</h3>
      <p class="piece-price">${piece.price}</p>
      <p class="piece-story">${piece.story}</p>
    `;
    pieceGrid.appendChild(card);
  });
}
