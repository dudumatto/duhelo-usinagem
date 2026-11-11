import { BRAND, CITY, EMAIL, PHONE_DISPLAY } from "./content";
import { localLandings } from "./localLandings";

export type Faq = { q: string; a: string };
export type Landing = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: { h2: string; body: string }[];
  howToSend: string;
  faqs: Faq[];
  relatedPostSlugs: string[];
  indexable?: boolean;
  whatsappMessage: string;
};

const precisionHowToSend =
  `Envie o desenho pelo WhatsApp ${PHONE_DISPLAY} ou por e-mail para ${EMAIL}. Indique a revisão do arquivo, as dimensões que definem o encaixe e a quantidade. Se tiver apenas a amostra, envie fotos de mais de um ângulo e explique em que máquina ela trabalha. Combine pelo mesmo canal como apresentar a peça física quando for preciso avaliá-la.`;

const cncHowToSend =
  `Envie pelo WhatsApp ${PHONE_DISPLAY} ou por e-mail para ${EMAIL} o desenho, as tolerâncias especificadas e a quantidade por pedido. Informe se existe uma primeira peça para aprovar e se o lote vai se repetir. Se o orçamento partir de amostra, mande fotos que mostrem as superfícies torneadas e fresadas, como o diâmetro externo e um eventual rasgo lateral.`;

const customHowToSend =
  `Mande o desenho ou fotos da amostra pelo WhatsApp ${PHONE_DISPLAY} ou por e-mail para ${EMAIL}. Mostre a peça inteira e os detalhes de encaixe, como furos, roscas e rasgos. Se fotografar com uma régua ao lado, use-a para dar escala. Informe a função da peça, o material, se souber, e a quantidade desejada. Combine a entrega da amostra pelo mesmo canal.`;

const recoveryHowToSend =
  `Envie fotos da peça inteira e da área afetada pelo WhatsApp ${PHONE_DISPLAY} ou por e-mail para ${EMAIL}. Descreva a máquina, os sintomas observados e a urgência. Se houver desenho, inclua a revisão que corresponde à peça instalada. Informe também se o componente está disponível para avaliação e se existe uma peça de referência ou um código de reposição.`;

