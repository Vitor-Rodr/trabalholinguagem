// Quantidade de angulos/vistas de cada comodo da casa
var comodos = {
  hall:       { vistas: 3 },
  quarto:     { vistas: 4 },
  banheiro:   { vistas: 1 },
  cozinha:    { vistas: 4 },
  salaJantar: { vistas: 4 },
  calabouco:  { vistas: 2 },
  prisao:     { vistas: 1 }
};

// Posicao inicial do jogador ao entrar no jogo
var estado = {
  comodo: "hall",
  vista: 0
};

// Guarda quando uma vista muda de imagem (ex.: cortina aberta ou criancas resgatadas)
var vistasAlteradas = {};

// Elementos principais da cena e botoes de navegacao
var cena = document.getElementById("cena");
var setaEsq = document.getElementById("esq");
var setaDir = document.getElementById("dir");
var portas = document.querySelectorAll(".porta");
var interativosCena = document.querySelectorAll(".interativo-cena");
var interativosZoom = document.querySelectorAll(".interativo-zoom");

// Elementos da camada de zoom sobreposta
var zoomTela = document.getElementById("zoom-objeto");
var btnFecharZoom = document.getElementById("fechar-zoom");
var itensZoom = document.querySelectorAll(".item-zoom, [data-no-zoom]");

// Estados compartilhados com os outros scripts do jogo
var geladeiraDestravada = false;
var buracoAberto = false;
var destinoPendente = null;

// Atualiza a imagem da cena e mostra apenas os botoes validos para a vista atual
function desenhar() {
  var vistaBase = estado.comodo + "-" + estado.vista;
  var vistaAtiva = vistasAlteradas[vistaBase] || vistaBase;

  cena.dataset.vista = vistaAtiva;

  // Esconde setas de giro em comodos que so possuem uma vista
  var semGiro = comodos[estado.comodo].vistas === 1;
  setaEsq.hidden = semGiro;
  setaDir.hidden = semGiro;

  // Exibe apenas as portas pertencentes a esta vista
  for (var i = 0; i < portas.length; i++) {
    portas[i].hidden = portas[i].dataset.aqui !== vistaBase;
  }

  // Exibe apenas os objetos interativos de cena desta vista
  for (var j = 0; j < interativosCena.length; j++) {
    interativosCena[j].hidden = interativosCena[j].dataset.aqui !== vistaBase;
  }

  // Exibe apenas os objetos que abrem zoom desta vista
  for (var k = 0; k < interativosZoom.length; k++) {
    interativosZoom[k].hidden = interativosZoom[k].dataset.aqui !== vistaBase;
  }

  // Atualiza itens coletaveis soltos na cena
  if (typeof atualizarItensVisiveis === "function") {
    atualizarItensVisiveis(vistaAtiva);
  }
}

// Abre a tela de zoom e exibe apenas os elementos daquele zoom
function abrirZoom(nomeZoom) {
  // Se a geladeira ja foi destravada, abre ela ja aberta
  if (nomeZoom === "geladeira" && geladeiraDestravada) {
    nomeZoom = "geladeira-aberta";
  }

  // Se o buraco da mesa ja foi aberto, mostra a vista do buraco no lugar do frango
  if (nomeZoom === "frango" && buracoAberto) {
    nomeZoom = "buraco";
  }

  zoomTela.dataset.zoom = nomeZoom;
  zoomTela.hidden = false;

  // Esconde itens de outros zooms e itens que ja foram coletados
  for (var i = 0; i < itensZoom.length; i++) {
    var naoEhDesteZoom = itensZoom[i].dataset.noZoom !== nomeZoom;
    var jaColetado = itensZoom[i].getAttribute("data-coletado") === "true";
    itensZoom[i].hidden = naoEhDesteZoom || jaColetado;
  }

  // Reseta o painel de senha sempre que o zoom da geladeira e aberto
  if (nomeZoom === "geladeira" && typeof prepararSenhaGeladeira === "function") {
    prepararSenhaGeladeira();
  }
}

// Fecha a camada de zoom e limpa o identificador atual
function fecharZoom() {
  zoomTela.hidden = true;
  delete zoomTela.dataset.zoom;
}

// Aplica o novo comodo/vista apos o fade de saida e remove a classe de fade
function concluirTransicao() {
  if (destinoPendente) {
    estado.comodo = destinoPendente.comodo;
    estado.vista = destinoPendente.vista;
    destinoPendente = null;
  }

  desenhar();
  cena.classList.remove("fade");
}

// Inicia uma troca suave de comodo ou vista com fade de 200ms
function transicao(comodo, vista) {
  if (destinoPendente) {
    return;
  }

  fecharZoom();
  destinoPendente = { comodo: comodo, vista: vista };
  cena.classList.add("fade");
  setTimeout(concluirTransicao, 200);
}

// Gira a camera para esquerda (-1) ou direita (1) de forma circular
function girar(direcao) {
  if (!zoomTela.hidden) {
    return;
  }

  var total = comodos[estado.comodo].vistas;
  var novaVista = (estado.vista + direcao + total) % total;
  transicao(estado.comodo, novaVista);
}

// Navega diretamente para um comodo e vista especificos
function irPara(comodo, vista) {
  transicao(comodo, vista);
}

// Alterna entre a vista padrao e a alterada (ou coleta item direto do objeto)
function clicarInterativoCena() {
  var vistaBase = this.dataset.aqui;
  var vistaAlt = this.dataset.alterado;

  // Objetos que entregam um item ao clicar (ex.: pano da chave ou resgate das criancas)
  if (this.dataset.item) {
    if (this.getAttribute("data-coletado") === "true") {
      return;
    }

    // So altera a cena se o item realmente entrou no inventario
    if (!pegarItem(this, this.dataset.item, this.dataset.imagem)) {
      return;
    }
  }

  if (vistasAlteradas[vistaBase] === vistaAlt) {
    delete vistasAlteradas[vistaBase];
  } else {
    vistasAlteradas[vistaBase] = vistaAlt;
  }

  desenhar();
}

// Abre o zoom configurado no botao clicado
function clicarInterativoZoom() {
  abrirZoom(this.dataset.zoom);
}

// Funcoes auxiliares para os botoes de girar
function girarParaEsquerda() {
  girar(-1);
}

function girarParaDireita() {
  girar(1);
}

// Liga os eventos de navegacao e fechamento do zoom
setaEsq.onclick = girarParaEsquerda;
setaDir.onclick = girarParaDireita;
btnFecharZoom.onclick = fecharZoom;

// Liga o clique de todos os objetos interativos de cena e zoom
for (var i = 0; i < interativosCena.length; i++) {
  interativosCena[i].onclick = clicarInterativoCena;
}

for (var j = 0; j < interativosZoom.length; j++) {
  interativosZoom[j].onclick = clicarInterativoZoom;
}

// Atalhos do teclado: H alterna debug, Esc fecha zoom e setas giram a camera
function teclaPressionada(e) {
  if (e.key.toLowerCase() === "h") {
    cena.classList.toggle("debug");
  }

  if (e.key === "Escape" && !zoomTela.hidden) {
    fecharZoom();
  }

  if (comodos[estado.comodo].vistas === 1) {
    return;
  }

  if (e.key === "ArrowLeft") {
    girar(-1);
  }

  if (e.key === "ArrowRight") {
    girar(1);
  }
}

document.onkeydown = teclaPressionada;

// Renderizacao inicial da cena ao carregar o jogo
desenhar();