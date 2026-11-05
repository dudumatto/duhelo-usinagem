import { renderToStaticMarkup } from "react-dom/server";
import { matchRoute, allRoutePaths } from "./app/router";
import { structuredDataFor } from "./app/structuredData";
import { services } from "./app/content";
import { posts } from "./app/blogPosts";

export { allRoutePaths };

export function routeMeta(route = "/") {
  if (route === "/") return { title: "Usinagem de precisão em Santa Bárbara d'Oeste | Duhelo", description: "Usinagem de precisão em Santa Bárbara d'Oeste - SP: peças sob desenho ou amostra, torno CNC, fresamento, lotes e recuperação de peças industriais. Orçamento pelo WhatsApp." };
  if (route.startsWith("/servicos/")) {
    const slug = route.replace("/servicos/", "");
    const s = services.find((x) => x.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === slug);
    return { title: `${s?.title ?? "Serviço de usinagem"} | Duhelo Usinagem`, description: s?.description ?? "Serviço de usinagem de precisão em Santa Bárbara d'Oeste - SP." };
  }
  if (route === "/blog") return { title: "Blog de usinagem | Duhelo Usinagem", description: "Artigos técnicos sobre usinagem, processos e manutenção de peças industriais." };
  if (route.startsWith("/blog/")) {
    const slug = route.replace("/blog/", "");
    const p = posts.find((x) => x.slug === slug);
    return { title: `${p?.title ?? "Artigo"} | Duhelo Usinagem`, description: p?.description ?? "Artigo sobre usinagem." };
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
  return `<script type="application/ld+json">${json}</script>`;
}