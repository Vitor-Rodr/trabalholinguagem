let tempoRestante = 5 * 60; // 5 minutos (300 segundos)
const displayCronometro = document.getElementById("cronometro");
let intervaloCronometro = null;

function formatarTempo(segundos) {
  const min = String(Math.floor(segundos / 60)).padStart(2, "0");
  const seg = String(segundos % 60).padStart(2, "0");
  return `${min}:${seg}`;
}

function atualizarCronometro() {
  if (displayCronometro) {
    displayCronometro.innerText = formatarTempo(tempoRestante);
  }

  if (tempoRestante <= 0) {
    clearInterval(intervaloCronometro);

    if (typeof escreverStatus === "function") {
      escreverStatus("O tempo acabou! Você perdeu.", "#f38ba8");
    }

    alert("O tempo acabou! Você perdeu.");
    location.reload();
    return;
  }

  tempoRestante--;
}

function iniciarCronometro() {
  if (intervaloCronometro) return;
  atualizarCronometro();
  intervaloCronometro = setInterval(atualizarCronometro, 1000);
}

// Mostra 05:00 ao carregar o mapa
if (displayCronometro) {
  displayCronometro.innerText = formatarTempo(tempoRestante);
}

// Inicia automaticamente quando vier do "Jogue agora" (?start=1)
const params = new URLSearchParams(window.location.search);
if (params.get("start") === "1") {
  iniciarCronometro();
}