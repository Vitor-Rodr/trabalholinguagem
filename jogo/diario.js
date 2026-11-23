var anotacoesDiario = [];

// Conecta todos os botões do HTML que possuem data-diario-titulo
function inicializarBotoesDiario() {
  var botoesComPista = document.querySelectorAll("[data-diario-titulo]");

  for (var i = 0; i < botoesComPista.length; i++) {
    var botao = botoesComPista[i];
    var cliqueAnterior = botao.onclick;

    botao.onclick = function() {
      // Executa primeiro a ação original do jogo (zoom, coleta de item, troca de cena)
      if (cliqueAnterior) {
        cliqueAnterior.call(this);
      }

      var idPista = this.getAttribute("data-diario-id") || this.id;
      var titulo = this.getAttribute("data-diario-titulo");
      var texto = this.getAttribute("data-diario-texto");

      registrarNoDiario(idPista, titulo, texto, false);
    };
  }
}

// Registra uma pista nova ou atualiza uma existente (se atualizarExistente for true)
function registrarNoDiario(id, titulo, texto, atualizarExistente) {
  if (!titulo || !texto) {
    return;
  }

  for (var i = 0; i < anotacoesDiario.length; i++) {
    if (anotacoesDiario[i].id === id) {
      if (atualizarExistente) {
        anotacoesDiario[i].titulo = titulo;
        anotacoesDiario[i].texto = texto;
        atualizarRenderDiario();
        destacarBotaoDiario();
      }
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

// Monta o HTML das anotações usando template strings
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

// Destaca o botão do diário por 1.5s para avisar o jogador sobre nova anotação
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

// Alterna abrir/fechar ao clicar no botão do topo
var btnAbrirDiario = document.getElementById("btn-abrir-diario");
if (btnAbrirDiario) {
  btnAbrirDiario.onclick = function() {
    var modal = document.getElementById("modal-diario");
    modal.hidden = !modal.hidden;
  };
}

// Fecha ao clicar no X da imagem
var btnFecharDiario = document.getElementById("btn-fechar-diario");
if (btnFecharDiario) {
  btnFecharDiario.onclick = function() {
    document.getElementById("modal-diario").hidden = true;
  };
}

inicializarBotoesDiario();