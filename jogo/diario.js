// Lista de anotações já registradas no diário (cada item tem id, titulo e texto)
var anotacoesDiario = [];

// Registra uma nova anotação apenas se ainda não existir uma com o mesmo id
function registrarNoDiario(id, titulo, texto) {
  for (var i = 0; i < anotacoesDiario.length; i++) {
    if (anotacoesDiario[i].id === id) {
      return;
    }
  }

  anotacoesDiario.push({
    id: id,
    titulo: titulo,
    texto: texto
  });

  atualizarRenderDiario();
  destacarBotaoDiario();
}

// Atualiza o contador do botão e monta a lista de anotações na tela
function atualizarRenderDiario() {
  var lista = document.getElementById("lista-anotacoes");
  var btnAbrir = document.getElementById("btn-abrir-diario");

  if (btnAbrir) {
    btnAbrir.innerText = "Diário (" + anotacoesDiario.length + ")";
  }

  if (!lista) {
    return;
  }

  // Mensagem padrão quando o jogador ainda não encontrou pistas
  if (anotacoesDiario.length === 0) {
    lista.innerHTML = '<p class="diario-vazio">Nenhuma pista anotada ainda...</p>';
    return;
  }

  var htmlFinal = "";

  // Monta cada cartão de anotação em ordem
  for (var i = 0; i < anotacoesDiario.length; i++) {
    htmlFinal +=
      '<div class="item-anotacao">' +
      "<h3>" + (i + 1) + ". " + anotacoesDiario[i].titulo + "</h3>" +
      "<p>" + anotacoesDiario[i].texto + "</p>" +
      "</div>";
  }

  lista.innerHTML = htmlFinal;
}

// Aplica o destaque visual no botão do diário por 1.5s ao entrar pista nova
function destacarBotaoDiario() {
  var btnAbrir = document.getElementById("btn-abrir-diario");
  if (!btnAbrir) {
    return;
  }

  btnAbrir.className = "nova-pista";

  setTimeout(function () {
    btnAbrir.className = "";
  }, 1500);
}

// Registra pistas relevantes quando o jogador abre certos zooms
function observarZoomParaDiario(tipoZoom) {
  if (tipoZoom === "bilhete") {
    registrarNoDiario("bilhete", "Bilhete na Parede", "Mostra a ordem dos números para o enigma.");
  } else if (tipoZoom === "casaco") {
    registrarNoDiario("casaco", "Pista no Casaco", "Há uma anotação escondida no casaco do hall.");
  } else if (
    tipoZoom === "quadro1" ||
    tipoZoom === "quadro2" ||
    tipoZoom === "quadro3" ||
    tipoZoom === "quadro4" ||
    tipoZoom === "quadro5"
  ) {
    registrarNoDiario("quadros", "Quadros do Quarto", "Os quadros trazem pistas relacionadas à senha.");
  } else if (tipoZoom === "caneca") {
    registrarNoDiario("caneca", "Caneca na Mesa", "Existe uma dica na caneca perto do computador.");
  } else if (tipoZoom === "computador") {
    registrarNoDiario("computador", "Computador do Quarto", "A tela exibe uma dica importante.");
  } else if (tipoZoom === "forno") {
    registrarNoDiario("forno", "Forno da Cozinha", "Pode servir para descongelar algo.");
  } else if (tipoZoom === "geladeira") {
    registrarNoDiario("geladeira", "Geladeira Trancada", "Pede uma senha numérica de 7 dígitos.");
  } else if (tipoZoom === "buraco") {
    registrarNoDiario("buraco", "Buraco na Mesa", "Abriu uma passagem para baixo da mesa de jantar.");
  }
}

// Registra os itens importantes coletados no inventário
function observarInventarioParaDiario() {
  if (typeof inventario === "undefined") {
    return;
  }

  for (var i = 0; i < inventario.length; i++) {
    var nome = inventario[i].nome;

    if (nome === "Chave do Chão") {
      registrarNoDiario("chave-chao", "Chave do Chão", "Peguei a chave no quarto para abrir a cozinha.");
    } else if (nome === "Chave da Gaveta") {
      registrarNoDiario("chave-gaveta", "Chave da Gaveta", "Peguei a chave na gaveta para abrir o calabouço.");
    } else if (nome === "Pé de Cabra") {
      registrarNoDiario("pe-de-cabra", "Pé de Cabra", "Encontrei atrás do quadro; pode ajudar a abrir algo.");
    } else if (nome === "Engrenagem 1") {
      registrarNoDiario("engrenagem-1", "Engrenagem 1", "Coletada no banheiro.");
    } else if (nome === "Engrenagem 2 Congelada") {
      registrarNoDiario("engrenagem-2-gelo", "Engrenagem 2 Congelada", "Está presa no gelo; preciso descongelar.");
    } else if (nome === "Engrenagem 2") {
      registrarNoDiario("engrenagem-2", "Engrenagem 2", "Descongelada e pronta para a saída.");
    } else if (nome === "Engrenagem 3") {
      registrarNoDiario("engrenagem-3", "Engrenagem 3", "Coletada na caixa do hall.");
    } else if (nome === "Crianças") {
      registrarNoDiario("criancas", "Crianças Resgatadas", "Resgatei as crianças no cativeiro.");
    }
  }
}

// Registra apenas a descoberta do cativeiro (as outras salas já ficam óbvias ao entrar)
function observarComodoParaDiario(comodo) {
  if (comodo === "prisao") {
    registrarNoDiario("comodo-prisao", "Cativeiro", "Encontrei uma sala de prisão descendo pelo buraco.");
  }
}

// Gancho em abrirZoom para anotar pistas sem alterar a função original
if (typeof window.abrirZoom === "function") {
  var abrirZoomOriginal = window.abrirZoom;
  window.abrirZoom = function (tipoZoom) {
    abrirZoomOriginal.apply(this, arguments);
    observarZoomParaDiario(tipoZoom);
  };
}

// Gancho em renderizarInventario para anotar novos itens coletados
if (typeof window.renderizarInventario === "function") {
  var renderizarInventarioOriginal = window.renderizarInventario;
  window.renderizarInventario = function () {
    renderizarInventarioOriginal.apply(this, arguments);
    observarInventarioParaDiario();
  };
}

// Gancho em irPara para observar mudanças de cômodo
if (typeof window.irPara === "function") {
  var irParaOriginal = window.irPara;
  window.irPara = function (comodo, vista) {
    irParaOriginal.apply(this, arguments);
    observarComodoParaDiario(comodo);
  };
}

// Alterna a visibilidade do modal do diário ao clicar no botão
function alternarModalDiario() {
  var modal = document.getElementById("modal-diario");
  if (modal) {
    modal.hidden = !modal.hidden;
  }
}

// Fecha o modal do diário ao clicar no botão de fechar
function fecharModalDiario() {
  var modal = document.getElementById("modal-diario");
  if (modal) {
    modal.hidden = true;
  }
}

var btnAbrirDiario = document.getElementById("btn-abrir-diario");
if (btnAbrirDiario) {
  btnAbrirDiario.onclick = alternarModalDiario;
}

var btnFecharDiario = document.getElementById("btn-fechar-diario");
if (btnFecharDiario) {
  btnFecharDiario.onclick = fecharModalDiario;
}