import App from "./App";
import { ServiceLandingPage } from "./pages/ServiceLandingPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { BlogIndex } from "./pages/BlogIndex";
import { BlogPost } from "./pages/BlogPost";
import { AboutPage } from "./pages/AboutPage";
import { posts } from "./blogPosts";
import { landings } from "./serviceLandings";

export const routes: { path: string; render: () => React.ReactElement }[] = [
  { path: "/", render: () => <App /> },
  ...landings.map((landing) => ({ path: `/${landing.slug}`, render: () => <ServiceLandingPage landing={landing} /> })),
  { path: "/blog", render: () => <BlogIndex /> },
  { path: "/sobre", render: () => <AboutPage /> },
  { path: "/politica-de-privacidade", render: () => <PrivacyPage /> },
];

export const allRoutePaths: string[] = [
  ...routes.map((route) => route.path),
  ...posts.map((p) => `/blog/${p.slug}`),
];

export function matchRoute(pathname: string): { render: () => React.ReactElement } | null {
  const p = pathname.replace(/\/$/, "") || "/";
  const exact = routes.find((r) => r.path === p);
  if (exact) return exact;
  if (p.startsWith("/blog/")) {
    const slug = p.replace("/blog/", "");
    return { render: () => <BlogPost slug={slug} /> };
  }
  return null;
}
