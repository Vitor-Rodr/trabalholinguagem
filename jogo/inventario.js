var inventario = [];
var LIMITE_INVENTARIO = 6;

function escreverStatus(texto, cor) {
  var status = document.getElementById("mensagem-status");
  if (!status) return;
  status.innerText = texto;
  status.style.color = cor;
}

// Controla quais itens espalhados aparecem na vista atual
function atualizarItensVisiveis(vistaAtual) {
  var itens = document.getElementsByClassName("item-cenario");

  for (var i = 0; i < itens.length; i++) {
    var item = itens[i];
    var jaFoiColetado = item.getAttribute("data-coletado") === "true";
    var estaNestaVista = item.getAttribute("data-aqui") === vistaAtual;

    if (jaFoiColetado || !estaNestaVista) {
      item.hidden = true;
    } else {
      item.hidden = false;
    }
  }
}

// Verifica se um item já está no inventário
function temItem(nomeItem) {
  for (var i = 0; i < inventario.length; i++) {
    if (inventario[i].nome === nomeItem) {
      return true;
    }
  }
  return false;
}

// Função chamada pelo onclick="pegarItem(this, 'Nome', 'caminho.png')"
function pegarItem(botaoClicado, nomeItem, caminhoImagem) {
  var imagemLimpa = (caminhoImagem || "").trim();

  if (inventario.length >= LIMITE_INVENTARIO) {
    escreverStatus("Inventário cheio! Não cabe mais nada.", "#f38ba8");
    return;
  }

  if (!temItem(nomeItem)) {
    inventario.push({
      nome: nomeItem,
      imagem: imagemLimpa
    });

    // Marca como coletado e esconde para não reaparecer ao trocar de vista/cômodo
    botaoClicado.setAttribute("data-coletado", "true");
    botaoClicado.hidden = true;

    escreverStatus("Você coletou: " + nomeItem, "#a6e3a1");
    renderizarInventario();
  }
}

// Desenha os ícones coletados dentro da barra de inventário
function renderizarInventario() {
  var containerInventario = document.getElementById("inventario");
  var contador = document.getElementById("contador-slots");
  var htmlGerado = "";

  for (var i = 0; i < inventario.length; i++) {
    var item = inventario[i];

    htmlGerado += `
      <div class="slot-item" onclick="inspecionarItem(${i})" title="${item.nome}">
        <img src="${item.imagem}" alt="${item.nome}">
        <span>${item.nome}</span>
      </div>
    `;
  }

  containerInventario.innerHTML = htmlGerado;
  contador.innerText = inventario.length;
}

// Mostra o nome do item na barra de status ao clicar nele dentro do inventário
function inspecionarItem(indice) {
  var item = inventario[indice];

  if (item) {
    escreverStatus("Item selecionado: " + item.nome, "#89b4fa");
  }
}