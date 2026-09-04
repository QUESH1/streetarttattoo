# Street Art Tattoo

Website do estúdio Street Art Tattoo — tatuagem e body piercing com
identidade visual de graffiti, pixo e cultura de rua.

Site estático (HTML/CSS/JS puro, sem build step), pensado para hospedagem
via GitHub Pages ou qualquer servidor estático.

## Estrutura

- `index.html` — página única do site
- `css/style.css` — estilos
- `js/data.js` — conteúdo (tatuagens, piercings, galeria, categorias, dados
  do studio). Edite este arquivo para adicionar/remover itens — eles
  aparecem automaticamente no site, sem tocar em HTML/CSS.
- `js/main.js` — comportamento (menu, cursor, filtros, lightbox, animações)
- `images/` — imagens usadas pelo site (logo, `images/deco/` com os
  respingos de spray/pichação usados como marca d'água decorativa)
- `videos/` — vídeos usados pelo site (hero e bastidores)
- `fonts/` — fonte Grapixoso (ver licença abaixo)

## Adicionando fotos reais

Todo o portfólio de tatuagens, piercings, galeria do studio e o mural do
"O Studio" estão hoje com uma textura de espera ("FOTO EM BREVE") gerada
automaticamente, porque ainda não há fotos reais do trabalho do estúdio
neste repositório.

Para trocar por uma foto real:

1. Coloque o arquivo otimizado (WebP/JPG) dentro de `images/` (crie
   subpastas como `images/portfolio/`, `images/piercing/`,
   `images/galeria/` se preferir organizar).
2. Em `js/data.js`, troque `image: null` pelo caminho do arquivo, ex.:
   `image: "images/portfolio/blackwork-01.jpg"`.
3. Pronto — o item passa a exibir a foto real automaticamente.

## Adicionando/editando artistas

O studio tem uma aba "Artistas" (`#artistas` na home) com um card por
artista, e cada um tem sua própria página em
`artista/<slug>/index.html` — ex.: `streetarttattoo/artista/joao-rua/`.
Não há build step nem geração automática dessas páginas, então adicionar
um artista novo tem duas partes:

1. **Dados** — em `js/data.js`, adicione um item ao array `ARTISTS`
   (`id`, `slug`, `name`, `role`, `specialties`, `bio`, `photo`,
   `instagram`). Use `bio: null` e `photo: null` para manter o placeholder
   "em breve" até ter o texto/foto reais. Opcionalmente, marque quais
   tatuagens/piercings são desse artista adicionando `artist: "<slug>"`
   nos itens correspondentes de `TATTOOS`/`PIERCINGS` — isso faz esses
   trabalhos aparecerem automaticamente na seção "Trabalhos" do perfil
   dele.
2. **Página** — crie a pasta `artista/<slug>/` e copie o `index.html` de
   qualquer artista já existente (ex. `artista/joao-rua/index.html`) para
   dentro dela. O conteúdo do perfil (nome, foto, bio, trabalhos) é
   preenchido em tempo de execução por `js/artist.js`, a partir do
   `data-artist-slug` no `<body>` — troque só esse atributo e os campos de
   `<title>`/`<meta>` (description, canonical, og:*) pelo `slug`/nome
   corretos do novo artista.

Para remover um artista, apague a pasta `artista/<slug>/` e o item
correspondente em `ARTISTS`.

## Publicação

O site está hospedado via GitHub Pages em
https://quesh1.github.io/streetarttattoo/ — publicado a partir de um
branch `main` com histórico próprio (apenas o commit de publicação), para
manter o histórico de desenvolvimento fora do repositório público.

Se o studio adquirir um domínio próprio, basta criar um arquivo `CNAME` na
raiz com o domínio, configurar o DNS, e trocar as URLs de
`canonical`/`og:`/`twitter:`/JSON-LD em `index.html` pelo domínio real.

## Pendências

- Adicionar fotos reais do studio, tatuagens e piercings

## Desenvolvimento local

Basta abrir `index.html` no navegador — não há dependências ou processo
de build.

## Licença

Todos os direitos reservados — veja [LICENSE](LICENSE).

A fonte [Grapixoso](https://www.1001fonts.com/grapixoso-font.html), de Rafael
Castro, é distribuída sob CC BY-ND (livre para uso comercial, com atribuição
ao autor).
