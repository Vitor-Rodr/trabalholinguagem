const comodos = {
    hall:       { vistas: 3 },
    quarto:     { vistas: 4 },
    banheiro:   { vistas: 1 },
    cozinha:    { vistas: 4 },
    salaJantar: { vistas: 4 },
    calabouco:  { vistas: 2 }
  };
  
  const estado = { comodo: "hall", vista: 0 };
  
  const cena = document.getElementById("cena");
  const setaEsq = document.getElementById("esq");
  const setaDir = document.getElementById("dir");
  const portas = document.querySelectorAll(".porta");
  
  function desenhar() {
    const vistaAtual = estado.comodo + "-" + estado.vista;

    cena.dataset.vista = vistaAtual;

    const semGiro = comodos[estado.comodo].vistas === 1;
    setaEsq.hidden = semGiro;
    setaDir.hidden = semGiro;
  
    portas.forEach(porta => {
      porta.hidden = porta.dataset.aqui !== vistaAtual;
    });
  }
  
  function transicao(mudar) {
    cena.classList.add("fade");
    setTimeout(() => {
      mudar();
      desenhar();
      cena.classList.remove("fade");
    }, 200);
  }
  
  function girar(direcao) {
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
  
  desenhar();
