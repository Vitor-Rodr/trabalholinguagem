var anotacoesDiario = [];

// Adiciona uma anotação sem repetir
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

// Atualiza o contador e escreve as anotações em cima da imagem
function atualizarRenderDiario() {
  var lista = document.getElementById("lista-anotacoes");
  var btnAbrir = document.getElementById("btn-abrir-diario");

  if (btnAbrir) {
    btnAbrir.innerText = `Diário (${anotacoesDiario.length})`;
  }

  if (!lista) {
    return;
  }

  if (anotacoesDiario.length === 0) {
    lista.innerHTML = `<p class="diario-vazio">Nenhuma pista anotada ainda...</p>`;
    return;
  }

  var htmlFinal = "";

  for (var i = 0; i < anotacoesDiario.length; i++) {
    htmlFinal += `
      <div class="item-anotacao">
        <h3>${i + 1}. ${anotacoesDiario[i].titulo}</h3>
        <p>${anotacoesDiario[i].texto}</p>
      </div>
    `;
  }

  lista.innerHTML = htmlFinal;
}

// Destaca o botão do diário por 1.5s quando uma anotação nova entra
function destacarBotaoDiario() {
  var btnAbrir = document.getElementById("btn-abrir-diario");
  if (!btnAbrir) {
    return;
  }

  btnAbrir.className = "nova-pista";

  setTimeout(function() {
    btnAbrir.className = "";
  }, 1500);
}

// Observa os zooms abertos pelo jogador sem alterar o funcionamento deles
function observarZoomParaDiario(tipoZoom) {
  if (tipoZoom === "bilhete") {
    registrarNoDiario("bilhete", "Bilhete na Parede", "Mostra a ordem dos números para o enigma.");
  } else if (tipoZoom === "casaco") {
    registrarNoDiario("casaco", "Pista no Casaco", "Encontrei uma anotação escondida no casaco do hall.");
  } else if (
    tipoZoom === "quadro1" ||
    tipoZoom === "quadro2" ||
    tipoZoom === "quadro3" ||
    tipoZoom === "quadro4" ||
    tipoZoom === "quadro5"
  ) {
    registrarNoDiario("quadros", "Quadros do Quarto", "Os quadros na parede trazem pistas para a senha.");
  } else if (tipoZoom === "caneca") {
    registrarNoDiario("caneca", "Caneca na Mesa", "Há uma pista na caneca próxima ao computador.");
  } else if (tipoZoom === "computador") {
    registrarNoDiario("computador", "Computador do Quarto", "A tela do computador exibe uma dica importante.");
  } else if (tipoZoom === "forno") {
    registrarNoDiario("forno", "Forno da Cozinha", "O forno está quente e pode descongelar algo.");
  } else if (tipoZoom === "geladeira") {
    registrarNoDiario("geladeira", "Geladeira Trancada", "Exige uma senha numérica de 7 dígitos.");
  } else if (tipoZoom === "geladeira-aberta") {
    registrarNoDiario("geladeira-aberta", "Geladeira Aberta", "Consegui abrir a geladeira com a senha.");
  } else if (tipoZoom === "frango") {
    registrarNoDiario("frango", "Frango na Mesa", "Há um frango enorme no centro da mesa de jantar.");
  } else if (tipoZoom === "buraco") {
    registrarNoDiario("buraco", "Passagem na Mesa", "Um buraco se abriu no lugar do frango na mesa.");
  }
}

// Observa os itens que entram no inventário
function observarInventarioParaDiario() {
  if (typeof inventario === "undefined") {
    return;
  }

  for (var i = 0; i < inventario.length; i++) {
    var nome = inventario[i].nome;

    if (nome === "Chave do Chão") {
      registrarNoDiario("chave-chao", "Chave do Chão", "Peguei uma chave caída no quarto.");
    } else if (nome === "Chave da Gaveta") {
      registrarNoDiario("chave-gaveta", "Chave da Gaveta", "Encontrei uma chave dentro da gaveta do hall.");
    } else if (nome === "Pé de Cabra") {
      registrarNoDiario("pe-de-cabra", "Pé de Cabra", "Peguei um pé de cabra atrás do quadro no quarto.");
    } else if (nome === "Engrenagem 1") {
      registrarNoDiario("engrenagem-1", "Engrenagem 1", "Encontrei a primeira engrenagem no banheiro.");
    } else if (nome === "Engrenagem 2 Congelada") {
      registrarNoDiario("engrenagem-2-gelo", "Engrenagem 2 Congelada", "Peguei uma engrenagem presa no gelo dentro da geladeira.");
    } else if (nome === "Engrenagem 2") {
      registrarNoDiario("engrenagem-2", "Engrenagem 2 Descongelada", "Descongelei a segunda engrenagem no forno.");
    } else if (nome === "Engrenagem 3") {
      registrarNoDiario("engrenagem-3", "Engrenagem 3", "Encontrei a terceira engrenagem na caixa do hall.");
    } else if (nome === "Crianças") {
      registrarNoDiario("criancas", "Crianças Resgatadas", "Resgatei as crianças que estavam presas no cativeiro!");
    }
  }
}

// Observa a entrada em novos cômodos
function observarComodoParaDiario(comodo) {
  if (comodo === "cozinha") {
    registrarNoDiario("comodo-cozinha", "Cozinha", "Consegui destrancar a porta e entrar na cozinha.");
  } else if (comodo === "prisao") {
    registrarNoDiario("comodo-prisao", "Cativeiro", "Desci pelo buraco da mesa e encontrei uma sala de prisão.");
  } else if (comodo === "calabouco") {
    registrarNoDiario("comodo-calabouco", "Calabouço", "Abri a passagem para o calabouço onde fica a saída.");
  }
}

// Conecta o diário às funções existentes sem alterar o funcionamento delas
if (typeof window.abrirZoom === "function") {
  var abrirZoomOriginal = window.abrirZoom;
  window.abrirZoom = function(tipoZoom) {
    abrirZoomOriginal.apply(this, arguments);
    observarZoomParaDiario(tipoZoom);
  };
}

if (typeof window.renderizarInventario === "function") {
  var renderizarInventarioOriginal = window.renderizarInventario;
  window.renderizarInventario = function() {
    renderizarInventarioOriginal.apply(this, arguments);
    observarInventarioParaDiario();
  };
}

if (typeof window.irPara === "function") {
  var irParaOriginal = window.irPara;
  window.irPara = function(comodo, vista) {
    irParaOriginal.apply(this, arguments);
    observarComodoParaDiario(comodo);
  };
}

// Abre e fecha o diário ao clicar nos botões dele
var btnAbrirDiario = document.getElementById("btn-abrir-diario");
if (btnAbrirDiario) {
  btnAbrirDiario.onclick = function() {
    var modal = document.getElementById("modal-diario");
    modal.hidden = !modal.hidden;
  };
}

var btnFecharDiario = document.getElementById("btn-fechar-diario");
if (btnFecharDiario) {
  btnFecharDiario.onclick = function() {
    document.getElementById("modal-diario").hidden = true;
  };
}