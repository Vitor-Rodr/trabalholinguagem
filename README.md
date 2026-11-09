# O Banquete Guloso

Site do jogo de sobrevivência e suspense **Fuja do Vítor**.

## Estrutura

```
index.html          Página inicial
historia.html       História do jogo
informacoes.html    Sobre, como jogar e requisitos
midia.html          Galeria de cenários
suporte.html        Central de suporte (formulário via Formspree)
social.html         Redes sociais e contato

css/
  style.css         Estilos globais (base, navbar, botões, cards)
  home.css          index e história
  midia.css         galeria de cenários
  suporte.css       cards e modal do formulário
  social.css        cards de redes sociais

js/
  nav.js            menu hambúrguer (celular)
  midia.js          troca de cenário na galeria
  suporte.js        abrir/fechar o modal

assets/
  images/           logo e protagonista
    cenarios/       imagens das 6 salas
    _antigos/       arquivos antigos (não usados)
  video/            vídeo de fundo
```

## Como adicionar uma página nova

1. Copie uma página existente (ex.: `informacoes.html`) e ajuste o conteúdo.
2. Adicione o link `<li><a href="nova.html">Nova</a></li>` no `<ul class="nav-menu">` de **todas** as páginas.
3. Marque `class="active"` no link da própria página.
