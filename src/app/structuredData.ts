import { BRAND, CITY, EMAIL, MAPS_LINK, SITE_URL, faqs, services } from "./content";
import { posts } from "./blogPosts";
import { landings } from "./serviceLandings";

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
        makesOffer: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: { "@id": `${SITE_URL}#empresa` },
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
        { "@type": "LocalBusiness", "@id": `${SITE_URL}#empresa`, name: BRAND, url: SITE_URL, telephone: "+55-19-98273-1890", email: EMAIL, address: { "@type": "PostalAddress", addressLocality: "Santa Bárbara d'Oeste", addressRegion: "SP", addressCountry: "BR" }, areaServed: { "@type": "City", name: "Santa Bárbara d'Oeste", containedInPlace: { "@type": "State", name: "São Paulo" } } },
        crumbs([{ name: "Início", url: `${base}/` }, { name: "Serviços", url: `${base}/#servicos` }, { name: service?.title ?? "Serviço", url }]),
        ...(service ? [{ "@type": "Service", name: service.title, description: service.description, provider: { "@id": `${SITE_URL}#empresa` }, url }] : []),
      ],
    };
  }

  const landing = landings.find((l) => `/${l.slug}` === route);
  if (landing) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "LocalBusiness", "@id": `${SITE_URL}#empresa`, name: BRAND, url: SITE_URL, telephone: "+55-19-98273-1890", email: EMAIL, address: { "@type": "PostalAddress", addressLocality: "Santa Bárbara d'Oeste", addressRegion: "SP", addressCountry: "BR" }, areaServed: { "@type": "City", name: "Santa Bárbara d'Oeste", containedInPlace: { "@type": "State", name: "São Paulo" } } },
        crumbs([{ name: "Início", url: `${base}/` }, { name: landing.h1, url }]),
        { "@type": "Service", name: landing.h1, description: landing.description, provider: { "@id": `${SITE_URL}#empresa` }, url },
        { "@type": "FAQPage", mainEntity: landing.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      ],
    };
  }

  if (route === "/blog") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "LocalBusiness", "@id": `${SITE_URL}#empresa`, name: BRAND, url: SITE_URL },
        crumbs([{ name: "Início", url: `${base}/` }, { name: "Blog", url }]),
      ],
    };
  }

  if (route.startsWith("/blog/")) {
    const slug = route.replace("/blog/", "");
    const post = posts.find((p) => p.slug === slug);
    return {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "LocalBusiness", "@id": `${SITE_URL}#empresa`, name: BRAND, url: SITE_URL },
        crumbs([{ name: "Início", url: `${base}/` }, { name: "Blog", url: `${base}/blog` }, { name: post?.title ?? "Artigo", url }]),
        ...(post ? [{ "@type": "Article", headline: post.title, description: post.description, datePublished: post.date, author: { "@type": "Organization", name: BRAND }, publisher: { "@id": `${SITE_URL}#empresa` }, mainEntityOfPage: url }] : []),
      ],
    };
  }

  return structuredData();
}
