var tempoRestante = 5 * 60; // 5 minutos (300 segundos)
var displayCronometro = document.getElementById("cronometro");
var intervaloCronometro = null;

function formatarTempo(segundos) {
  var min = String(Math.floor(segundos / 60));
  var seg = String(segundos % 60);

  if (min.length < 2) {
    min = "0" + min;
  }
  if (seg.length < 2) {
    seg = "0" + seg;
  }

  return min + ":" + seg;
}

function pararCronometro() {
  if (intervaloCronometro) {
    clearInterval(intervaloCronometro);
    intervaloCronometro = null;
  }
}

function atualizarCronometro() {
  if (displayCronometro) {
    displayCronometro.innerText = formatarTempo(tempoRestante);
  }

  if (tempoRestante <= 0) {
    pararCronometro();

    if (typeof mostrarTelaFinal === "function") {
      mostrarTelaFinal("voceperdeu.png", "O tempo acabou! Você perdeu.", "#f38ba8");
    }
    return;
  }

  tempoRestante--;
}

function iniciarCronometro() {
  if (intervaloCronometro) {
    return;
  }

  atualizarCronometro();
  intervaloCronometro = setInterval(atualizarCronometro, 1000);
}

// Inicia o cronômetro assim que a página carrega
iniciarCronometro();