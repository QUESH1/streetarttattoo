# Street Art Tattoo

Website do estúdio Street Art Tattoo — tatuagem e body piercing com
identidade visual de graffiti, pixo e cultura de rua.

Site estático (HTML/CSS/JS puro, sem build step), pensado para hospedagem
via GitHub Pages ou qualquer servidor estático.

## Estrutura

- `index.html` — página principal (apresentação, manifesto, carrossel de
  artistas, destaque de piercing, eventos, instagram e contato)
- `artista/<slug>/index.html` — página própria de cada artista, incluindo
  `artista/thales/` (perfil + cardápio de perfurações + catálogo de joias)
- `css/style.css` — estilos
- `js/data.js` — conteúdo (tatuagens, piercings, cardápio de perfurações,
  produtos, artistas, eventos, categorias, dados do studio). Edite este
  arquivo para adicionar/remover itens — eles aparecem automaticamente no
  site, sem tocar em HTML/CSS.
- `js/main.js` — comportamento da home (colapso "ver mais", lightbox,
  carrossel de artistas, destaque de piercing/Thales, animações)
- `js/artist.js` — comportamento das páginas de artista (perfil, trabalhos
  e, na página do Thales, cardápio de perfurações e catálogo de produtos)
- `js/common.js` — comportamento compartilhado (nav, menu, cursor, lightbox,
  links de WhatsApp/Instagram)
- `images/` — imagens usadas pelo site (logo, `images/deco/` com os
  respingos de spray/pichação usados como marca d'água decorativa)
- `videos/` — vídeo do hero (`videos/hero.mp4`)
- `fonts/` — fonte Grapixoso (ver licença abaixo)
- `manifesto/` — PDFs de biografia enviados pelo estúdio (fonte do texto
  usado em `ARTISTS`, ver `js/data.js`)

## Conteúdo provisório

Texto ou dado que ainda não tem material oficial (manifesto, eventos,
valores de piercing, produtos etc.) aparece marcado com o selo visual
"conteúdo provisório" / "valor a confirmar" (classe `.provisional-tag` em
`css/style.css`) — a mesma lógica do selo "EM BREVE" já usado nas imagens
placeholder. Substitua o texto/dado real em `js/data.js` (ou no HTML, no
caso do texto do manifesto) e o selo deixa de aparecer.

## Adicionando fotos reais

Todo o portfólio de tatuagens, piercings e a foto do "O Studio" estão hoje
com uma textura de espera ("FOTO EM BREVE") gerada automaticamente, porque
ainda não há fotos reais do trabalho do estúdio neste repositório.

Para trocar por uma foto real:

1. Coloque o arquivo otimizado (WebP/JPG) dentro de `images/` (crie
   subpastas como `images/portfolio/`, `images/piercing/`,
   `images/artistas/` se preferir organizar).
2. Em `js/data.js`, troque `image: null` pelo caminho do arquivo, ex.:
   `image: "images/portfolio/blackwork-01.jpg"`.
3. Pronto — o item passa a exibir a foto real automaticamente.

## Adicionando/editando artistas

O studio tem uma aba "Artistas" (`#artistas` na home) com um card por
artista, e cada um tem sua própria página em
`artista/<slug>/index.html` — ex.: `streetarttattoo/artista/thales/`.
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
   qualquer artista já existente (ex. `artista/thales/index.html`) para
   dentro dela. O conteúdo do perfil (nome, foto, bio, trabalhos) é
   preenchido em tempo de execução por `js/artist.js`, a partir do
   `data-artist-slug` no `<body>` — troque só esse atributo e os campos de
   `<title>`/`<meta>` (description, canonical, og:*) pelo `slug`/nome
   corretos do novo artista.

Para remover um artista, apague a pasta `artista/<slug>/` e o item
correspondente em `ARTISTS`.

## Piercing — cardápio e catálogo do Thales

A página `artista/thales/` é uma página de artista normal (mesmo template),
mas com dois blocos extras só nela:

1. **Cardápio de perfurações** — array `PIERCING_MENU` em `js/data.js`
   (`name`, `region`, `price`). Deixe `price: null` para manter o selo
   "valor a confirmar"; preencha com o valor real (ex. `"R$ 80"`) quando o
   studio informar.
2. **Joias & produtos** — array `PRODUCTS` em `js/data.js` (`name`,
   `category`, `price`, `description`, `image`). É só um catálogo visual —
   sem carrinho, pagamento ou controle de estoque. Cada card tem um botão
   de WhatsApp com o nome do produto já preenchido na mensagem.

Não invente valores, materiais ou características de joias nesses dois
arrays — deixe `null` (selo "a confirmar"/"em atualização") até os dados
reais chegarem.

## Adicionando eventos

A seção "Eventos Realizados" (`#eventos` na home) lê o array `EVENTS` em
`js/data.js` (`title`, `type`, `date`, `description`, `image`). Adicione um
evento real preenchendo esses campos — enquanto `date`/`description`/`image`
ficarem `null`, o card mostra o selo "conteúdo provisório" e a textura de
espera no lugar da foto.

## Publicação

O site está hospedado via GitHub Pages em
https://quesh1.github.io/streetarttattoo/ — publicado a partir de um
branch `main` com histórico próprio (apenas o commit de publicação), para
manter o histórico de desenvolvimento fora do repositório público.

Se o studio adquirir um domínio próprio, basta criar um arquivo `CNAME` na
raiz com o domínio, configurar o DNS, e trocar as URLs de
`canonical`/`og:`/`twitter:`/JSON-LD em `index.html` pelo domínio real.

## Pendências

Conteúdo aguardando material oficial do studio (ver seção "Conteúdo
provisório" acima — tudo já está com espaço reservado no layout):

- Logo/identidade visual definitiva e referências de marca
- Texto final da Home, do Manifesto (`#manifesto`) e do Studio (`#studio`,
  hoje "Texto em breve." em `index.html`)
- Vídeo/foto real do hero e foto do Studio (uma foto grande, ex. o grupo
  de artistas reunido)
- Biografia de Lari, Yoki, Bevilaqua, Arthur e Thaylane (`ARTISTS` em
  `js/data.js` — as outras 9 já vieram de `manifesto/Biografia_*.pdf`)
- Fotos, especialidades e portfólio de cada artista (`ARTISTS`, `TATTOOS`
  em `js/data.js`)
- Links de Instagram de cada artista (`instagram` em `ARTISTS`)
- Valores e descrições das perfurações do Thales (`PIERCING_MENU`)
- Fotos e informações das joias/produtos (`PRODUCTS`)
- Fotos, datas e descrições dos eventos realizados (`EVENTS`)

## Desenvolvimento local

Basta abrir `index.html` no navegador — não há dependências ou processo
de build.

## Licença

Todos os direitos reservados — veja [LICENSE](LICENSE).

A fonte [Grapixoso](https://www.1001fonts.com/grapixoso-font.html), de Rafael
Castro, é distribuída sob CC BY-ND (livre para uso comercial, com atribuição
ao autor).
