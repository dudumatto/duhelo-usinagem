import App from "./App";
import { ServicePage } from "./pages/ServicePage";
import { ServiceLandingPage } from "./pages/ServiceLandingPage";
import { BlogIndex } from "./pages/BlogIndex";
import { BlogPost } from "./pages/BlogPost";
import { services } from "./content";
import { posts } from "./blogPosts";
import { landings } from "./serviceLandings";

const slugify = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export type Route = { path: string; component: React.ComponentType<any>; props?: any };

export const routes: { path: string; render: () => React.ReactElement }[] = [
  { path: "/", render: () => <App /> },
  { path: "/servicos/pecas-sob-desenho-ou-amostra", render: () => <ServicePage slug="pecas-sob-desenho-ou-amostra" /> },
  { path: "/servicos/usinagem-cnc-em-lote", render: () => <ServicePage slug="usinagem-cnc-em-lote" /> },
  { path: "/servicos/componentes-industriais-sob-medida", render: () => <ServicePage slug="componentes-industriais-sob-medida" /> },
  { path: "/servicos/recuperacao-de-pecas-desgastadas", render: () => <ServicePage slug="recuperacao-de-pecas-desgastadas" /> },
  { path: "/usinagem-de-precisao", render: () => <ServiceLandingPage slug="usinagem-de-precisao" /> },
  { path: "/usinagem-cnc-torno-fresamento", render: () => <ServiceLandingPage slug="usinagem-cnc-torno-fresamento" /> },
  { path: "/pecas-sob-medida", render: () => <ServiceLandingPage slug="pecas-sob-medida" /> },
  { path: "/recuperacao-de-eixos-e-buchas", render: () => <ServiceLandingPage slug="recuperacao-de-eixos-e-buchas" /> },
  { path: "/blog", render: () => <BlogIndex /> },
];

export const allRoutePaths: string[] = [
  "/",
  ...services.map((s) => `/servicos/${slugify(s.title)}`),
  "/usinagem-de-precisao",
  "/usinagem-cnc-torno-fresamento",
  "/pecas-sob-medida",
  "/recuperacao-de-eixos-e-buchas",
  "/blog",
  ...posts.map((p) => `/blog/${p.slug}`),
];

export function matchRoute(pathname: string): { render: () => React.ReactElement } | null {
  const p = pathname.replace(/\/$/, "") || "/";
  const exact = routes.find((r) => r.path === p || r.path === p + "/");
  if (exact) return exact;
  if (p.startsWith("/blog/")) {
    const slug = p.replace("/blog/", "");
    return { render: () => <BlogPost slug={slug} /> };
  }
  return null;
}