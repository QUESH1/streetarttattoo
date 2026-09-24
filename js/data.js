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
    artist: null,
  },
  {
    id: "tt-02",
    title: "Blackout de manga",
    category: "blackwork",
    description: "Composição sólida em blackwork, contraste total sobre a pele.",
    image: null,
    images: [],
    date: "2026",
    artist: null,
  },
  {
    id: "tt-03",
    title: "Botânica em fine line",
    category: "fineline",
    description: "Traço fino contínuo, referência floral minimalista.",
    image: null,
    images: [],
    date: "2025",
    artist: null,
  },
  {
    id: "tt-04",
    title: "Clássico old school",
    category: "oldschool",
    description: "Traço grosso e cores chapadas, homenagem à tatuagem tradicional.",
    image: null,
    images: [],
    date: "2025",
    artist: null,
  },
  {
    id: "tt-05",
    title: "Lettering autoral",
    category: "lettering",
    description: "Caligrafia desenhada à mão, assinatura em tinta na pele.",
    image: null,
    images: [],
    date: "2025",
    artist: null,
  },
  {
    id: "tt-06",
    title: "Explosão de cor",
    category: "color",
    description: "Paleta viva inspirada em murais urbanos.",
    image: null,
    images: [],
    date: "2025",
    artist: null,
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
    artist: "thales",
  },
  {
    id: "pc-02",
    title: "Septo",
    type: "Nariz",
    description: "Um dos piercings mais versáteis, discreto ou marcante conforme a joia.",
    image: null,
    artist: "thales",
  },
  {
    id: "pc-03",
    title: "Daith",
    type: "Cartilagem — orelha",
    description: "Perfuração na dobra interna da cartilagem, alto impacto visual.",
    image: null,
    artist: "thales",
  },
  {
    id: "pc-04",
    title: "Sobrancelha",
    type: "Facial",
    description: "Curvatura marcada com curved barbell em titânio.",
    image: null,
    artist: "thales",
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
    id: "aninha",
    slug: "aninha",
    name: "Aninha",
    role: "Tatuadora",
    specialties: [],
    bio: "Aninha encontrou na arte uma forma de conquistar liberdade e expressar quem é. Seu trabalho nasce tanto das coisas bonitas da vida quanto das experiências difíceis que atravessam sua história, transformando sentimentos em imagem. Respeito, liberdade e autenticidade são a base da artista que busca construir. Entre tattoo e pintura, Aninha quer ampliar sua linguagem, ganhar cada vez mais autonomia e criar trabalhos que carreguem verdade, força e identidade.",
    photo: null,
    instagram: null,
  },
  {
    id: "lari",
    slug: "lari",
    name: "Lari",
    role: "Artista",
    specialties: [],
    bio: null,
    photo: null,
    instagram: null,
  },
  {
    id: "savoi",
    slug: "savoi",
    name: "Savoi",
    role: "Tatuador",
    specialties: [],
    bio: "Savoi encontrou na tattoo uma forma de transformar a relação que sempre teve com a arte em caminho de vida. É através dela que explora novas formas de expressão, cria conexões e encontra pessoas que se identificam com o que ele faz. Seu trabalho nasce da curiosidade e da vontade constante de aprender. Savoi busca ampliar suas referências, viver novas experiências e construir uma arte cada vez mais conectada com quem ele é e com a forma como enxerga o mundo.",
    photo: null,
    instagram: null,
  },
  {
    id: "thales",
    slug: "thales",
    name: "Thales",
    role: "Body Piercer",
    specialties: ["Body Piercing"],
    bio: "Thales encontrou no piercing uma forma de unir arte, técnica e identidade. Mais do que estética, ele enxerga cada perfuração como uma escolha capaz de transformar a forma como alguém se vê e se expressa. Seu trabalho é guiado por autenticidade, qualidade, segurança e respeito pelo corpo. Thales busca evoluir sem perder a essência, criando experiências que tragam confiança e orgulho para quem escolhe carregar seu trabalho.",
    photo: null,
    instagram: null,
  },
  {
    id: "victor",
    slug: "victor",
    name: "Victor",
    role: "Tatuador",
    specialties: [],
    bio: "Victor é um artista movido pelo inconformismo e pela vontade de construir algo maior do que aquilo que esperavam dele. Essa inquietação também aparece na forma como enxerga a tatuagem: como expressão, identidade e escolha. Respeito, honestidade e confiança são a base do seu trabalho. Mais do que entregar uma imagem na pele, Victor busca criar algo verdadeiro, que carregue intenção e uma parte de quem ele é como artista.",
    photo: null,
    instagram: null,
  },
  {
    id: "fune",
    slug: "fune",
    name: "Fune",
    role: "Tatuador",
    specialties: [],
    bio: "Fune é um artista que encontrou na arte uma forma de existir com mais liberdade. Influenciado pelo desenho, pela música e pela cultura hip hop, constrói um trabalho que nasce da necessidade de se expressar sem seguir caminhos prontos. Sua busca é por uma linguagem cada vez mais autoral, capaz de provocar sensação, estranhamento ou identificação. Para ele, cada trabalho também carrega um pouco de quem ele é e da escolha de viver fora da curva.",
    photo: null,
    instagram: null,
  },
  {
    id: "neville",
    slug: "neville",
    name: "Neville",
    role: "Tatuador",
    specialties: [],
    bio: "Neville encontrou na tattoo uma continuação de uma paixão que começou cedo, desenhando Dragon Ball e se conectando tanto com a estética quanto com as histórias e valores presentes nesse universo. Honestidade, sinceridade e respeito guiam sua forma de trabalhar. Como artista, busca construir uma identidade própria e criar tattoos que reforcem uma ideia importante para ele: cada pessoa é única e capaz de transformar a própria realidade.",
    photo: null,
    instagram: null,
  },
  {
    id: "yoki",
    slug: "yoki",
    name: "Yoki",
    role: "Artista",
    specialties: [],
    bio: null,
    photo: null,
    instagram: null,
  },
  {
    id: "lincoln",
    slug: "lincoln",
    name: "Lincoln",
    role: "Tatuador",
    specialties: [],
    bio: "Lincoln é um artista que encontrou na tattoo um caminho para transformar experiência, responsabilidade e vivência em expressão. Depois de passar por diferentes fases e tentativas profissionais, foi na arte que ele encontrou algo que realmente fazia sentido continuar construindo. Seu trabalho parte muito da confiança. Para Lincoln, tatuar também é assumir a responsabilidade de marcar momentos e histórias que pertencem a outras pessoas, transformando ideias em algo que passa a fazer parte delas.",
    photo: null,
    instagram: null,
  },
  {
    id: "pedro-jr",
    slug: "pedro-jr",
    name: "Pedro Jr",
    role: "Tatuador",
    specialties: [],
    bio: "Pedro é um artista que encontrou na tattoo uma continuação natural de algo que sempre fez parte da sua vida: desenhar, criar e viver o universo geek. Mangás, animes e outras referências dessa cultura aparecem no seu trabalho como formas de unir identidade, sentimento e narrativa. Mais do que tatuar, Pedro busca crescer dentro da arte e construir um trabalho que também possa inspirar outros artistas no caminho.",
    photo: null,
    instagram: null,
  },
  {
    id: "bevilaqua",
    slug: "bevilaqua",
    name: "Bevilaqua",
    role: "Artista",
    specialties: [],
    bio: null,
    photo: null,
    instagram: null,
  },
  {
    id: "franck",
    slug: "franck",
    name: "Franck",
    role: "Tatuador",
    specialties: ["Dark Ornamental"],
    bio: "Franck é um artista movido pela curiosidade, pela experimentação e pela busca de uma linguagem própria. Seu trabalho vem se construindo principalmente dentro do dark ornamental, explorando formas orgânicas, free hand e desenhos pensados diretamente para o corpo. Mais do que seguir padrões ou tendências, ele busca desenvolver uma identidade cada vez mais autoral - criando tattoos que carreguem sua forma de pensar, construir e enxergar a arte.",
    photo: null,
    instagram: null,
  },
  {
    id: "arthur",
    slug: "arthur",
    name: "Arthur",
    role: "Artista",
    specialties: [],
    bio: null,
    photo: null,
    instagram: null,
  },
  {
    id: "thaylane",
    slug: "thaylane",
    name: "Thaylane",
    role: "Artista",
    specialties: [],
    bio: null,
    photo: null,
    instagram: null,
  },
];

