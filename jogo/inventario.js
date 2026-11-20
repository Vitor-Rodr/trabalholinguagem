/*Inventário*/
let inventario = []; // Array para armazenar os itens do inventário

function atualizarInventario() {
    
    var lista = document.getElementById("listaInventario");// Procura a lista no HTML pelo seu id
    lista.innerHTML = "";// Limpa a lista visual antes de preenchê-la novamente
    for (var i = 0; i < inventario.length; i++) {// Percorre todas as posições do vetor
        var item = inventario[i]; // Pega o item atual do inventário
        var imagem = item.imagem; // Pega a imagem do item atual
        var nome = item.nome; // Pega o nome do item atual
        lista.innerHTML += `<li>
                     <img src="${imagem}"  
                        style='width: 50px; height: 50px; 
                        margin-right: 10px;'>
                    </li>`; // Adiciona cada item do inventário à lista do HTML com imagem e nome
        //
    }
}

function temItem(nome) {

    return inventario.some(function(item) {
        return item.nome === nome;
    });

}

/*Item*/
function pegarChave() {// Função para pegar a chave na fase 1
    if (!temItem("Chave")) {
        inventario.push({
            "nome": "Chave",
            "imagem": "../imagens/objeto-fase1.png"
        });
             console.log("Chave adicionada ao inventário!");
             adicionarHistorico("Você encontrou uma chave escondida!")
    }
    let chave = document.getElementById('ChaveFase1');
    chave.remove(); // Remove a chave após pegá-la
    atualizarInventario(); // Atualiza o inventário na tela
 }