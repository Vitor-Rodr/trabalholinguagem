// Modal do formulário de suporte
(function () {
  var modal = document.getElementById("modalBug");

  function abrir() { modal.classList.add("active"); }
  function fechar() { modal.classList.remove("active"); }

  document.querySelectorAll("[data-abrir-modal]").forEach(function (b) {
    b.addEventListener("click", abrir);
  });
  document.querySelector(".close-btn").addEventListener("click", fechar);

  // Fecha ao clicar fora da caixa ou apertar Esc
  modal.addEventListener("click", function (e) { if (e.target === modal) fechar(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") fechar(); });

  var faq = document.getElementById("btnFaq");
  if (faq) {
    faq.addEventListener("click", function () {
      alert("Consulte o manual de instruções na página de informações do jogo.");
    });
  }
})();
