// Modal do formulário de suporte
var modalBug = document.getElementById("modalBug");
var botoesModal = document.querySelectorAll("[data-abrir-modal]");
var btnFecharModal = document.querySelector(".close-btn");
var btnFaq = document.getElementById("btnFaq");

function abrirModal() {
  modalBug.classList.add("active");
}

function fecharModal() {
  modalBug.classList.remove("active");
}

// Fecha ao clicar fora da caixa
function cliqueNoModal(e) {
  if (e.target === modalBug) {
    fecharModal();
  }
}

// Fecha ao apertar Esc
function teclaNoSuporte(e) {
  if (e.key === "Escape") {
    fecharModal();
  }
}

function avisarFaq() {
  alert("Consulte o manual de instruções na página de informações do jogo.");
}

for (var b = 0; b < botoesModal.length; b++) {
  botoesModal[b].onclick = abrirModal;
}

btnFecharModal.onclick = fecharModal;
modalBug.onclick = cliqueNoModal;
document.onkeydown = teclaNoSuporte;

if (btnFaq) {
  btnFaq.onclick = avisarFaq;
}