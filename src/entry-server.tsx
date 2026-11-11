import { renderToStaticMarkup } from "react-dom/server";
import { matchRoute, allRoutePaths } from "./app/router";
import { structuredDataFor } from "./app/structuredData";
import { BRAND, SITE_URL, services } from "./app/content";
import { blogDescription, getPost, posts } from "./app/blogPosts";
import { landings } from "./app/serviceLandings";

export { allRoutePaths };

export function routeMeta(route = "/"): { title: string; description: string; indexable?: boolean; article?: boolean } {
  if (route.startsWith("/servicos/")) {
    const slug = route.replace("/servicos/", "");
    const s = services.find((x) => x.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === slug);
    return { title: `${s?.title ?? "Serviço de usinagem"} | Duhelo Usinagem`, description: s?.description ?? "Serviço de usinagem de precisão em Santa Bárbara d'Oeste - SP." };
  }
  const landing = landings.find((l) => `/${l.slug}` === route);
  if (landing) return { title: landing.title, description: landing.description, indexable: landing.indexable };
  if (route === "/blog") return { title: "Blog de usinagem | Duhelo Usinagem", description: blogDescription };
  if (route === "/politica-de-privacidade") return { title: "Política de privacidade | Duhelo Usinagem", description: "Saiba como a Duhelo Usinagem trata seus dados pessoais e como exercer seus direitos de privacidade." };
  if (route.startsWith("/blog/")) {
    const post = getPost(route.slice("/blog/".length));
    if (post) return { title: post.seoTitle, description: post.description, article: true };
  }
  return { title: "Duhelo Usinagem", description: "Usinagem de precisão em Santa Bárbara d'Oeste - SP." };
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
  return `${feed}<script type="application/ld+json">${json}</script>`;
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