export const landings: Landing[] = [
  {
    slug: "usinagem-de-precisao",
    title: "Usinagem de precisão sob desenho ou amostra | Duhelo",
    description: "Usinagem de precisão em Santa Bárbara d'Oeste para fabricar peças sob desenho ou amostra, com atenção às medidas de encaixe.",
    h1: "Usinagem de precisão sob desenho técnico ou amostra",
    intro: `A ${BRAND} fabrica peças sob desenho técnico ou amostra em ${CITY}. O serviço atende componentes únicos, reposições para manutenção e lotes. Para começar o orçamento, envie a referência da peça e indique quais medidas afetam a montagem ou o funcionamento.`,
    sections: [
      {
        h2: "Quando contratar usinagem de precisão?",
        body: "Quando a peça precisa encaixar em um conjunto existente, manter a posição de um componente ou ser substituída em lote sem mudar a montagem. O diâmetro de um assento de rolamento, a distância entre os furos de uma flange e a posição de um rasgo são exemplos de características que podem interferir no funcionamento. Uma peça fora de catálogo também pode servir de referência para orçar uma nova.",
      },
      {
        h2: "Quais medidas e tolerâncias devem constar no desenho?",
        body: "Uma tolerância especifica a variação aceitável para uma característica. A cota nominal indica o valor de referência, e a tolerância informa os limites ou a condição que a peça deve atender. Vale destacar as superfícies de apoio, os diâmetros de encaixe e outras medidas que afetam a montagem. Se o desenho indicar acabamento superficial ou referências geométricas, inclua essas informações no arquivo enviado.",
      },
      {
        h2: "Como avaliar o controle dimensional de uma oficina?",
        body: "Peça que a oficina confirme a revisão do desenho e as medidas de aceitação antes de fechar o orçamento. Pergunte como as características críticas podem ser conferidas e combine com antecedência se a compra exige algum registro dimensional. Em um pedido recorrente, definir a mesma referência de medição e o critério de aceitação facilita a comparação entre lotes e ajuda a evitar divergências na entrega.",
      },
      {
        h2: "Materiais para peças de precisão",
        body: "A Duhelo usina aço carbono, aço inox, alumínio, bronze, latão, UHMW e nylon. O material precisa acompanhar a função da peça. Um assento de rolamento e uma guia de deslizamento, por exemplo, têm exigências diferentes. Quando o desenho indicar uma liga ou condição específica, envie a especificação completa. Para substituir uma peça existente, informe o material original, se souber.",
      },
    ],
    howToSend: precisionHowToSend,
    faqs: [
      {
        q: "Qual empresa de usinagem de precisão faz peças sob desenho técnico ou amostra?",
        a: `A ${BRAND}, em ${CITY}, fabrica peças únicas e lotes sob desenho ou amostra. Se você tiver uma peça usada, envie fotos e indique os pontos de encaixe para iniciar o orçamento.`,
      },
      {
        q: "O que fazer se só tiver uma peça desgastada como referência?",
        a: "Informe onde está o desgaste e como a peça se encaixa no conjunto. Um diâmetro já gasto pode diferir da medida de fabricação. O desenho original ou uma peça equivalente em bom estado ajuda a definir a dimensão de reposição.",
      },
      {
        q: "A mesma medida serve para qualquer montagem?",
        a: "A montagem define a necessidade de folga ou interferência. Informe se a peça precisa girar, deslizar ou ficar fixa no conjunto. Quando a aplicação exigir uma tolerância específica, identifique essa exigência no desenho ou no pedido.",
      },
    ],
    relatedPostSlugs: ["o-que-e-usinagem-e-como-ela-funciona", "usinagem-convencional-e-cnc-qual-a-diferenca"],
    whatsappMessage: "Olá, vi a página de usinagem de precisão e gostaria de um orçamento para uma peça.",
  },
  {
    slug: "usinagem-cnc-torno-fresamento",
    title: "Torneamento CNC e fresamento | Duhelo Usinagem",
    description: "Serviços de torneamento CNC e fresamento em Santa Bárbara d'Oeste para componentes industriais sob desenho, peça única ou lote.",
    h1: "Torneamento CNC e fresamento de peças industriais",
    intro: `A ${BRAND} oferece torneamento CNC e serviços de fresamento em ${CITY}. Atendemos componentes industriais sob desenho e pedidos em lote. O processo depende das formas que a peça precisa ter, das medidas de encaixe e da quantidade.`,
    sections: [
      {
        h2: "Quando contratar torneamento CNC?",
        body: "O torneamento é indicado para formar diâmetros, faces e outros elementos em torno do eixo da peça. A peça gira e a ferramenta remove material para formar a geometria prevista no desenho. Eixos escalonados, buchas e flanges são exemplos de aplicações. Um programa CNC permite repetir a sequência de corte em um lote. As tolerâncias e o acabamento continuam sendo definidos conforme os requisitos da peça.",
      },
      {
        h2: "Quando a peça precisa de fresamento?",
        body: "No fresamento, a ferramenta de corte gira para produzir superfícies planas, rasgos, rebaixos ou contornos. É um processo útil em peças como bases e suportes. Uma peça cilíndrica também pode precisar dos dois processos. Em um eixo com rasgo de chaveta, por exemplo, o torneamento forma os diâmetros e o fresamento pode abrir o rasgo no local indicado pelo desenho.",
      },
      {
        h2: "Como especificar um lote de peças usinadas?",
        body: "Informe quantas peças precisa agora e se haverá compras recorrentes. Para itens que entram na mesma montagem, identifique as superfícies de referência, as tolerâncias que precisam se repetir e a revisão válida do desenho. Se o seu processo de compra exigir uma peça inicial para aprovação, comunique isso no orçamento. Esses dados ajudam a comparar propostas com a mesma quantidade e os mesmos critérios de aceitação.",
      },
      {
        h2: "Materiais para torno e fresa",
        body: "A oficina trabalha com aço carbono, aço inox, alumínio, bronze, latão, UHMW e nylon. Informe a liga ou classe quando estiver especificada. Uma peça em alumínio para um dispositivo leve e um eixo em aço para reposição industrial têm requisitos próprios. Na dúvida sobre o material, descreva a aplicação e qualquer exigência de resistência, acabamento ou contato com outros componentes.",
      },
    ],
    howToSend: cncHowToSend,
    faqs: [
      {
        q: "Onde contratar serviço de torno CNC e fresamento para peças industriais?",
        a: `A ${BRAND}, em ${CITY}, presta serviços de torneamento CNC e fresamento. Envie o desenho ou a amostra e informe a quantidade para que a oficina avalie o pedido.`,
      },
      {
        q: "A Duhelo recebe pedidos de lotes pequenos ou médios?",
        a: "A Duhelo recebe pedidos em lote. A viabilidade depende da quantidade, do material e das operações previstas no desenho. Informe a quantidade de cada item para cotar o conjunto do pedido.",
      },
      {
        q: "Uma mesma peça pode passar pelo torno e pela fresadora?",
        a: "Sim. Uma flange pode ter faces e diâmetros torneados e também precisar de um rebaixo fresado. A sequência depende da geometria e das referências de montagem descritas no desenho.",
      },
    ],
    relatedPostSlugs: ["usinagem-convencional-e-cnc-qual-a-diferenca", "o-que-e-usinagem-e-como-ela-funciona"],
    whatsappMessage: "Olá, vi a página de torneamento CNC e fresamento e gostaria de solicitar um orçamento.",
  },
  {
    slug: "pecas-sob-medida",
    title: "Peças sob medida e peça única | Duhelo Usinagem",
    description: "Fabricação de eixos, buchas, flanges e peças sob medida em Santa Bárbara d'Oeste, a partir de desenho técnico ou amostra.",
    h1: "Peças sob medida a partir de desenho ou amostra",
    intro: `A ${BRAND} fabrica peças sob medida em ${CITY}, inclusive componentes únicos de reposição. Você pode enviar o desenho técnico ou apresentar uma amostra de eixo, bucha, flange ou outro componente industrial para iniciar a avaliação.`,
    sections: [
      {
        h2: "Quando mandar fabricar uma peça sob medida?",
        body: "A fabricação sob medida é uma opção para reposição de uma máquina antiga, para uma peça fora de catálogo ou para adaptar um componente a um dispositivo. O orçamento pode começar mesmo quando você dispõe apenas da peça usada. Informe o modelo da máquina, o ponto de montagem e se a reposição precisa ser igual ao componente original ou se o conjunto já sofreu alguma alteração.",
      },
      {
        h2: "O que ajuda a fabricar uma peça a partir de amostra?",
        body: "Identifique as partes que encostam, apoiam ou prendem outros componentes. Em uma bucha, o diâmetro interno pode guiar um eixo, enquanto o externo precisa se ajustar ao alojamento. Em um flange, o espaçamento dos furos e a face de apoio ajudam a definir a montagem. Uma peça usada pode ter medidas alteradas pelo desgaste. Fotos, desenho antigo ou uma segunda amostra em bom estado ajudam a esclarecer esses pontos.",
      },
      {
        h2: "O que incluir quando a peça é nova ou foi modificada?",
        body: "Se você já tem um desenho, envie todas as vistas, indique as unidades e destaque o que mudou em relação à peça anterior. Para uma adaptação, é importante informar as dimensões disponíveis na máquina, a posição das fixações e o que a peça precisa fazer. Um croqui inicial ajuda a explicar o pedido. As dimensões críticas devem ser definidas antes da fabricação.",
      },
      {
        h2: "Materiais para reposição sob medida",
        body: "A Duhelo usina aço carbono, aço inox, alumínio, bronze, latão, UHMW e nylon. Informe a especificação quando ela já existir. Buchas, eixos e flanges podem ter funções diferentes em um mesmo conjunto, por isso o material da reposição depende da aplicação. Se houver contato com um eixo, atrito contínuo ou exposição a umidade, descreva essas condições ao pedir orçamento.",
      },
    ],
    howToSend: customHowToSend,
    faqs: [
      {
        q: "Onde mandar fabricar uma peça fora de catálogo a partir de amostra?",
        a: `A ${BRAND} fabrica peças sob medida em ${CITY}. Envie fotos da peça e conte onde ela trabalha. Uma amostra física pode ser necessária para esclarecer detalhes de montagem.`,
      },
      {
        q: "Quem fabrica eixos, buchas e flanges sob medida em aço, inox, alumínio ou bronze?",
        a: "A Duhelo fabrica esses componentes sob medida e trabalha com aço carbono, aço inox, alumínio e bronze. A combinação de material, geometria e medidas é avaliada para cada pedido.",
      },
      {
        q: "É possível pedir uma única peça?",
        a: "Sim. A Duhelo atende peças únicas de reposição e componentes sob desenho. Indique a quantidade no orçamento e avise se você poderá precisar do mesmo item em outro momento.",
      },
    ],
    relatedPostSlugs: ["o-que-e-usinagem-e-como-ela-funciona", "recuperacao-de-eixos-e-buchas-desgastados"],
    whatsappMessage: "Olá, vi a página de peças sob medida e gostaria de orçar a fabricação de uma peça.",
  },
  {
    slug: "recuperacao-de-eixos-e-buchas",
    title: "Recuperação de eixos e buchas | Duhelo Usinagem",
    description: "Recuperação, ajuste ou refabricação de eixos e buchas desgastados para manutenção industrial em Santa Bárbara d'Oeste.",
    h1: "Recuperação de eixos e buchas desgastados",
    intro: `A ${BRAND}, em ${CITY}, recupera, ajusta ou refaz eixos, buchas e outros componentes para manutenção industrial. Envie fotos da peça gasta e explique onde ela trabalha. A decisão entre recuperar e fabricar uma reposição depende do desgaste, do encaixe e da função do componente.`,
    sections: [
      {
        h2: "Quando contratar recuperação de eixos e buchas?",
        body: "Peça uma avaliação quando houver folga crescente, marcas de desgaste ou dificuldade de manter o encaixe. Em um eixo, a área de apoio de um rolamento ou de uma bucha pode concentrar o desgaste. Em uma bucha, a alteração do diâmetro interno pode afetar a folga em relação ao eixo. Conte onde percebeu o problema e, se possível, mostre também o componente que trabalha em contato com a peça.",
      },
      {
        h2: "Quando compensa recuperar e quando é melhor refazer?",
        body: "Compare as dimensões afetadas com as exigências da montagem. Um desgaste localizado pode admitir um ajuste se a geometria e o estado da peça permitirem. Dano extenso, trinca, deformação ou incerteza sobre a integridade do componente exigem avaliação antes de qualquer decisão. Considere também o prazo e a disponibilidade de uma peça nova. O orçamento pode indicar se faz sentido ajustar a peça atual ou fabricar outra.",
      },
      {
        h2: "Quais informações ajudam a avaliar o conjunto?",
        body: "Informe se o eixo gira, se a bucha guia movimento ou se a peça serve de apoio fixo. Anote quando surgiu a folga e se houve troca de rolamento, travamento ou outro problema no conjunto. Caso tenha desenho ou código do fabricante, envie a referência. Ao comparar uma peça usada com as dimensões de projeto, considere que o desgaste pode ter mudado a medida original.",
      },
      {
        h2: "Materiais na manutenção e na reposição",
        body: "Para fabricar componentes de reposição, a oficina trabalha com aço carbono, aço inox, alumínio, bronze, latão, UHMW e nylon. Identifique o material original, se conhecido, e descreva condições como carga, contato entre peças e lubrificação. Quando a máquina exigir uma liga ou condição específica, inclua essa informação no pedido. A possibilidade de recuperar o componente existente depende da avaliação da peça.",
      },
    ],
    howToSend: recoveryHowToSend,
    faqs: [
      {
        q: "Onde recuperar eixos e buchas desgastados?",
        a: `A ${BRAND} avalia a recuperação, o ajuste e a refabricação desses componentes em ${CITY}. Envie fotos e explique como a peça se encaixa no conjunto para iniciar a conversa.`,
      },
      {
        q: "Uma foto basta para decidir entre recuperação e refabricação?",
        a: "A foto ajuda a localizar o desgaste e a entender o pedido. Para avaliar a possibilidade de recuperar, pode ser necessário medir a peça física e comparar as dimensões com o desenho ou o componente correspondente.",
      },
      {
        q: "É possível refazer uma peça gasta que saiu de linha?",
        a: "Sim, a Duhelo fabrica peças sob medida a partir de desenho ou amostra. Se a amostra estiver muito desgastada, envie também qualquer referência de encaixe, como as medidas do alojamento ou de uma peça equivalente.",
      },
    ],
    relatedPostSlugs: ["recuperacao-de-eixos-e-buchas-desgastados"],
    whatsappMessage: "Olá, vi a página de recuperação de eixos e buchas e gostaria de avaliar uma peça desgastada.",
  },
  ...localLandings,
];
