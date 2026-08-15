/* ==========================================================================
   STREET ART TATTOO — dados de conteúdo
   Separado do layout: adicione itens aqui e eles aparecem no site sem
   precisar tocar em index.html, css ou na lógica de render (main.js).

   Para usar uma foto real: preencha "image" (e opcionalmente "images")
   com o caminho do arquivo, ex: "images/portfolio/blackwork-01.jpg".
   Deixe "image: null" para usar uma textura de espera (placeholder)
   gerada automaticamente até a foto real ser adicionada.
   ========================================================================== */

const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "realismo", label: "Realismo" },
  { id: "blackwork", label: "Blackwork" },
  { id: "fineline", label: "Fine Line" },
  { id: "oldschool", label: "Old School" },
  { id: "lettering", label: "Lettering" },
  { id: "color", label: "Color" },
];

const TATTOOS = [
  {
    id: "tt-01",
    title: "Retrato realista",
    category: "realismo",
    description: "Estudo de luz e sombra em preto e cinza, sessão única de braço fechado.",
    image: null,
    images: [],
    date: "2026",
  },
  {
    id: "tt-02",
    title: "Blackout de manga",
    category: "blackwork",
    description: "Composição sólida em blackwork, contraste total sobre a pele.",
    image: null,
    images: [],
    date: "2026",
  },
  {
    id: "tt-03",
    title: "Botânica em fine line",
    category: "fineline",
    description: "Traço fino contínuo, referência floral minimalista.",
    image: null,
    images: [],
    date: "2025",
  },
  {
    id: "tt-04",
    title: "Clássico old school",
    category: "oldschool",
    description: "Traço grosso e cores chapadas, homenagem à tatuagem tradicional.",
    image: null,
    images: [],
    date: "2025",
  },
  {
    id: "tt-05",
    title: "Lettering autoral",
    category: "lettering",
    description: "Caligrafia desenhada à mão, assinatura em tinta na pele.",
    image: null,
    images: [],
    date: "2025",
  },
  {
    id: "tt-06",
    title: "Explosão de cor",
    category: "color",
    description: "Paleta viva inspirada em murais urbanos.",
    image: null,
    images: [],
    date: "2025",
  },
  {
    id: "tt-07",
    title: "Textura de concreto",
    category: "blackwork",
    description: "Blackwork geométrico com efeito de rachadura.",
    image: null,
    images: [],
    date: "2025",
  },
  {
    id: "tt-08",
    title: "Fine line ornamental",
    category: "fineline",
    description: "Padrão geométrico em linha fina, simetria total.",
    image: null,
    images: [],
    date: "2024",
  },
];

const PIERCINGS = [
  {
    id: "pc-01",
    title: "Helix",
    type: "Cartilagem — orelha",
    description: "Perfuração em titânio ASTM F-136, procedimento com agulha estéril descartável.",
    image: null,
  },
  {
    id: "pc-02",
    title: "Septo",
    type: "Nariz",
    description: "Um dos piercings mais versáteis, discreto ou marcante conforme a joia.",
    image: null,
  },
  {
    id: "pc-03",
    title: "Daith",
    type: "Cartilagem — orelha",
    description: "Perfuração na dobra interna da cartilagem, alto impacto visual.",
    image: null,
  },
  {
    id: "pc-04",
    title: "Sobrancelha",
    type: "Facial",
    description: "Curvatura marcada com curved barbell em titânio.",
    image: null,
  },
  {
    id: "pc-05",
    title: "Nostril",
    type: "Nariz",
    description: "O clássico piercing de narina, com joia fixa ou de rosca.",
    image: null,
  },
  {
    id: "pc-06",
    title: "Industrial",
    type: "Cartilagem — orelha",
    description: "Duas perfurações unidas por uma barra reta, visual industrial marcante.",
    image: null,
  },
];

/* type: "photo" ou "video" — para vídeo, use "src" (mp4) e "poster" opcional.
   O vídeo de bastidores já aparece em destaque na seção Experiência, então
   a galeria do studio abaixo é só fotografia do espaço. */
const GALLERY = [
  { id: "gl-01", title: "Fachada", type: "photo", image: null },
  { id: "gl-02", title: "Recepção", type: "photo", image: null },
  { id: "gl-03", title: "Sala de tatuagem", type: "photo", image: null },
  { id: "gl-04", title: "Bancada e equipamentos", type: "photo", image: null },
  { id: "gl-05", title: "Paredes e obras", type: "photo", image: null },
  { id: "gl-06", title: "Detalhes", type: "photo", image: null },
  { id: "gl-07", title: "Artistas em ação", type: "photo", image: null },
];

const INSTAGRAM_POSTS = [
  { id: "ig-01", caption: "Novo trampo saindo do forno", image: null },
  { id: "ig-02", caption: "Processo em blackwork", image: null },
  { id: "ig-03", caption: "Body piercing da semana", image: null },
  { id: "ig-04", caption: "Bastidores do studio", image: null },
  { id: "ig-05", caption: "Lettering autoral", image: null },
  { id: "ig-06", caption: "Cliente satisfeito", image: null },
];

const SITE = {
  instagramHandle: "@street_art.tattoo",
  instagramUrl: "https://www.instagram.com/street_art.tattoo/",
  /* TODO: confirmar número real de WhatsApp (formato: 55DDDNUMERO, só dígitos) */
  whatsappNumber: "5500000000000",
  whatsappMessage: "Olá! Vim pelo site e quero um orçamento de tatuagem/piercing.",
  /* TODO: confirmar endereço real do estúdio */
  address: {
    street: "Endereço a confirmar",
    locality: "Cidade a confirmar",
    region: "UF",
    country: "BR",
  },
};
