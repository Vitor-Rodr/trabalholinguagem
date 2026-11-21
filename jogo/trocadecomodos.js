const comodos = {
  hall:       { vistas: 3 },
  quarto:     { vistas: 4 },
  banheiro:   { vistas: 1 },
  cozinha:    { vistas: 4 },
  salaJantar: { vistas: 4 },
  calabouco:  { vistas: 2 }
};

const estado = { comodo: "hall", vista: 0 };
const vistasAlteradas = {}; // Memoriza o estado dos objetos do Espaço 1 por vista

const cena = document.getElementById("cena");
const setaEsq = document.getElementById("esq");
const setaDir = document.getElementById("dir");
const portas = document.querySelectorAll(".porta");

// Controles do Espaço 1 (Com setas e sem botão voltar)
const interativosCena = document.querySelectorAll(".interativo-cena");

// Controles do Espaço 2 (Sem setas e com botão voltar)
const interativosZoom = document.querySelectorAll(".interativo-zoom");
const zoomTela = document.getElementById("zoom-objeto");
const btnFecharZoom = document.getElementById("fechar-zoom");
const itensZoom = document.querySelectorAll(".item-zoom");

function desenhar() {
  const vistaBase = estado.comodo + "-" + estado.vista;

  // Mostra a vista alterada se houver, senão mostra a vista normal
  cena.dataset.vista = vistasAlteradas[vistaBase] || vistaBase;

  // As setas só somem se o cômodo tiver 1 vista (banheiro)
  const semGiro = comodos[estado.comodo].vistas === 1;
  setaEsq.hidden = semGiro;
  setaDir.hidden = semGiro;

  portas.forEach(porta => {
    porta.hidden = porta.dataset.aqui !== vistaBase;
  });

  interativosCena.forEach(item => {
    item.hidden = item.dataset.aqui !== vistaBase;
  });

  interativosZoom.forEach(item => {
    item.hidden = item.dataset.aqui !== vistaBase;
  });

  // Atualiza quais itens espalhados aparecem nesta vista
  if (typeof atualizarItensVisiveis === "function") {
    atualizarItensVisiveis(vistaBase);
  }
}

function abrirZoom(nomeZoom) {
  zoomTela.dataset.zoom = nomeZoom;
  zoomTela.hidden = false;
  itensZoom.forEach(item => {
    item.hidden = item.dataset.noZoom !== nomeZoom;
  });
}

function fecharZoom() {
  zoomTela.hidden = true;
  delete zoomTela.dataset.zoom;
}

function transicao(mudar) {
  fecharZoom();
  cena.classList.add("fade");
  setTimeout(() => {
    mudar();
    desenhar();
    cena.classList.remove("fade");
  }, 200);
}

function girar(direcao) {
  if (!zoomTela.hidden) return;
  const total = comodos[estado.comodo].vistas;
  transicao(() => {
    estado.vista = (estado.vista + direcao + total) % total;
  });
}

function irPara(comodo, vista) {
  transicao(() => {
    estado.comodo = comodo;
    estado.vista = vista;
  });
}

setaEsq.addEventListener("click", () => girar(-1));
setaDir.addEventListener("click", () => girar(1));

document.addEventListener("keydown", e => {
  if (e.key.toLowerCase() === "h") {
    cena.classList.toggle("debug");
  }
  if (e.key === "Escape" && !zoomTela.hidden) {
    fecharZoom();
  }
  if (comodos[estado.comodo].vistas === 1) return;
  if (e.key === "ArrowLeft") girar(-1);
  if (e.key === "ArrowRight") girar(1);
});

portas.forEach(porta => {
  porta.addEventListener("click", () => {
    const destino = porta.dataset.para;
    const corte = destino.lastIndexOf("-");
    const comodo = destino.slice(0, corte);
    const vista = Number(destino.slice(corte + 1));
    irPara(comodo, vista);
  });
});

interativosCena.forEach(item => {
  item.addEventListener("click", () => {
    const vistaBase = item.dataset.aqui;
    const vistaAlt = item.dataset.alterado;

    if (vistasAlteradas[vistaBase] === vistaAlt) {
      delete vistasAlteradas[vistaBase];
    } else {
      vistasAlteradas[vistaBase] = vistaAlt;
    }

    desenhar();
  });
});

interativosZoom.forEach(item => {
  item.addEventListener("click", () => {
    abrirZoom(item.dataset.zoom);
  });
});

btnFecharZoom.addEventListener("click", fecharZoom);

desenhar();