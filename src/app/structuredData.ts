import { BRAND, CITY, EMAIL, MAPS_LINK, SITE_URL, faqs, services } from "./content";

const PHONE_SCHEMA = "+55-19-98273-1890";

/** JSON-LD para o Google: empresa local + serviços, site e perguntas frequentes. */
export function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}#empresa`,
        name: BRAND,
        alternateName: "Duhelo Usinagem, Ferramentaria & Manutenção",
        description: `Usinagem de precisão em ${CITY}: peças sob desenho ou amostra, torneamento CNC, fresamento, produção em lote e recuperação de peças industriais.`,
        url: SITE_URL,
        logo: `${SITE_URL}images/duhelo-logo.png`,
        image: [
          `${SITE_URL}og-image.jpg`,
          `${SITE_URL}images/card-usinagem-customizada.jpg`,
          `${SITE_URL}images/card-fabricacao-metal.jpg`,
          `${SITE_URL}images/card-servicos-cnc.jpg`,
        ],
        telephone: PHONE_SCHEMA,
        email: EMAIL,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Santa Bárbara d'Oeste",
          addressRegion: "SP",
          addressCountry: "BR",
        },
        hasMap: MAPS_LINK,
        areaServed: {
          "@type": "City",
          name: "Santa Bárbara d'Oeste",
          containedInPlace: { "@type": "State", name: "São Paulo" },
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: PHONE_SCHEMA,
          contactType: "sales",
          availableLanguage: "Portuguese",
        },
        knowsAbout: [
          "Usinagem de precisão",
          "Torneamento CNC",
          "Fresamento",
          "Torno convencional",
          "Fabricação de peças sob desenho",
          "Recuperação de peças industriais",
          "Ferramentaria",
          "Manutenção industrial",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços de usinagem",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: service.title, description: service.description },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#site`,
        url: SITE_URL,
        name: BRAND,
        alternateName: "Duhelo",
        inLanguage: "pt-BR",
        publisher: { "@id": `${SITE_URL}#empresa` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}#duvidas`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };
}
