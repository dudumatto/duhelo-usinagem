export const BRAND = "Duhelo Usinagem";
export const SITE_URL = "https://www.duhelousinagem.com.br/";
export const PHONE_DISPLAY = "(19) 98273-1890";
export const PHONE_E164 = "+5519982731890";
export const EMAIL = "duhelousinagem@gmail.com";
export const CITY = "Santa Bárbara d'Oeste - SP";
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
    title: "Peças sob desenho ou amostra",
    summary: "Peça fora de catálogo",
    description:
      "Fabricamos a peça a partir do desenho técnico, de uma amostra ou de uma foto com as medidas principais. Se não existe para comprar, a gente usina.",
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
      "Torneamento e fresamento CNC para pequenos e médios lotes, com o mesmo padrão de medida e acabamento da primeira à última peça.",
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
    title: "Recuperação de peças desgastadas",
    summary: "Manutenção para reduzir parada de máquina",
    description:
      "Recuperamos, ajustamos ou refazemos eixos, buchas e componentes gastos para devolver a função ao conjunto e tirar a máquina da parada.",
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
  { title: "Análise", text: "Leitura do desenho ou da amostra." },
  { title: "Definição", text: "Material e rota de fabricação." },
  { title: "Usinagem", text: "Setup controlado e produção." },
  { title: "Conferência", text: "Medição antes da entrega." },
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
    q: "Vocês fabricam peça a partir de uma amostra, sem desenho?",
    a: "Sim. Com a amostra ou uma foto com as medidas principais, a Duhelo levanta as dimensões e fabrica a peça. Se houver desenho técnico, melhor ainda.",
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
    q: "Vocês recuperam peças desgastadas?",
    a: "Sim. Recuperamos, ajustamos ou refazemos eixos, buchas e outros componentes gastos para reduzir o tempo de máquina parada.",
  },
  {
    q: "Como peço um orçamento de usinagem?",
    a: "Pelo WhatsApp (19) 98273-1890 ou pelo e-mail duhelousinagem@gmail.com. Envie desenho, foto ou amostra, material, quantidade e onde a peça trabalha.",
  },
  {
    q: "Onde fica a Duhelo Usinagem?",
    a: "Em Santa Bárbara d'Oeste - SP. Para entregas e retiradas em outras cidades, consulte pelo WhatsApp.",
  },
];

export const navLinks = [
  ["Serviços", "#servicos"],
  ["Orçamento", "#orcamento"],
  ["Estrutura", "#estrutura"],
  ["Dúvidas", "#duvidas"],
  ["Contato", "#contato"],
] as const;
