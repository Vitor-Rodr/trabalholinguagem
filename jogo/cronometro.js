// Tempo inicial do jogo em segundos (5 minutos)
var tempoRestante = 5 * 60;

// Elemento na tela onde o tempo formatado é exibido
var displayCronometro = document.getElementById("cronometro");

// Guarda o ID do setInterval para poder parar o cronômetro depois
var intervaloCronometro = null;

// Converte os segundos totais para o formato "MM:SS"
function formatarTempo(segundos) {
  var min = String(Math.floor(segundos / 60));
  var seg = String(segundos % 60);

  // Garante dois dígitos nos minutos e segundos (ex.: "05" em vez de "5")
  if (min.length < 2) {
    min = "0" + min;
  }
  if (seg.length < 2) {
    seg = "0" + seg;
  }

  return min + ":" + seg;
}

// Para a contagem regressiva e limpa a referência do intervalo
function pararCronometro() {
  if (intervaloCronometro) {
    clearInterval(intervaloCronometro);
    intervaloCronometro = null;
  }
}

// Atualiza o texto do cronômetro e verifica se o tempo chegou ao fim
function atualizarCronometro() {
  if (displayCronometro) {
    displayCronometro.innerText = formatarTempo(tempoRestante);
  }

  // Quando o tempo zera, encerra a contagem e abre a tela de derrota
  if (tempoRestante <= 0) {
    pararCronometro();

    if (typeof mostrarTelaFinal === "function") {
      mostrarTelaFinal("voceperdeu.png", "O tempo acabou! Você perdeu.", "#f38ba8");
    }
    return;
  }

  // Diminui 1 segundo para o próximo ciclo
  tempoRestante--;
}

// Inicia a contagem regressiva de 1 em 1 segundo (evita criar intervalos duplicados)
function iniciarCronometro() {
  if (intervaloCronometro) {
    return;
  }

  atualizarCronometro();
  intervaloCronometro = setInterval(atualizarCronometro, 1000);
}

// Começa o cronômetro assim que o script é carregado
iniciarCronometro();