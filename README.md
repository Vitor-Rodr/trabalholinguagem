# Banquete dos Gulosos

Site do jogo de sobrevivência e suspense **Fuja dos Gulosos**.

## Estrutura

```
index.html            Página inicial
historia.html         História do jogo
informacoes.html      Sobre o jogo e requisitos
como-jogar.html       Manual de sobrevivência e comandos
midia.html            Galeria de cenários
desenvolvedores.html  Equipe
suporte.html          Central de suporte (formulário via Formspree)
atualizacoes.html     Histórico de versões
social.html           Redes sociais e contato

css/
  style.css           Estilos globais (base, navbar, botões, cards, responsivo)
  index.css           Estilos exclusivos da página inicial
  historia.css        Estilos exclusivos de história
  como-jogar.css      Estilos exclusivos de como jogar
  midia.css           Estilos exclusivos da galeria
  desenvolvedores.css Estilos exclusivos de desenvolvedores
  suporte.css         Estilos exclusivos de suporte (modal do formulário)
  atualizacoes.css    Estilos exclusivos de atualizações (linha do tempo)
  social.css          Estilos exclusivos de social

js/
  nav.js              Menu hambúrguer (todas as páginas)
  midia.js            Troca de cenário na galeria
  suporte.js          Abrir/fechar o modal

assets/
  images/             Logo e protagonista
    cenarios/         Imagens das 6 salas
    desenvolvedores/  Fotos da equipe
    _antigos/         Arquivos antigos (não usados)
  video/              Vídeo de fundo
```

## Padrões do projeto

- **Nomes de arquivos:** minúsculos, sem acento e com hífen (`como-jogar.html`).
- **CSS:** nenhuma página tem `<style>` ou `style=""` dentro do HTML. Cada página carrega `css/style.css` e, se tiver estilos próprios, `css/<nome-da-pagina>.css`.
- **Cores e medidas:** use as variáveis de `:root` em `style.css` (`--cor-destaque`, `--cor-card`, `--altura-navbar`...) em vez de valores soltos.
- **JavaScript:** nenhum `onclick` no HTML; os scripts ficam em `js/` e todas as páginas carregam `nav.js`.
- **Menu:** idêntico em todas as páginas; só muda o link com `class="active"`.
- **Textos:** português do Brasil (`lang="pt-BR"`), tratando o jogador por "você".
- **Títulos das abas:** `Página - Banquete dos Gulosos` (a página inicial usa só o nome do site).
- **Quebras de linha:** LF.

## Como adicionar uma página nova

1. Copie uma página existente (ex.: `informacoes.html`) e ajuste o conteúdo.
2. Se precisar de estilos próprios, crie `css/<nome-da-pagina>.css` e adicione o `<link>` depois do `style.css`.
3. Adicione `<li><a href="nova-pagina.html">Nova página</a></li>` no `<ul class="nav-menu">` de **todas** as páginas.
4. Marque `class="active" aria-current="page"` no link da própria página.
