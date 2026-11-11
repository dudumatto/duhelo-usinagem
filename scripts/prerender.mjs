import { readFile, writeFile, rm, mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const ssrEntry = path.resolve("dist-ssr/entry-server.js");
const { render, renderHead, renderBlogFeed, allRoutePaths, routeMeta } = await import(pathToFileURL(ssrEntry).href);

function escapeHtml(text) {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

// render each route
const template = await readFile(path.join(dist, "index.html"), "utf8");
const indexableUrls = [];
for (const route of allRoutePaths) {
  const appHtml = render(route);
  const meta = routeMeta(route);
  let html = template;
  const canonical = `https://www.duhelousinagem.com.br${route === "/" ? "/" : route}`;
  if (meta.indexable === false) {
    html = html.replace(/(<meta name="robots" content=")[^"]*/, "$1noindex, follow");
  } else {
    indexableUrls.push(canonical);
  }
  if (route !== "/") {
    html = html.replace(/\s*<link\s+rel="preload"\s+as="image"[^>]*>/, "");
    const title = escapeHtml(meta.title);
    const description = escapeHtml(meta.description);
    if (meta.article) html = html.replace('<meta property="og:type" content="website"', '<meta property="og:type" content="article"');
    html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${title}</title>`);
    html = html.replace(/(<meta\s+(?:name="description"|property="og:description"|name="twitter:description")\s+content=")[^"]*/g, (_, prefix) => prefix + description);
    html = html.replace(/(<meta\s+(?:property="og:title"|name="twitter:title")\s+content=")[^"]*/g, (_, prefix) => prefix + title);
  }
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`);
  html = html.replace("<!--app-html-->", () => appHtml).replace("<!--app-head-->", () => renderHead(route));
  // remove script tag + file
  const scriptTag = /\s*<script type="module" crossorigin src="\/assets\/([^"]+\.js)"><\/script>/;
  const match = html.match(scriptTag);
  if (match) {
    html = html.replace(scriptTag, "");
  }
  // css inline
  const cssTag = /<link rel="stylesheet" crossorigin href="\/assets\/([^"]+\.css)">/;
  const cssMatch = html.match(cssTag);
  if (cssMatch) {
    const css = await readFile(path.join(dist, "assets", cssMatch[1]), "utf8");
    html = html.replace(cssTag, () => `<style>${css}</style>`);
  }
  const outDir = route === "/" ? dist : path.join(dist, route.replace(/^\//, ""));
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), html);
}

// remove assets js/css after inlining (best effort)
const assetsDir = path.join(dist, "assets");
try { await rm(assetsDir, { recursive: true, force: true }); } catch {}

// generate sitemap.xml
const urls = indexableUrls.map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`).join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);
await writeFile(path.join(dist, "blog", "feed.xml"), renderBlogFeed());

// cleanup ssr
await rm(path.resolve("dist-ssr"), { recursive: true, force: true });
console.log(`prerender ok: ${allRoutePaths.length} rotas`);
