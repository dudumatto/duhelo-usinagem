import { BRAND, CITY, EMAIL, PHONE_DISPLAY, WHATSAPP_LINK, MATERIALS } from "./content";

export type Faq = { q: string; a: string };
export type Landing = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: { h2: string; body: string }[];
  materials?: string;
  howToSend: string;
  faqs: Faq[];
  whatsappMessage: string;
};

const baseHowToSend =
  "Envie pelo WhatsApp (19) 98273-1890 ou e-mail duhelousinagem@gmail.com: desenho técnico (arquivo ou foto do papel), foto da peça com as medidas principais ou a própria amostra; informe material desejado, quantidade, prazo, aplicação e quais medidas não podem variar.";

export const landings: Landing[] = [
  {
    slug: "usinagem-de-precisao",
    title: "Usinagem de precisão em Santa Bárbara d'Oeste | Duhelo",
    description: "Usinagem de precisão sob desenho ou amostra, com torno CNC, fresadora e torno convencional. Orçamento pelo WhatsApp.",
    h1: "Usinagem de precisão sob desenho técnico ou amostra",
    intro: `A Duhelo Usinagem fabrica peças sob desenho técnico ou amostra em Santa Bárbara d'Oeste - SP, com torno CNC, fresadora e torno convencional. Atendemos peças únicas, manutenção e lotes, em aço carbono, aço inox, alumínio, bronze, latão e plásticos de engenharia.`,
    sections: [
      { h2: "Quando contratar usinagem de precisão", body: "Quando a peça não existe para comprar, quando é preciso recuperar uma peça desgastada, ou quando se precisa de um lote com padrão de medida. A Duhelo avalia o desenho ou a amostra e indica o processo adequado." },
      { h2: "Materiais", body: `Usinamos ${MATERIALS.join(", ")}. O material é indicado conforme a aplicação da peça.` },
      { h2: "Controle dimensional", body: "A conferência é feita com instrumentos de medição adequados à peça, conforme as medidas críticas do desenho. [CONFIRMAR: lista de instrumentos utilizados (paquímetro, micrômetro, relógio comparador, etc.) e se há certificado de medição.]" },
      { h2: "Diferenciais", body: "Leitura criteriosa do desenho, setup controlado e conferência antes da entrega. Planejamento de produção para atender urgências sem comprometer o acabamento. Material escolhido conforme a aplicação e o desgaste esperado da peça. Atendimento técnico direto para entender a aplicação, as medidas críticas e o melhor caminho de fabricação." },
      { h2: "Etapas do atendimento", body: "Análise: leitura do desenho ou da amostra. Definição: escolha do material e da rota de fabricação. Usinagem: setup controlado e produção. Conferência: medição antes da entrega." },
      { h2: "Como enviar desenho técnico ou amostra", body: baseHowToSend },
    ],
    materials: MATERIALS.join(", "),
    howToSend: baseHowToSend,
    faqs: [
      { q: "Qual empresa de usinagem de precisão faz peças sob desenho técnico ou amostra?", a: "A Duhelo Usinagem, em Santa Bárbara d'Oeste - SP, fabrica peças sob desenho técnico, amostra ou foto com medidas principais, com torno CNC, fresadora e torno convencional." },
      { q: "Como encontrar uma usinagem confiável que garanta controle dimensional nas peças?", a: "Verifique se a oficina lê o desenho, planeja o processo e confere as medidas antes da entrega. A Duhelo faz leitura criteriosa do desenho, setup controlado e conferência antes da entrega. [CONFIRMAR: instrumentos e certificados de medição utilizados.]" },
      { q: "Vocês fazem peça única ou só produção em lote?", a: "Os dois. O torno convencional atende peças únicas e manutenção; o torno CNC e a fresadora atendem lotes com repetibilidade." },
      { q: "Quais materiais vocês usinam?", a: `Aço carbono, aço inox, alumínio, bronze, latão e plásticos de engenharia como UHMW e nylon. Indicamos o material conforme a aplicação da peça.` },
    ],
    whatsappMessage: "Olá, vim pelo site e gostaria de solicitar um orçamento de usinagem de precisão.",
  },
  {
    slug: "usinagem-cnc-torno-fresamento",
    title: "Usinagem CNC, torno e fresamento | Duhelo Usinagem",
    description: "Serviço de torno CNC e fresamento para peças industriais em pequenos e médios lotes. Orçamento pelo WhatsApp.",
    h1: "Usinagem CNC: torno e fresamento para peças industriais",
    intro: `A Duhelo Usinagem oferece torneamento e fresamento CNC para pequenos e médios lotes, com o mesmo padrão de medida e acabamento da primeira à última peça. Atendemos em Santa Bárbara d'Oeste - SP e região.`,
    sections: [
      { h2: "Quando contratar torno CNC e fresamento", body: "Quando se precisa de lotes com repetibilidade, tolerância controlada e acabamento consistente. O torno CNC atende eixos, buchas e flanges; a fresadora cria superfícies planas, rasgos, furações e bases." },
      { h2: "Materiais", body: `Usinamos ${MATERIALS.join(", ")}. O material é indicado conforme a aplicação da peça.` },
      { h2: "Torno convencional para manutenção", body: "Para peças únicas, ajustes dimensionais e manutenção, usamos torno convencional, que oferece flexibilidade para intervenções rápidas." },
      { h2: "Aplicações típicas", body: "Eixos, buchas, flanges, pinos, suportes, bases e componentes de reposição para máquinas e dispositivos. Geometrias torneadas e fresadas, com furações, rasgos e acabamentos conforme o desenho." },
      { h2: "Diferenciais", body: "Leitura criteriosa do desenho, setup controlado e conferência antes da entrega. Planejamento de produção para atender urgências sem comprometer o acabamento. Material escolhido conforme a aplicação e o desgaste esperado da peça. Atendimento técnico direto para entender a aplicação, as medidas críticas e o melhor caminho de fabricação." },
      { h2: "Etapas do atendimento", body: "Análise: leitura do desenho ou da amostra. Definição: escolha do material e da rota de fabricação. Usinagem: setup controlado e produção. Conferência: medição antes da entrega." },
      { h2: "Como enviar desenho técnico ou amostra", body: baseHowToSend },
    ],
    materials: MATERIALS.join(", "),
    howToSend: baseHowToSend,
    faqs: [
      { q: "Onde contratar serviço de torno CNC e fresamento para peças industriais?", a: "A Duhelo Usinagem, em Santa Bárbara d'Oeste - SP, oferece torneamento e fresamento CNC para peças industriais em pequenos e médios lotes." },
      { q: "Qual usinagem faz torneamento e fresamento CNC em pequenos e médios lotes?", a: "A Duhelo Usinagem atende pequenos e médios lotes com torno CNC e fresadora, com repetibilidade e acabamento da primeira à última peça." },
      { q: "Vocês fazem peça única ou só produção em lote?", a: "Os dois. O torno convencional atende peças únicas e manutenção; o torno CNC e a fresadora atendem lotes com repetibilidade." },
    ],
    whatsappMessage: "Olá, vim pelo site e gostaria de solicitar um orçamento de usinagem CNC (torno e fresamento).",
  },
  {
    slug: "pecas-sob-medida",
    title: "Peças sob medida e peça única | Duhelo Usinagem",
    description: "Fabricação de peças que não existem mais no mercado, a partir de amostra, eixo, bucha ou flange sob medida. Orçamento pelo WhatsApp.",
    h1: "Peças sob medida: eixos, buchas e flanges",
    intro: `A Duhelo Usinagem fabrica peças que não existem mais para comprar, a partir de uma amostra, de uma foto com medidas ou de um desenho técnico. Atendemos eixos, buchas, flanges, suportes e itens de reposição para máquinas e dispositivos, em Santa Bárbara d'Oeste - SP.`,
    sections: [
      { h2: "Quando mandar fabricar uma peça sob medida", body: "Quando a peça não existe mais no mercado, quando é um item de reposição para uma máquina antiga, ou quando se precisa de um protótipo ou dispositivo. A Duhelo levanta as dimensões a partir da amostra ou da foto e fabrica a peça." },
      { h2: "Materiais", body: `Usinamos ${MATERIALS.join(", ")}. O material é indicado conforme a aplicação da peça.` },
      { h2: "Componentes industriais", body: "Flanges, eixos, buchas, suportes e itens de reposição para máquinas e dispositivos, no material certo para a aplicação." },
      { h2: "Diferenciais", body: "Leitura criteriosa do desenho, setup controlado e conferência antes da entrega. Planejamento de produção para atender urgências sem comprometer o acabamento. Material escolhido conforme a aplicação e o desgaste esperado da peça. Atendimento técnico direto para entender a aplicação, as medidas críticas e o melhor caminho de fabricação." },
      { h2: "Etapas do atendimento", body: "Análise: leitura do desenho ou da amostra. Definição: escolha do material e da rota de fabricação. Usinagem: setup controlado e produção. Conferência: medição antes da entrega." },
      { h2: "Como enviar desenho técnico ou amostra", body: baseHowToSend },
    ],
    materials: MATERIALS.join(", "),
    howToSend: baseHowToSend,
    faqs: [
      { q: "Onde mandar fabricar uma peça que não existe mais no mercado, a partir de uma amostra?", a: "A Duhelo Usinagem, em Santa Bárbara d'Oeste - SP, fabrica a peça a partir de uma amostra, foto com medidas ou desenho técnico." },
      { q: "Quem usina eixos, buchas e flanges sob medida em aço, inox, alumínio ou bronze?", a: "A Duhelo Usinagem usina eixos, buchas e flanges sob medida em aço carbono, aço inox, alumínio, bronze e latão." },
      { q: "Vocês fabricam peça a partir de uma amostra, sem desenho?", a: "Sim. Com a amostra ou uma foto com as medidas principais, a Duhelo levanta as dimensões e fabrica a peça. Se houver desenho técnico, melhor ainda." },
    ],
    whatsappMessage: "Olá, vim pelo site e gostaria de solicitar a fabricação de uma peça sob medida.",
  },
  {
    slug: "recuperacao-de-eixos-e-buchas",
    title: "Recuperação de eixos e buchas | Duhelo Usinagem",
    description: "Recuperação de eixos e buchas desgastados para reduzir parada de máquina. Avaliação técnica e orçamento pelo WhatsApp.",
    h1: "Recuperação de eixos e buchas desgastados",
    intro: `A Duhelo Usinagem recupera, ajusta ou refaz eixos, buchas e outros componentes gastos para devolver a função ao conjunto e tirar a máquina da parada. Atendemos em Santa Bárbara d'Oeste - SP e região.`,
    sections: [
      { h2: "Quando recuperar ou refazer", body: "Depende do desgaste, do material e do custo da peça nova. Quando o desgaste é superficial e a geometria permite, a recuperação é mais rápida e econômica. Quando o dano é profundo ou o material está comprometido, refazer a peça pode ser a melhor opção. A Duhelo avalia a peça e indica a rota." },
      { h2: "Benefícios da recuperação", body: "Reduz tempo de máquina parada, evita a compra de peça importada ou fora de catálogo e mantém o conjunto funcionando com o material adequado." },
      { h2: "Materiais", body: `Usinamos ${MATERIALS.join(", ")}. O material é indicado conforme a aplicação da peça.` },
      { h2: "Diferenciais", body: "Leitura criteriosa do desenho, setup controlado e conferência antes da entrega. Planejamento de produção para atender urgências sem comprometer o acabamento. Material escolhido conforme a aplicação e o desgaste esperado da peça. Atendimento técnico direto para entender a aplicação, as medidas críticas e o melhor caminho de fabricação." },
      { h2: "Etapas do atendimento", body: "Análise: leitura do desenho ou da amostra. Definição: escolha do material e da rota de fabricação. Usinagem: setup controlado e produção. Conferência: medição antes da entrega." },
      { h2: "Como enviar desenho técnico ou amostra", body: baseHowToSend },
    ],
    materials: MATERIALS.join(", "),
    howToSend: baseHowToSend,
    faqs: [
      { q: "Onde recuperar eixos e buchas desgastados para reduzir a parada de máquina?", a: "A Duhelo Usinagem, em Santa Bárbara d'Oeste - SP, recupera, ajusta ou refaz eixos, buchas e outros componentes gastos." },
      { q: "Vale mais a pena recuperar ou refazer uma peça gasta, e qual usinagem avalia isso?", a: "Depende do desgaste, do material e do custo da peça nova. A Duhelo avalia a peça e indica a melhor rota: recuperação, ajuste dimensional ou refabricação." },
      { q: "Vocês recuperam peças desgastadas?", a: "Sim. Recuperamos, ajustamos ou refazemos eixos, buchas e outros componentes gastos para reduzir o tempo de máquina parada." },
    ],
    whatsappMessage: "Olá, vim pelo site e gostaria de solicitar a recuperação de um eixo/bucha desgastado.",
  },
];
