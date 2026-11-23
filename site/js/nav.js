// Menu hambúrguer do navbar (celular)
var navBotao = document.querySelector(".nav-toggle");
var navMenu = document.querySelector(".nav-menu");

function alternarMenu() {
  var aberto = navMenu.classList.toggle("aberto");
  navBotao.setAttribute("aria-expanded", aberto);
}

if (navBotao && navMenu) {
  navBotao.onclick = alternarMenu;
}