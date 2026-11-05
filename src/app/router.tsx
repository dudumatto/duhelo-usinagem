import App from "./App";
import { ServicePage } from "./pages/ServicePage";
import { BlogIndex } from "./pages/BlogIndex";
import { BlogPost } from "./pages/BlogPost";
import { services } from "./content";
import { posts } from "./blogPosts";

const slugify = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export type Route = { path: string; component: React.ComponentType<any>; props?: any };

export const routes: { path: string; render: () => React.ReactElement }[] = [
  { path: "/", render: () => <App /> },
  { path: "/servicos/pecas-sob-desenho-ou-amostra", render: () => <ServicePage slug="pecas-sob-desenho-ou-amostra" /> },
  { path: "/servicos/usinagem-cnc-em-lote", render: () => <ServicePage slug="usinagem-cnc-em-lote" /> },
  { path: "/servicos/componentes-industriais-sob-medida", render: () => <ServicePage slug="componentes-industriais-sob-medida" /> },
  { path: "/servicos/recuperacao-de-pecas-desgastadas", render: () => <ServicePage slug="recuperacao-de-pecas-desgastadas" /> },
  { path: "/blog", render: () => <BlogIndex /> },
];

export const allRoutePaths: string[] = [
  "/",
  ...services.map((s) => `/servicos/${slugify(s.title)}`),
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