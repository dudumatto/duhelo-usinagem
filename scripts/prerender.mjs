import { readFile, writeFile, rm, mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const ssrEntry = path.resolve("dist-ssr/entry-server.js");
const { render, renderHead, renderBlogFeed, allRoutePaths, routeMeta, SITE_URL } = await import(pathToFileURL(ssrEntry).href);

function escapeHtml(text) {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

// render each route
const template = await readFile(path.join(dist, "index.html"), "utf8");
const indexablePages = [];
for (const route of allRoutePaths) {
  const appHtml = render(route);
  const meta = routeMeta(route);
  let html = template;
  const canonical = new URL(route, SITE_URL).href;
  if (meta.indexable === false) {
    html = html.replace(/(<meta name="robots" content=")[^"]*/, "$1noindex, follow");
  } else {
    indexablePages.push({ canonical, lastModified: meta.lastModified });
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
  if (route === "/404") {
    html = html.replace(/\s*<link rel="canonical"[^>]*>/, "").replace(/\s*<meta property="og:url"[^>]*>/, "");
  }
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
  if (route === "/404") {
    await writeFile(path.join(dist, "404.html"), html);
    continue;
  }
  const outDir = route === "/" ? dist : path.join(dist, route.replace(/^\//, ""));
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), html);
}

// remove assets js/css after inlining (best effort)
const assetsDir = path.join(dist, "assets");
try { await rm(assetsDir, { recursive: true, force: true }); } catch {}

// generate sitemap.xml
const urls = indexablePages.map(({ canonical, lastModified }) => {
  const lastmod = lastModified ? `\n    <lastmod>${lastModified}</lastmod>` : "";
  return `  <url>\n    <loc>${escapeHtml(canonical)}</loc>${lastmod}\n  </url>`;
}).join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);
await writeFile(path.join(dist, "blog", "feed.xml"), renderBlogFeed());

// cleanup ssr
await rm(path.resolve("dist-ssr"), { recursive: true, force: true });
console.log(`prerender ok: ${allRoutePaths.length} rotas`);
