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

// Guarda quando uma vista muda de imagem (ex: cortina aberta)
var vistasAlteradas = {};

// Elementos principais da cena
var cena = document.getElementById("cena");
var setaEsq = document.getElementById("esq");
var setaDir = document.getElementById("dir");
var portas = document.querySelectorAll(".porta");
var interativosCena = document.querySelectorAll(".interativo-cena");
var interativosZoom = document.querySelectorAll(".interativo-zoom");

// Elementos da tela de zoom
var zoomTela = document.getElementById("zoom-objeto");
var btnFecharZoom = document.getElementById("fechar-zoom");
var itensZoom = document.querySelectorAll(".item-zoom, [data-no-zoom]");

// Variavel usada por outros scripts para saber se a geladeira ja foi aberta
var geladeiraDestravada = false;

// Fica true depois que o Pe de Cabra abre o buraco na mesa da sala de jantar
var buracoAberto = false;

// Guarda para onde o jogador vai quando o fade da cena terminar
var destinoPendente = null;

// Atualiza imagem da cena e visibilidade dos botoes da vista atual
function desenhar() {
  var vistaBase = estado.comodo + "-" + estado.vista;
  var vistaAtiva = vistasAlteradas[vistaBase] || vistaBase;

  cena.dataset.vista = vistaAtiva;

  // Em comodos de 1 vista (como o banheiro), nao precisa mostrar setas de girar
  var semGiro = comodos[estado.comodo].vistas === 1;
  setaEsq.hidden = semGiro;
  setaDir.hidden = semGiro;

  // Mostra apenas as portas que pertencem a essa vista base
  for (var i = 0; i < portas.length; i++) {
    portas[i].hidden = portas[i].dataset.aqui !== vistaBase;
  }

  // Mostra apenas os objetos que alteram a cena nessa vista base
  for (var j = 0; j < interativosCena.length; j++) {
    interativosCena[j].hidden = interativosCena[j].dataset.aqui !== vistaBase;
  }

  // Mostra apenas os objetos que abrem zoom nessa vista base
  for (var k = 0; k < interativosZoom.length; k++) {
    interativosZoom[k].hidden = interativosZoom[k].dataset.aqui !== vistaBase;
  }

  // Atualiza itens coletaveis soltos na cena
  if (typeof atualizarItensVisiveis === "function") {
    atualizarItensVisiveis(vistaAtiva);
  }
}

// Abre a tela de zoom de um objeto
function abrirZoom(nomeZoom) {
  // Se a geladeira ja foi destravada, abre ela ja aberta
  if (nomeZoom === "geladeira" && geladeiraDestravada) {
    nomeZoom = "geladeira-aberta";
  }

  // Se o buraco da mesa ja foi aberto, o frango abre ja com o buraco
  if (nomeZoom === "frango" && buracoAberto) {
    nomeZoom = "buraco";
  }

  zoomTela.dataset.zoom = nomeZoom;
  zoomTela.hidden = false;

  // Mostra apenas os itens ou paineis que pertencem a esse zoom
  // Itens ja coletados continuam escondidos mesmo se o zoom for aberto de novo
  for (var i = 0; i < itensZoom.length; i++) {
    var naoEhDesteZoom = itensZoom[i].dataset.noZoom !== nomeZoom;
    var jaColetado = itensZoom[i].getAttribute("data-coletado") === "true";
    itensZoom[i].hidden = naoEhDesteZoom || jaColetado;
  }

  // Se abriu o painel de senha da geladeira, limpa textos anteriores
  if (nomeZoom === "geladeira" && typeof prepararSenhaGeladeira === "function") {
    prepararSenhaGeladeira();
  }
}

// Fecha a tela de zoom
function fecharZoom() {
  zoomTela.hidden = true;
  delete zoomTela.dataset.zoom;
}

// Finaliza a mudanca de cena apos o tempo de fade
function concluirTransicao() {
  if (destinoPendente) {
    estado.comodo = destinoPendente.comodo;
    estado.vista = destinoPendente.vista;
    destinoPendente = null;
  }

  desenhar();
  cena.classList.remove("fade");
}

// Faz uma transicao suave ao trocar de vista ou comodo
function transicao(comodo, vista) {
  fecharZoom();
  destinoPendente = { comodo: comodo, vista: vista };
  cena.classList.add("fade");
  setTimeout(concluirTransicao, 200);
}

// Gira a camera para esquerda (-1) ou direita (1)
function girar(direcao) {
  if (!zoomTela.hidden) {
    return;
  }

  var total = comodos[estado.comodo].vistas;
  var novaVista = (estado.vista + direcao + total) % total;
  transicao(estado.comodo, novaVista);
}

// Vai direto para um comodo e vista especificos
function irPara(comodo, vista) {
  transicao(comodo, vista);
}

// Alterna entre a vista normal e a vista alterada do objeto clicado
function clicarInterativoCena() {
  var vistaBase = this.dataset.aqui;
  var vistaAlt = this.dataset.alterado;

  // Objeto que esconde um item (ex.: pano do quarto esconde a Chave do Chao)
  if (this.dataset.item) {
    // Item ja pego: o pano continua afastado, nao volta ao normal
    if (this.getAttribute("data-coletado") === "true") {
      return;
    }

    // Se o inventario estiver cheio, nao mexe na cena para o jogador poder tentar de novo
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

// Abre o zoom do objeto clicado
function clicarInterativoZoom() {
  abrirZoom(this.dataset.zoom);
}

// Botoes de girar e fechar zoom
function girarParaEsquerda() {
  girar(-1);
}

function girarParaDireita() {
  girar(1);
}

setaEsq.onclick = girarParaEsquerda;
setaDir.onclick = girarParaDireita;
btnFecharZoom.onclick = fecharZoom;

// Liga os eventos dos objetos de cena e de zoom
for (var i = 0; i < interativosCena.length; i++) {
  interativosCena[i].onclick = clicarInterativoCena;
}

for (var j = 0; j < interativosZoom.length; j++) {
  interativosZoom[j].onclick = clicarInterativoZoom;
}

// Atalhos do teclado: H para debug, Esc para fechar zoom e setas para girar
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

// Renderizacao inicial do jogo
desenhar();