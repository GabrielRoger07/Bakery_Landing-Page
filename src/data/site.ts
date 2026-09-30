export type Photo = {
  img: string;
  credit: string;
  creditHref: string;
};

const PHOTOS: Record<string, Photo> = {
  A: photo("photo-1568254183919-78a4f43a2877", "Yeh Xintong", "blsnki"),
  B: photo("photo-1623334044303-241021148842", "Conor Brown", "commonboxturtle"),
  C: photo("photo-1587241321921-91a834d6d191", "Andy Li", "andylid0"),
  D: photo("photo-1608198093002-ad4e005484ec", "mohamed hassouna", "mhassouna931"),
  E: photo("photo-1583338917451-face2751d8d5", "Ulysse Pointcheval", "ulysse_pcl"),
  F: photo("photo-1555507036-ab1f4038808a", "Mae Mu", "picoftasty"),
  G: photo("photo-1534432182912-63863115e106", "Kirsten Drew", "k_drew"),
  H: photo("photo-1483695028939-5bb13f8648b0", "Mink Mingle", "minkmingle"),
  I: photo("photo-1621303837174-89787a7d4729", "Katie Rosario", "xokatierosario"),
  J: photo("photo-1599819055803-717bba43890f", "Bas Peperzak", "bastroloog"),
  K: photo("photo-1607151815172-254f6b0c9b4b", "Hamideh Jafari", "hamideh_jafari"),
  L: photo("photo-1613929231151-d7571591259e", "Nicholas Doyle", "nsdoyle"),
};

function photo(id: string, name: string, user: string): Photo {
  return {
    img: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=70`,
    credit: `Photo by ${name} on Unsplash`,
    creditHref: `https://unsplash.com/@${user}`,
  };
}

export function ph(key: string): Photo {
  return PHOTOS[key] ?? PHOTOS.A;
}

export const COMPANY = {
  name: "Pani Premium",
  foundedYear: 2012,
  googleRating: 4.8,
  reviewCount: 1240,
  phone: "(00) 0000-0000",
  phoneTel: "+5500000000000",
  whatsapp: "https://wa.me/5500000000000",
  email: "contato@panipremium.com.br",
  address: ["Rua das Padarias, 123", "Centro · Cidade – UF", "CEP 00000-000"],
};

