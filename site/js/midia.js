// Galeria de cenários: clica na miniatura e atualiza o painel da direita
(function () {
  var cards = document.querySelectorAll(".scenario-card");
  var img = document.getElementById("insp-img");
  var titulo = document.getElementById("insp-title");
  var desc = document.getElementById("insp-desc");

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      titulo.textContent = card.dataset.titulo;
      desc.textContent = card.dataset.descricao;
      img.src = card.dataset.imagem;
      img.alt = card.dataset.titulo;

      cards.forEach(function (c) { c.classList.remove("active"); });
      card.classList.add("active");
    });
  });
})();
