export const BRAND = "Duhelo Usinagem";
export const SITE_URL = "https://www.duhelousinagem.com.br/";
export const PHONE_DISPLAY = "(19) 98273-1890";
export const PHONE_E164 = "+5519982731890";
export const EMAIL = "duhelousinagem@gmail.com";
export const CITY_NAME = "Santa Bárbara d'Oeste";
export const CITY_REGION = "SP";
export const CITY = `${CITY_NAME} - ${CITY_REGION}`;
export const MAPS_LINK = "https://maps.app.goo.gl/SHM2J7MtngiJCkLA8";
export const WHATSAPP_LINK =
  "https://wa.me/5519982731890?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20usinagem.";

export const MATERIALS = ["Aço carbono", "Aço inox", "Alumínio", "Bronze", "Latão", "UHMW", "Nylon"];

export type Service = {
  item: number;
  title: string;
  summary: string;
  description: string;
  notes: string[];
  photo?: { name: string; alt: string; position?: string };
};

export const services: Service[] = [
  {
    item: 1,
    title: "Usinagem de precisão sob desenho ou amostra",
    summary: "Peça fora de catálogo",
    description:
      "Fabricamos peças sob medida a partir de desenho técnico ou amostra, inclusive peças únicas fora de catálogo. Para iniciar o orçamento, envie a referência da peça e as medidas disponíveis.",
    notes: ["Peças especiais e únicas", "Controle dimensional"],
    photo: {
      name: "card-servicos-cnc",
      alt: "Duas buchas de aço usinadas sob medida com rasgo de chaveta, sobre bancada escura",
    },
  },
  {
    item: 2,
    title: "Usinagem CNC em lote",
    summary: "Produção com repetibilidade",
    description:
      "Serviços de torneamento CNC e fresamento para peças industriais. Informe a quantidade, as medidas críticas e o acabamento necessário para o orçamento do lote.",
    notes: ["Torno CNC", "Fresamento", "Lotes com padrão"],
    photo: {
      name: "card-fabricacao-metal",
      alt: "Lote de eixos, buchas e pinos de aço usinados em CNC organizados sobre a bancada",
    },
  },
  {
    item: 3,
    title: "Componentes industriais sob medida",
    summary: "Para máquinas, dispositivos e protótipos",
    description:
      "Flanges, eixos, buchas, suportes e itens de reposição para máquinas e dispositivos, no material certo para a aplicação.",
    notes: ["Reposição de máquinas", "Dispositivos", "Protótipos"],
  },
  {
    item: 4,
    title: "Manutenção e recuperação de peças desgastadas",
    summary: "Manutenção para reduzir parada de máquina",
    description:
      "Recuperamos, ajustamos ou refazemos eixos, buchas e outros componentes gastos. A escolha depende do desgaste e da função da peça na máquina.",
    notes: ["Recuperação", "Ajustes dimensionais", "Reforma mecânica"],
  },
];

export const quoteNotes = [
  {
    title: "Envie a referência da peça",
    text: "Desenho técnico (arquivo ou foto do papel), foto da peça com as medidas principais ou a própria amostra.",
  },
  {
    title: "Diga como ela trabalha",
    text: "Material desejado, quantidade, prazo, onde a peça é aplicada e quais medidas não podem variar.",
  },
  {
    title: "Receba a orientação e o orçamento",
    text: "A Duhelo avalia processo, material e conferência necessária e retorna com o orçamento. Se faltar alguma informação, confirmamos antes de produzir.",
  },
];

export const technicalChecks = [
  "Medidas críticas",
  "Tolerância necessária",
  "Material adequado",
  "Acabamento esperado",
  "Aplicação da peça",
  "Conferência antes da entrega",
];

export const equipment = [
  {
    name: "Torno CNC",
    use: "Eixos, buchas, flanges e componentes torneados com repetibilidade e acabamento.",
  },
  {
    name: "Fresadora",
    use: "Superfícies planas, rasgos, furações, bases, suportes e geometrias especiais.",
  },
  {
    name: "Torno convencional",
    use: "Manutenção, ajustes dimensionais, peças únicas e pequenos lotes.",
  },
];

export const processSteps = [
  { title: "Referência", text: "Envie o desenho técnico ou uma foto da amostra ou da peça gasta." },
  { title: "Aplicação", text: "Informe a função da peça, as medidas críticas e a quantidade." },
  { title: "Orçamento", text: "Converse com a Duhelo pelo WhatsApp sobre a peça e o serviço." },
  { title: "Serviço", text: "Fabricação sob medida ou recuperação para manutenção, conforme a peça." },
];

export const differentiators = [
  {
    title: "Controle dimensional",
    text: "Leitura criteriosa do desenho, setup controlado e conferência antes da entrega.",
  },
  {
    title: "Prazo responsável",
    text: "Planejamento de produção para atender urgências sem comprometer o acabamento.",
  },
  {
    title: "Material adequado",
    text: "Processo e material escolhidos conforme a aplicação e o desgaste esperado da peça.",
  },
  {
    title: "Atendimento técnico direto",
    text: "Contato direto para entender a aplicação, as medidas críticas e o melhor caminho de fabricação.",
  },
];

export const faqs = [
  {
    q: "Onde mandar usinar uma peça sob desenho ou amostra?",
    a: `A ${BRAND}, em ${CITY}, fabrica peças sob medida a partir de desenho técnico ou amostra, inclusive peças únicas fora de catálogo. Para começar o orçamento, envie o desenho ou fotos com as medidas disponíveis.`,
  },
  {
    q: "Vale a pena recuperar ou refazer um eixo ou uma bucha gasta?",
    a: "A escolha depende do desgaste e da função da peça. A Duhelo recupera, ajusta ou refaz eixos, buchas e outros componentes. Para avaliar o caso, envie fotos, informe onde a peça trabalha e indique as medidas que afetam o encaixe.",
  },
  {
    q: "Quais materiais vocês usinam?",
    a: "Aço carbono, aço inox, alumínio, bronze, latão e plásticos de engenharia como UHMW e nylon. Indicamos o material conforme a aplicação da peça.",
  },
  {
    q: "Fazem peça única ou só produção em lote?",
    a: "Os dois. O torno convencional atende peças únicas e manutenção; o torno CNC e a fresadora atendem lotes com repetibilidade.",
  },
  {
    q: "Como peço um orçamento de usinagem?",
    a: `Pelo WhatsApp ${PHONE_DISPLAY} ou pelo e-mail ${EMAIL}. Envie o desenho ou fotos da amostra ou da peça gasta e informe material, quantidade e aplicação, se disponíveis.`,
  },
  {
    q: "Onde fica a Duhelo Usinagem?",
    a: `Em ${CITY}. Para combinar o envio ou a retirada de uma peça, fale com a Duhelo pelo WhatsApp.`,
  },
];

export const navLinks = [
  ["Serviços", "#servicos"],
  ["Orçamento", "#orcamento"],
  ["Estrutura", "#estrutura"],
  ["Dúvidas", "#duvidas"],
  ["Contato", "#contato"],
] as const;
