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
- `images/` — imagens usadas pelo site (logo)
- `videos/` — vídeos usados pelo site (hero e bastidores)

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

## Pendências antes de publicar

- Trocar `SEU-DOMINIO-AQUI.com` pelo domínio real (meta tags de SEO/OG)
- Adicionar fotos reais do studio, tatuagens e piercings

## Desenvolvimento local

Basta abrir `index.html` no navegador — não há dependências ou processo
de build.

## Licença

Todos os direitos reservados — veja [LICENSE](LICENSE).
