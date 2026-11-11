import { renderToStaticMarkup } from "react-dom/server";
import { matchRoute, allRoutePaths } from "./app/router";
import { structuredDataFor } from "./app/structuredData";
import { ABOUT_DESCRIPTION, ABOUT_TITLE, BRAND, SITE_URL, services } from "./app/content";
import { blogDescription, getPost, posts } from "./app/blogPosts";
import { landings } from "./app/serviceLandings";

export { allRoutePaths, SITE_URL };

const pageDates: Record<string, string> = {
  "/": "2026-11-11",
  "/blog": "2026-11-11",
  "/sobre": "2026-11-11",
  "/politica-de-privacidade": "2026-11-11",
};
const blogLastModified = posts.reduce((latest, post) => post.updated > latest ? post.updated : latest, pageDates["/blog"]);

type RouteMeta = {
  title: string;
  description: string;
  lastModified?: string;
  indexable?: boolean;
  article?: boolean;
};

export function routeMeta(route = "/"): RouteMeta {
  if (route.startsWith("/servicos/")) {
    const slug = route.replace("/servicos/", "");
    const s = services.find((x) => x.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === slug);
    return { title: `${s?.title ?? "Serviço de usinagem"} | Duhelo Usinagem`, description: s?.description ?? "Serviço de usinagem de precisão em Santa Bárbara d'Oeste - SP." };
  }
  const landing = landings.find((l) => `/${l.slug}` === route);
  if (landing) return { title: landing.title, description: landing.description, indexable: landing.indexable, lastModified: landing.lastModified };
  if (route === "/blog") return { title: "Blog de usinagem | Duhelo Usinagem", description: blogDescription, lastModified: blogLastModified };
  if (route === "/sobre") return { title: ABOUT_TITLE, description: ABOUT_DESCRIPTION, lastModified: pageDates[route] };
  if (route === "/politica-de-privacidade") return { title: "Política de privacidade | Duhelo Usinagem", description: "Saiba como a Duhelo Usinagem trata seus dados pessoais e como exercer seus direitos de privacidade.", lastModified: pageDates[route] };
  if (route.startsWith("/blog/")) {
    const post = getPost(route.slice("/blog/".length));
    if (post) return { title: post.seoTitle, description: post.description, article: true, lastModified: post.updated };
  }
  return { title: BRAND, description: "Usinagem de precisão em Santa Bárbara d'Oeste - SP.", lastModified: pageDates[route] };
}

export function render(route = "/") {
  const m = matchRoute(route);
  if (!m) return "<p>Página não encontrada.</p>";
  return renderToStaticMarkup(m.render());
}

export function renderHead(route = "/") {
  const json = JSON.stringify(structuredDataFor(route)).replace(/</g, "\u003c");
  const feed = route === "/blog" || route.startsWith("/blog/")
    ? '<link rel="alternate" type="application/rss+xml" title="Blog da Duhelo Usinagem" href="/blog/feed.xml">'
    : "";
  return `<link rel="describedby" href="/llms.txt">${feed}<script type="application/ld+json">${json}</script>`;
}

export function renderBlogFeed() {
  const blogUrl = `${SITE_URL}blog`;
  const xml = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const items = posts.map((post) => {
    const url = `${blogUrl}/${post.slug}`;
    const pubDate = new Date(`${post.date}T00:00:00-03:00`).toUTCString();
    return `    <item>
      <title>${xml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${xml(post.description)}</description>
      <category>${xml(post.category.label)}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog da ${xml(BRAND)}</title>
    <link>${blogUrl}</link>
    <atom:link href="${blogUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${xml(blogDescription)}</description>
    <language>pt-br</language>
${items}
  </channel>
</rss>
`;
}
