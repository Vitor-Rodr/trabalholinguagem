// Menu hambúrguer do navbar (celular)
(function () {
  var botao = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");
  if (!botao || !menu) return;

  botao.addEventListener("click", function () {
    var aberto = menu.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", aberto);
  });
})();
