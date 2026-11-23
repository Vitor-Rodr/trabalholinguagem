// Lista de itens carregados pelo jogador
var inventario = [];

// Quantidade maxima de itens permitidos na mochila/inventario
var LIMITE_INVENTARIO = 6;

// Mostra mensagens de feedback na barra inferior da tela
function escreverStatus(texto, cor) {
  var status = document.getElementById("mensagem-status");
  if (!status) {
    return;
  }

  status.innerText = texto;
  status.style.color = cor;
}

// Percorre o inventario para saber se o jogador ja tem esse item
function temItem(nomeItem) {
  for (var i = 0; i < inventario.length; i++) {
    if (inventario[i].nome === nomeItem) {
      return true;
    }
  }

  return false;
}

// Tira um item do inventario pelo nome e redesenha os slots
function removerItem(nomeItem) {
  for (var i = 0; i < inventario.length; i++) {
    if (inventario[i].nome === nomeItem) {
      inventario.splice(i, 1);
      renderizarInventario();
      return true;
    }
  }

  return false;
}

// Coleta um item clicado na cena ou no zoom e coloca no inventario (devolve true se coletou)
function pegarItem(botaoClicado, nomeItem, caminhoImagem) {
  var imagemLimpa = (caminhoImagem || "").trim();

  // Impede coletar o mesmo botao mais de uma vez
  if (botaoClicado && botaoClicado.getAttribute("data-coletado") === "true") {
    escreverStatus("Voce ja pegou este item.", "#f9e2af");
    return false;
  }

  // Bloqueia coleta caso o limite de 6 slots ja tenha sido atingido
  if (inventario.length >= LIMITE_INVENTARIO) {
    escreverStatus("Inventario cheio! Nao cabe mais nada.", "#f38ba8");
    return false;
  }

  // So adiciona se ainda nao existir um item com esse mesmo nome
  if (!temItem(nomeItem)) {
    inventario.push({
      nome: nomeItem,
      imagem: imagemLimpa
    });

    if (botaoClicado) {
      botaoClicado.setAttribute("data-coletado", "true");

      // Objetos .interativo-cena (como o pano do quarto) continuam visiveis para trocar de cena
      if (!botaoClicado.classList.contains("interativo-cena")) {
        botaoClicado.hidden = true;
      }
    }

    escreverStatus("Voce coletou: " + nomeItem, "#a6e3a1");
    renderizarInventario();
    return true;
  }

  return false;
}

// Monta os quadradinhos dos itens na tela e atualiza o contador (X/6)
function renderizarInventario() {
  var containerInventario = document.getElementById("inventario");
  var contador = document.getElementById("contador-slots");
  var htmlGerado = "";

  // Cria um slot visual para cada item guardado
  for (var i = 0; i < inventario.length; i++) {
    var item = inventario[i];

    htmlGerado +=
      '<div class="slot-item" onclick="inspecionarItem(' + i + ')" title="' + item.nome + '">' +
        '<img src="' + item.imagem + '" alt="' + item.nome + '">' +
        '<span>' + item.nome + '</span>' +
      '</div>';
  }

  if (containerInventario) {
    containerInventario.innerHTML = htmlGerado;
  }

  if (contador) {
    contador.innerText = inventario.length;
  }
}