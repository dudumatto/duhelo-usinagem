import { BRAND, CITY, CITY_NAME, CITY_REGION, EMAIL, MAPS_LINK, PHONE_E164, SITE_URL, faqs, services } from "./content";
import { getPost } from "./blogPosts";
import { landings } from "./serviceLandings";

const business = {
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#business`,
  name: BRAND,
  url: SITE_URL,
  telephone: PHONE_E164,
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: CITY_NAME,
    addressRegion: CITY_REGION,
    addressCountry: "BR",
  },
  areaServed: {
    "@type": "City",
    name: CITY_NAME,
    containedInPlace: { "@type": "State", name: "São Paulo" },
  },
};

/** JSON-LD para o Google: empresa local + serviços, site e perguntas frequentes. */
export function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...business,
        alternateName: "Duhelo Usinagem, Ferramentaria & Manutenção",
        description: `Usinagem de precisão em ${CITY}. Fabricação de peças sob desenho ou amostra e recuperação de componentes desgastados para manutenção industrial.`,
        logo: `${SITE_URL}images/duhelo-logo.png`,
        image: [
          `${SITE_URL}og-image.jpg`,
          `${SITE_URL}images/card-usinagem-customizada.jpg`,
          `${SITE_URL}images/card-fabricacao-metal.jpg`,
          `${SITE_URL}images/card-servicos-cnc.jpg`,
        ],
        hasMap: MAPS_LINK,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: PHONE_E164,
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
        makesOffer: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: { "@id": `${SITE_URL}#business` },
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#site`,
        url: SITE_URL,
        name: BRAND,
        alternateName: "Duhelo",
        inLanguage: "pt-BR",
        publisher: { "@id": `${SITE_URL}#business` },
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

export function structuredDataFor(route: string) {
  const base = SITE_URL.replace(/\/$/, "");
  const url = `${base}${route === "/" ? "/" : route}`;
  const crumbs = (items: { name: string; url: string }[]) => ({
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  });

  if (route === "/") return structuredData();

  if (route.startsWith("/servicos/")) {
    const slug = route.replace("/servicos/", "");
    const service = services.find((s) => s.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === slug);
    return {
      "@context": "https://schema.org",
      "@graph": [
        business,
        crumbs([{ name: "Início", url: `${base}/` }, { name: "Serviços", url: `${base}/#servicos` }, { name: service?.title ?? "Serviço", url }]),
        ...(service ? [{ "@type": "Service", name: service.title, description: service.description, provider: { "@id": `${SITE_URL}#business` }, url }] : []),
      ],
    };
  }

  const landing = landings.find((l) => `/${l.slug}` === route);
  if (landing) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        business,
        crumbs([{ name: "Início", url: `${base}/` }, { name: "Serviços", url: `${base}/#servicos` }, { name: landing.h1, url }]),
        ...(landing.indexable === false ? [] : [{ "@type": "Service", name: landing.h1, description: landing.description, provider: { "@id": `${SITE_URL}#business` }, url }]),
        { "@type": "FAQPage", mainEntity: landing.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      ],
    };
  }

  if (route === "/politica-de-privacidade") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        business,
        crumbs([{ name: "Início", url: `${base}/` }, { name: "Política de privacidade", url }]),
      ],
    };
  }

  if (route === "/blog") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        business,
        crumbs([{ name: "Início", url: `${base}/` }, { name: "Blog", url }]),
      ],
    };
  }

  if (route.startsWith("/blog/")) {
    const slug = route.replace("/blog/", "");
    const post = getPost(slug);
    const blogCrumbs = [{ name: "Início", url: `${base}/` }, { name: "Blog", url: `${base}/blog` }];
    return {
      "@context": "https://schema.org",
      "@graph": [
        business,
        crumbs(post ? [...blogCrumbs, { name: post.category.label, url: `${base}/blog#${post.category.slug}` }, { name: post.title, url }] : blogCrumbs),
        ...(post ? [{
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated,
          articleSection: post.category.label,
          keywords: post.keyword,
          inLanguage: "pt-BR",
          timeRequired: `PT${post.readingMinutes}M`,
          author: { "@id": `${SITE_URL}#business` },
          publisher: { "@id": `${SITE_URL}#business` },
          mainEntityOfPage: url,
        }] : []),
      ],
    };
  }

  return structuredData();
}
