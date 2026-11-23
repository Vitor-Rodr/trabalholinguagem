// Galeria de cenários: clica na miniatura e atualiza o painel da direita
var cardsCenario = document.querySelectorAll(".scenario-card");
var inspImg = document.getElementById("insp-img");
var inspTitulo = document.getElementById("insp-title");
var inspDesc = document.getElementById("insp-desc");

// "this" é o card clicado
function selecionarCenario() {
  inspTitulo.textContent = this.dataset.titulo;
  inspDesc.textContent = this.dataset.descricao;
  inspImg.src = this.dataset.imagem;
  inspImg.alt = this.dataset.titulo;

  for (var i = 0; i < cardsCenario.length; i++) {
    cardsCenario[i].classList.remove("active");
  }
  this.classList.add("active");
}

for (var c = 0; c < cardsCenario.length; c++) {
  cardsCenario[c].onclick = selecionarCenario;
}