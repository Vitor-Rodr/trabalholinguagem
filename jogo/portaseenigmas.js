// Controle de portas trancadas e estado de vitoria
var cozinhaDestravada = false;
var calaboucoDestravada = false;
var venceuJogo = false;

// Senha de 7 digitos da geladeira
var SENHA_GELADEIRA = "9117108";
var inputSenhaGeladeira = document.getElementById("input-senha-geladeira");
var btnConfirmarSenha = document.getElementById("btn-confirmar-senha");
var btnLimparSenha = document.getElementById("btn-limpar-senha");
var avisoSenhaGeladeira = document.getElementById("aviso-senha-geladeira");

// Redireciona de volta para a pagina inicial ao clicar no botao da tela final
function voltarPaginaInicial() {
  window.location.href = "../index.html";
}

// Exibe a tela final com a imagem escolhida e o botao de voltar para o site
function mostrarTelaFinal(nomeImagem, textoStatus, corStatus) {
  var telaFinal = document.getElementById("tela-final");
  var imgFinal = document.getElementById("imagem-final");

  if (typeof pararCronometro === "function") {
    pararCronometro();
  }

  if (typeof escreverStatus === "function" && textoStatus) {
    escreverStatus(textoStatus, corStatus || "#a6e3a1");
  }

  if (imgFinal) {
    imgFinal.src = "../assets/images/finais/" + nomeImagem;
  }

  if (telaFinal) {
    telaFinal.hidden = false;
  }
}

// Verifica se o jogador possui as 3 engrenagens necessarias
function temTresEngrenagens() {
  return (
    temItem("Engrenagem 1") &&
    temItem("Engrenagem 2") &&
    temItem("Engrenagem 3")
  );
}

// Trata o clique em qualquer porta ou na fechadura dourada final
function clicarPorta() {
  if (venceuJogo) {
    return;
  }

  // Porta da cozinha exige a Chave do Chao e consome ela ao abrir
  if (this.id === "porta-hall-cozinha" && !cozinhaDestravada) {
    if (!temItem("Chave do Chão")) {
      escreverStatus("A porta da cozinha esta trancada! Pegue a Chave do Chao.", "#f38ba8");
      return;
    }

    removerItem("Chave do Chão");
    cozinhaDestravada = true;
    escreverStatus("Voce usou a Chave do Chao para abrir a cozinha!", "#a6e3a1");
  }

  // Porta do calabouco exige a Chave da Gaveta e consome ela ao abrir
  if (this.id === "porta-salaJantar-calabouco" && !calaboucoDestravada) {
    if (!temItem("Chave da Gaveta")) {
      escreverStatus("Esta porta esta trancada! Encontre a Chave da Gaveta.", "#f38ba8");
      return;
    }

    removerItem("Chave da Gaveta");
    calaboucoDestravada = true;
    escreverStatus("Voce usou a Chave da Gaveta e abriu a porta!", "#a6e3a1");
  }

  // Fechadura dourada exige as 3 engrenagens e define o final com ou sem criancas
  if (this.id === "porta-final-escape") {
    if (!temTresEngrenagens()) {
      escreverStatus("A fechadura dourada esta travada! Colete as 3 engrenagens para escapar.", "#f38ba8");
      return;
    }

    var resgatouCriancas = typeof temItem === "function" && temItem("Crianças");

    venceuJogo = true;
    removerItem("Engrenagem 1");
    removerItem("Engrenagem 2");
    removerItem("Engrenagem 3");

    if (resgatouCriancas) {
      removerItem("Crianças");
      mostrarTelaFinal(
        "voceganhoucomtodos.png",
        "Voce ganhou! Escapou com as 3 engrenagens e resgatou as criancas!",
        "#a6e3a1"
      );
    } else {
      mostrarTelaFinal(
        "voceganhousozinho.png",
        "Voce ganhou! Escapou com as 3 engrenagens, mas nao resgatou as criancas.",
        "#f9e2af"
      );
    }
    return;
  }

  // Passagem normal para o comodo e vista configurados na porta
  var destino = this.dataset.para;
  if (!destino) {
    return;
  }

  var corte = destino.lastIndexOf("-");
  var proximoComodo = destino.slice(0, corte);
  var proximaVista = Number(destino.slice(corte + 1));
  irPara(proximoComodo, proximaVista);
}

// Limpa o campo e o aviso sempre que o zoom da geladeira e aberto
function prepararSenhaGeladeira() {
  if (!avisoSenhaGeladeira || !inputSenhaGeladeira) {
    return;
  }

  avisoSenhaGeladeira.innerText = "";
  inputSenhaGeladeira.value = "";
}

// Confere a senha digitada para destravar a geladeira
function verificarSenhaGeladeira() {
  if (!inputSenhaGeladeira || !avisoSenhaGeladeira) {
    return;
  }

  var digitada = inputSenhaGeladeira.value.trim();

  if (digitada === SENHA_GELADEIRA) {
    geladeiraDestravada = true;
    avisoSenhaGeladeira.style.color = "#a6e3a1";
    avisoSenhaGeladeira.innerText = "Senha correta! Geladeira destravada.";
    escreverStatus("Voce abriu a geladeira com a senha 9117108!", "#a6e3a1");
    abrirZoom("geladeira-aberta");
  } else {
    avisoSenhaGeladeira.style.color = "#f38ba8";
    avisoSenhaGeladeira.innerText = "Senha incorreta! Tente novamente.";
  }
}

// Liga o clique em todas as portas
for (var i = 0; i < portas.length; i++) {
  portas[i].onclick = clicarPorta;
}

// Aceita apenas numeros no campo de senha (maximo 7 digitos)
function filtrarSenha() {
  inputSenhaGeladeira.value = inputSenhaGeladeira.value.replace(/\D/g, "").slice(0, 7);
}

// Confirma a senha ao apertar Enter
function teclaNaSenha(e) {
  if (e.key === "Enter") {
    verificarSenhaGeladeira();
  }
}

// Limpa o campo de senha e o aviso
function limparSenhaGeladeira() {
  inputSenhaGeladeira.value = "";
  avisoSenhaGeladeira.innerText = "";
  inputSenhaGeladeira.focus();
}

// Liga os eventos do painel de senha da geladeira
if (inputSenhaGeladeira) {
  inputSenhaGeladeira.oninput = filtrarSenha;
  inputSenhaGeladeira.onkeydown = teclaNaSenha;
}

if (btnLimparSenha) {
  btnLimparSenha.onclick = limparSenhaGeladeira;
}

if (btnConfirmarSenha) {
  btnConfirmarSenha.onclick = verificarSenhaGeladeira;
}

// Garante que as portas fiquem visiveis/escondidas corretamente ao carregar
desenhar();

// Alarme despertador do quarto (toca ao clicar e pausa ao clicar de novo)
var btnDespertador = document.getElementById("despertadorbarulhento");
var somDespertador = new Audio("../assets/video/aiaiai.mp3");

// Alterna entre tocar e pausar o som, mantendo a troca de vista da cena
function acionarDespertador() {
  if (somDespertador.paused) {
    somDespertador.currentTime = 0;
    somDespertador.play();
  } else {
    somDespertador.pause();
  }

  if (typeof clicarInterativoCena === "function") {
    clicarInterativoCena.call(this);
  }
}

if (btnDespertador) {
  btnDespertador.onclick = acionarDespertador;
}