// Mostra ou esconde os itens soltos na cena conforme a vista ativa
function atualizarItensVisiveis(vistaAtiva) {
  var itens = document.querySelectorAll(".item-cenario");

  for (var i = 0; i < itens.length; i++) {
    var item = itens[i];
    var naVistaCerta = item.getAttribute("data-aqui") === vistaAtiva;
    var jaColetado = item.getAttribute("data-coletado") === "true";

    // So aparece se estiver na vista atual e ainda nao tiver sido coletado
    item.hidden = !naVistaCerta || jaColetado;
  }
}

// Executada quando o jogador clica em um item dentro do inventario
function inspecionarItem(indice) {
  var item = inventario[indice];
  if (!item) {
    return;
  }

  // Verifica se o zoom do forno esta aberto no momento
  var zoomAtual = document.getElementById("zoom-objeto");
  var noForno = zoomAtual && !zoomAtual.hidden && zoomAtual.dataset.zoom === "forno";

  // Enigma do forno: descongelar a Engrenagem 2 ao clicar nela com o forno aberto
  if (item.nome === "Engrenagem 2 Congelada" && noForno) {
    inventario[indice] = {
      nome: "Engrenagem 2",
      imagem: "../assets/images/cenarioobj/engrenagem2.png"
    };

    escreverStatus("O forno descongelou a Engrenagem 2!", "#a6e3a1");
    renderizarInventario();
    return;
  }

  // Comportamento padrao ao apenas selecionar/inspecionar o item
  escreverStatus("Item selecionado: " + item.nome, "#89b4fa");
}