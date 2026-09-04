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
    artist: "joao-rua",
  },
  {
    id: "tt-02",
    title: "Blackout de manga",
    category: "blackwork",
    description: "Composição sólida em blackwork, contraste total sobre a pele.",
    image: null,
    images: [],
    date: "2026",
    artist: "joao-rua",
  },
  {
    id: "tt-03",
    title: "Botânica em fine line",
    category: "fineline",
    description: "Traço fino contínuo, referência floral minimalista.",
    image: null,
    images: [],
    date: "2025",
    artist: "mari-concreto",
  },
  {
    id: "tt-04",
    title: "Clássico old school",
    category: "oldschool",
    description: "Traço grosso e cores chapadas, homenagem à tatuagem tradicional.",
    image: null,
    images: [],
    date: "2025",
    artist: "duda-spray",
  },
  {
    id: "tt-05",
    title: "Lettering autoral",
    category: "lettering",
    description: "Caligrafia desenhada à mão, assinatura em tinta na pele.",
    image: null,
    images: [],
    date: "2025",
    artist: "mari-concreto",
  },
  {
    id: "tt-06",
    title: "Explosão de cor",
    category: "color",
    description: "Paleta viva inspirada em murais urbanos.",
    image: null,
    images: [],
    date: "2025",
    artist: "duda-spray",
  },
  {
    id: "tt-07",
    title: "Textura de concreto",
    category: "blackwork",
    description: "Blackwork geométrico com efeito de rachadura.",
    image: null,
    images: [],
    date: "2025",
    artist: null,
  },
  {
    id: "tt-08",
    title: "Fine line ornamental",
    category: "fineline",
    description: "Padrão geométrico em linha fina, simetria total.",
    image: null,
    images: [],
    date: "2024",
    artist: null,
  },
];

const PIERCINGS = [
  {
    id: "pc-01",
    title: "Helix",
    type: "Cartilagem — orelha",
    description: "Perfuração em titânio ASTM F-136, procedimento com agulha estéril descartável.",
    image: null,
    artist: "bia-aco",
  },
  {
    id: "pc-02",
    title: "Septo",
    type: "Nariz",
    description: "Um dos piercings mais versáteis, discreto ou marcante conforme a joia.",
    image: null,
    artist: "bia-aco",
  },
  {
    id: "pc-03",
    title: "Daith",
    type: "Cartilagem — orelha",
    description: "Perfuração na dobra interna da cartilagem, alto impacto visual.",
    image: null,
    artist: "bia-aco",
  },
  {
    id: "pc-04",
    title: "Sobrancelha",
    type: "Facial",
    description: "Curvatura marcada com curved barbell em titânio.",
    image: null,
    artist: "bia-aco",
  },
  {
    id: "pc-05",
    title: "Nostril",
    type: "Nariz",
    description: "O clássico piercing de narina, com joia fixa ou de rosca.",
    image: null,
    artist: null,
  },
  {
    id: "pc-06",
    title: "Industrial",
    type: "Cartilagem — orelha",
    description: "Duas perfurações unidas por uma barra reta, visual industrial marcante.",
    image: null,
    artist: null,
  },
];

/* Coletivo de artistas do studio. Cada um ganha uma página própria em
   artista/<slug>/index.html (ver README, seção "Adicionando artistas") que
   lê "slug" do atributo data-artist-slug no <body> daquele arquivo e busca
   os dados aqui. "works" filtra TATTOOS/PIERCINGS pelo campo "artist". */
const ARTISTS = [
  {
    id: "joao-rua",
    slug: "joao-rua",
    name: "João Rua",
    role: "Tatuador",
    specialties: ["Realismo", "Blackwork"],
    bio: null,
    photo: null,
    instagram: null,
  },
  {
    id: "mari-concreto",
    slug: "mari-concreto",
    name: "Mari Concreto",
    role: "Tatuadora",
    specialties: ["Fine Line", "Lettering"],
    bio: null,
    photo: null,
    instagram: null,
  },
  {
    id: "duda-spray",
    slug: "duda-spray",
    name: "Duda Spray",
    role: "Tatuador",
    specialties: ["Old School", "Color"],
    bio: null,
    photo: null,
    instagram: null,
  },
  {
    id: "bia-aco",
    slug: "bia-aco",
    name: "Bia Aço",
    role: "Body Piercer",
    specialties: ["Body Piercing"],
    bio: null,
    photo: null,
    instagram: null,
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
  whatsappNumber: "5531982376982",
  whatsappMessage: "Olá! Vim pelo site e quero um orçamento de tatuagem/piercing.",
  address: {
    street: "R. Ceará, 621 - Santa Efigênia",
    locality: "Belo Horizonte",
    region: "MG",
    postalCode: "30150-312",
    country: "BR",
    full: "R. Ceará, 621 - Santa Efigênia, Belo Horizonte - MG, 30150-312",
    mapsUrl:
      "https://www.google.com/maps/place/StreetArt+Tattoo/@-19.9266166,-43.9267531,21z/data=!4m15!1m8!3m7!1s0xa699ecf9e3d173:0x29b424a6465cc017!2sR.+Cear%C3%A1,+621+-+Santa+Efig%C3%AAnia,+Belo+Horizonte+-+MG,+30150-312!3b1!8m2!3d-19.9265445!4d-43.9267018!16s%2Fg%2F11xd4c0d2z!3m5!1s0xa699686b9c39db:0x313d90b044a17bb3!8m2!3d-19.9265663!4d-43.9267422!16s%2Fg%2F11s4bn3ltj?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D",
  },
};