export const NAV = [
  { label: "Serviços", href: "#servicos" },
  { label: "Cardápio", href: "#produtos" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Trabalhe conosco", href: "#vagas" },
  { label: "Contato", href: "#contato" },
];

export type Service = {
  id: string;
  title: string;
  when: string;
  photo: string;
  desc: string;
} & Photo;

export const SERVICES: Service[] = [
  {
    id: "cafe-colonial",
    title: "Café colonial",
    when: "Todos os dias · 7h–11h",
    photo: "Mesa posta do café colonial",
    desc: "Mais de 40 itens: pães da casa, bolos, frios, geleias artesanais, tapioca e café coado na hora. Coma à vontade, sem pressa.",
    ...ph("H"),
  },
  {
    id: "almoco",
    title: "Almoço",
    when: "Todos os dias · 11h–14h30",
    photo: "Prato do almoço / buffet",
    desc: "Comida caseira com buffet por quilo e prato executivo do dia. Saladas frescas, grelhados e sobremesa da nossa confeitaria.",
    ...ph("K"),
  },
  {
    id: "encomendas",
    title: "Encomendas",
    when: "Pedidos com 48h",
    photo: "Bolo decorado / kit festa",
    desc: "Bolos, tortas, doces finos e kits de salgados para aniversários, reuniões e eventos. A gente cuida da mesa, você cuida da festa.",
    ...ph("I"),
  },
];

export type Product = {
  cat: string;
  id: string;
  name: string;
  desc: string;
  tag: string;
} & Photo;

const RAW_PRODUCTS: [string, string, string, string, string][] = [
  ["Pães", "pao-frances", "Pão francês", "Casquinha crocante, miolo macio.", "Fornadas 6h e 16h"],
  ["Pães", "fermentacao", "Fermentação natural", "Levain de 24h, casca grossa, acidez suave.", "Sex e sáb"],
  ["Confeitaria", "bolo-cenoura", "Bolo de cenoura", "Cobertura de chocolate que escorre.", "Fatia ou inteiro"],
  ["Confeitaria", "torta-limao", "Torta de limão", "Creme cítrico e merengue maçaricado.", "Sob encomenda"],
  ["Salgados", "coxinha", "Coxinha", "Frango com catupiry, massa sequinha.", "Diário"],
  ["Salgados", "empada", "Empada", "Palmito ou frango, massa que desmancha.", "Diário"],
  ["Conveniência", "frios", "Frios fatiados", "Presunto e queijos cortados na hora.", "Balcão"],
  ["Conveniência", "mercearia", "Mercearia", "Leite, manteiga, ovos e o essencial.", "Diário"],
];

const PRODUCT_PHOTO_KEYS = ["J", "L", "G", "E", "B", "F", "C", "A"];

export const PRODUCTS: Product[] = RAW_PRODUCTS.map(([cat, id, name, desc, tag], i) => ({
  cat,
  id,
  name,
  desc,
  tag,
  ...ph(PRODUCT_PHOTO_KEYS[i]),
}));

export type TimelineStep = {
  year: string;
  short: string;
  metrics: [number, number, number];
  title: string;
  text: string;
  photo: Photo;
  photoAlt: string;
};

export function buildTimeline(foundedYear: number): TimelineStep[] {
  const years = new Date().getFullYear() >= foundedYear ? new Date().getFullYear() - foundedYear : 14;
  const visualKeys = ["C", "E", "G"];
  const visualAlts = [
    `${foundedYear} — o primeiro balcão (foto antiga)`,
    `${foundedYear + 4} — a confeitaria`,
    `${foundedYear + 8} — o salão novo`,
  ];
  return [
    {
      year: String(foundedYear),
      short: "O primeiro balcão",
      metrics: [30, 8, 4],
      title: "Um forno e uma receita de família",
      text: "Abrimos as portas com um balcão pequeno, pão francês de hora em hora e muita vontade de servir o bairro.",
      photo: ph(visualKeys[0]),
      photoAlt: visualAlts[0],
    },
    {
      year: String(foundedYear + 4),
      short: "Nasce a confeitaria",
      metrics: [80, 20, 12],
      title: "Chegou a confeitaria",
      text: "Os bolos da família viraram vitrine. Vieram as tortas, os doces finos e as primeiras encomendas de festa.",
      photo: ph(visualKeys[1]),
      photoAlt: visualAlts[1],
    },
    {
      year: String(foundedYear + 8),
      short: "Salão e café colonial",
      metrics: [150, 60, 28],
      title: "Salão novo, café colonial",
      text: "Ampliamos o espaço, abrimos o almoço e criamos o café colonial.",
      photo: ph(visualKeys[2]),
      photoAlt: visualAlts[2],
    },
    {
      year: "Hoje",
      short: "Antes e depois",
      metrics: [200, 60, 40],
      title: `${years} anos de forno aceso`,
      text: "Arraste para comparar como tudo começou e como estamos hoje. Obrigado por fazer parte dessa história.",
      photo: ph("A"),
      photoAlt: "DEPOIS — a loja hoje",
    },
  ];
}

export const BEFORE_AFTER = {
  before: { ...ph("J"), alt: "ANTES — o começo" },
  after: { ...ph("A"), alt: "DEPOIS — a loja hoje" },
};

export const AMENITIES = [
  "60 lugares",
  "Climatizado",
  "Área externa",
  "Wi-Fi",
  "Estacionamento",
  "Acessível",
  "Espaço kids",
  "Pet friendly (área externa)",
];

export type GalleryPhoto = Photo & { caption: string; area: string };

export const GALLERY: GalleryPhoto[] = [
  { ...photo("photo-1587241321921-91a834d6d191", "Andy Li", "andylid0"), caption: "Salão principal", area: "a" },
  { ...photo("photo-1568254183919-78a4f43a2877", "Yeh Xintong", "blsnki"), caption: "Balcão e vitrine", area: "b" },
  { ...photo("photo-1534432182912-63863115e106", "Kirsten Drew", "k_drew"), caption: "Área externa", area: "c" },
  { ...photo("photo-1483695028939-5bb13f8648b0", "Mink Mingle", "minkmingle"), caption: "Mesa do café colonial", area: "d" },
  { ...photo("photo-1583338917451-face2751d8d5", "Ulysse Pointcheval", "ulysse_pcl"), caption: "Fachada", area: "e" },
];

export type Review = {
  name: string;
  initial: string;
  when: string;
  text: string;
};

export const REVIEWS: Review[] = [
  { name: "Mariana S.", initial: "M", when: "há 2 semanas", text: "O café colonial é impecável. Tudo fresquinho e o bolo de cenoura é o melhor da cidade." },
  { name: "Rafael T.", initial: "R", when: "há 1 mês", text: "Almoço aqui todo dia. Comida de verdade, preço justo e o pão das 16h vale a parada." },
  { name: "Cláudia P.", initial: "C", when: "há 3 meses", text: "Encomendei os doces do aniversário da minha filha. Chegou tudo lindo e no horário." },
  { name: "João V.", initial: "J", when: "há 4 meses", text: "Atendimento que faz a gente se sentir em casa. O pão de fermentação natural é viciante." },
];

export const ORDER_LINKS = [
  { label: "iFood", hint: "Delivery", href: "https://www.ifood.com.br", bg: "#C4472C", fg: "#FFFFFF" },
  { label: "99Food", hint: "Delivery", href: "https://99app.com/99food", bg: "#2B1A13", fg: "#F5EEE3" },
  { label: "WhatsApp", hint: "Encomende e retire na loja", href: COMPANY.whatsapp, bg: "#EAD9BF", fg: "#22150F" },
];

export const MODALS = {
  privacy: {
    title: "Política de privacidade",
    body: [
      { h: "Quais dados coletamos", p: "Apenas os dados que você nos envia (nome, telefone, e-mail) em formulários de encomenda e candidatura, além de dados de navegação anônimos." },
      { h: "Como usamos", p: "Para responder seu contato, processar encomendas, avaliar candidaturas e melhorar o site. Não vendemos seus dados." },
      { h: "Compartilhamento", p: "Somente com parceiros necessários à operação (ex.: plataformas de entrega), sempre dentro da LGPD." },
      { h: "Seus direitos", p: `Solicite acesso, correção ou exclusão dos seus dados pelo e-mail ${COMPANY.email}.` },
    ],
  },
  cookies: {
    title: "Política de cookies",
    body: [
      { h: "Essenciais", p: "Necessários para o site funcionar, como lembrar sua escolha de consentimento." },
      { h: "Análise", p: "Ajudam a entender, de forma anônima, quais páginas são mais visitadas." },
      { h: "Marketing", p: "Usados por redes sociais para mostrar conteúdos relevantes. Só com o seu aceite." },
    ],
  },
} as const;

export type ModalKey = keyof typeof MODALS;