/* Cardápio de perfurações do Thales (nome, região e valor). "price: null"
   mantém o selo "valor a confirmar" até os preços reais serem informados —
   nunca invente um valor aqui. */
const PIERCING_MENU = [
  { id: "pm-01", name: "Helix", region: "Cartilagem — orelha", price: null },
  { id: "pm-02", name: "Septo", region: "Nariz", price: null },
  { id: "pm-03", name: "Daith", region: "Cartilagem — orelha", price: null },
  { id: "pm-04", name: "Sobrancelha", region: "Facial", price: null },
  { id: "pm-05", name: "Nostril", region: "Nariz", price: null },
  { id: "pm-06", name: "Industrial", region: "Cartilagem — orelha", price: null },
];

/* Catálogo visual de joias/produtos do Thales — sem carrinho, pagamento ou
   estoque nesta etapa. "category", "price" e "description" ficam null até
   os dados reais chegarem: nunca invente material, valor ou característica
   de joia aqui. */
const PRODUCTS = [
  { id: "pr-01", name: "Joia de piercing", category: null, price: null, description: null, image: null },
  { id: "pr-02", name: "Joia de piercing", category: null, price: null, description: null, image: null },
  { id: "pr-03", name: "Joia de piercing", category: null, price: null, description: null, image: null },
  { id: "pr-04", name: "Joia de piercing", category: null, price: null, description: null, image: null },
];

/* Eventos e projetos realizados no espaço (brechós, Flash Days, exposições,
   música etc.) — títulos abaixo são placeholders por categoria, marcados
   como provisórios na UI (ver .provisional-tag), sem datas ou detalhes
   inventados. Substitua por eventos reais em "js/data.js" quando os
   materiais chegarem (ver README, seção "Adicionando eventos"). */
const EVENTS = [
  { id: "ev-01", title: "Brechó StreetArt", type: "Brechó", date: null, description: null, image: null },
  { id: "ev-02", title: "Flash Day", type: "Flash Day", date: null, description: null, image: null },
  { id: "ev-03", title: "Exposição", type: "Exposição", date: null, description: null, image: null },
  { id: "ev-04", title: "Música ao Vivo", type: "Música", date: null, description: null, image: null },
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
