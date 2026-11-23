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

  var zoomAtual = document.getElementById("zoom-objeto");
  var zoomAberto = zoomAtual && !zoomAtual.hidden;

  // Enigma do forno: descongelar a Engrenagem 2 ao clicar nela com o forno aberto
  if (item.nome === "Engrenagem 2 Congelada" && zoomAberto && zoomAtual.dataset.zoom === "forno") {
    inventario[indice] = {
      nome: "Engrenagem 2",
      imagem: "../assets/images/cenarioobj/engrenagem2.png"
    };

    escreverStatus("O forno descongelou a Engrenagem 2!", "#a6e3a1");
    renderizarInventario();
    return;
  }

  // Enigma do frango: usar o Pe de Cabra com o zoom do frango aberto
  if (item.nome === "Pé de Cabra" && zoomAberto && zoomAtual.dataset.zoom === "frango") {
    abrirBuracoMesa();
    return;
  }

  // Comportamento padrao ao apenas selecionar/inspecionar o item
  escreverStatus("Item selecionado: " + item.nome, "#89b4fa");
}

// Abre o buraco na mesa usando o Pe de Cabra e troca para a cena do buraco
function abrirBuracoMesa() {
  if (buracoAberto) {
    return;
  }

  buracoAberto = true;
  escreverStatus("Voce usou o Pe de Cabra e abriu um buraco na mesa!", "#a6e3a1");
  abrirZoom("buraco");
}

// Clique no frango (dentro do zoom): exige o Pe de Cabra para abrir o buraco
function clicarFrango() {
  if (!temItem("Pé de Cabra")) {
    escreverStatus("Parece so um frango assado... talvez uma ferramenta ajude.", "#f9e2af");
    return;
  }

  abrirBuracoMesa();
}

// Clique no buraco (dentro do zoom): consome o Pe de Cabra e desce para a prisao
function entrarNoBuraco() {
  fecharZoom();
  removerItem("Pé de Cabra");
  escreverStatus("Voce desceu pelo buraco da mesa...", "#89b4fa");
  irPara("prisao", 0);
}