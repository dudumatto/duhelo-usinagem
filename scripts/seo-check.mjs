import { readFile, readdir, access } from "node:fs/promises";
async function fileExists(p) { try { await access(p); return true; } catch { return false; } }
import path from "node:path";

const DIST = path.resolve("dist");
const HOST = "https://www.duhelousinagem.com.br";

let failures = 0;
function check(label, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}: ${label}${detail ? " — " + detail : ""}`);
  if (!ok) failures++;
}

async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.name === "index.html") out.push(full);
  }
  return out;
}

const files = await walk(DIST);
const routeMap = new Map(); // path -> file
for (const f of files) {
  const rel = path.relative(DIST, f).replace(/\\/g, "/");
  const route = rel === "index.html" ? "/" : "/" + rel.replace(/\/index\.html$/, "");
  routeMap.set(route, f);
}
const routes = [...routeMap.keys()];
const noindexRoutes = new Set();
const idsByRoute = new Map();
const articleDates = new Map();

for (const route of routes) {
  const html = await readFile(routeMap.get(route), "utf8");
  idsByRoute.set(route, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1])));
  const canonical = route === "/" ? `${HOST}/` : `${HOST}${route}`;
  const robots = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] ?? "";
  if (robots.split(/[\s,]+/).some((directive) => /^(noindex|none)$/i.test(directive))) noindexRoutes.add(route);

  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch ? titleMatch[1] : "";
  check(`${route} title <=60`, title.length > 0 && title.length <= 60, `${title.length} chars`);

  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
  const desc = descMatch ? descMatch[1] : "";
  check(`${route} meta description <=155`, desc.length > 0 && desc.length <= 155, `${desc.length} chars`);

  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  check(`${route} exactly 1 H1`, h1Count === 1, `${h1Count} found`);

  const canonMatch = html.match(/<link rel="canonical" href="([^"]*)"/);
  const canon = canonMatch ? canonMatch[1] : "";
  const canonOk = canon === canonical;
  check(`${route} canonical absoluto`, canonOk, canon);

  const ogUrlMatch = html.match(/<meta property="og:url" content="([^"]*)"/);
  const ogUrl = ogUrlMatch ? ogUrlMatch[1] : "";
  check(`${route} og:url == canonical`, ogUrl === canon, ogUrl);

  const ogImgMatch = html.match(/<meta property="og:image" content="([^"]*)"/);
  const ogImg = ogImgMatch ? ogImgMatch[1] : "";
  const ogImgOk = ogImg.startsWith(HOST + "/") && (await fileExists(path.join(DIST, "..", "public", ogImg.replace(HOST + "/", ""))));
  check(`${route} og:image absoluto e existente`, ogImgOk, ogImg);

  const twImgMatch = html.match(/<meta name="twitter:image" content="([^"]*)"/);
  const twImg = twImgMatch ? twImgMatch[1] : "";
  check(`${route} twitter:image absoluto`, twImg.startsWith(HOST + "/"), twImg);

  check(`${route} sem utm_`, !/utm_/.test(html));

  // JSON-LD parseable
  const ldMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  let ldOk = ldMatches.length > 0;
  for (const m of ldMatches) {
    const json = m.replace(/<script type="application\/ld\+json">/, "").replace(/<\/script>/, "");
    try {
      const data = JSON.parse(json);
      const article = data["@graph"]?.find((item) => item["@type"] === "Article");
      if (article) articleDates.set(canonical, article.dateModified);
    } catch { ldOk = false; }
  }
  check(`${route} JSON-LD parseável`, ldOk, `${ldMatches.length} blocos`);

  check(`${route} sem gtag no HTML`, !/googletagmanager|gtag\(/.test(html));
}

// sitemap
const sitemap = await readFile(path.join(DIST, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const indexable = routes.filter((r) => r !== "/404" && !noindexRoutes.has(r));
const expectedUrls = indexable.map((r) => r === "/" ? `${HOST}/` : `${HOST}${r}`);
const sitemapOk = sitemapUrls.length === expectedUrls.length && expectedUrls.every((u) => sitemapUrls.includes(u));
check("sitemap lista exatamente as rotas indexáveis", sitemapOk, `${sitemapUrls.length} urls`);
const sitemapEntries = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*(?:<lastmod>([^<]+)<\/lastmod>\s*)?<\/url>/g)];
const validLastmod = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value))
  && new Date(value).toISOString().slice(0, 10) === value;
const lastmodOk = sitemapEntries.length === sitemapUrls.length && sitemapEntries.every(([, url, lastmod]) => (
  (lastmod === undefined || validLastmod(lastmod)) && (!articleDates.has(url) || articleDates.get(url) === lastmod)
));
check("sitemap usa datas válidas e coerentes com Article", lastmodOk, `${sitemapEntries.filter(([, , lastmod]) => lastmod).length} com lastmod`);

const robotsTxt = await readFile(path.join(DIST, "robots.txt"), "utf8");
const sitemapDirectives = [...robotsTxt.matchAll(/^Sitemap:\s*(\S+)\s*$/gim)].map((match) => match[1]);
check("robots.txt aponta ao sitemap canônico", sitemapDirectives.length === 1 && sitemapDirectives[0] === `${HOST}/sitemap.xml`);

const feed = await readFile(path.join(DIST, "blog", "feed.xml"), "utf8").catch(() => "");
const feedEntries = [...feed.matchAll(/<guid>([^<]+)<\/guid>/g)];
const feedUrls = new Set(feedEntries.map((match) => match[1]));
const articleUrls = expectedUrls.filter((url) => url.startsWith(`${HOST}/blog/`));
check("RSS lista os artigos canônicos", feedEntries.length === articleUrls.length && articleUrls.every((url) => feedUrls.has(url)), `${feedEntries.length} itens`);

// internal links
const routeSet = new Set(routes);
let linksOk = true;
for (const route of routes) {
  const html = await readFile(routeMap.get(route), "utf8");
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
  for (const h of hrefs) {
    // ignora arquivos estáticos (favicon, manifest, fontes, imagens)
    if (/\.[a-zA-Z0-9]+$/.test(h)) continue;
    const normalized = h.replace(/\/$/, "") || "/";
    if (!routeSet.has(normalized)) { linksOk = false; console.log(`  link quebrado em ${route}: ${h}`); }
  }
}
check("links internos apontam para rotas existentes", linksOk);

// llms.txt urls
const llms = await readFile(path.join(DIST, "llms.txt"), "utf8");
const llmsLinks = llms.split(/\r?\n/).filter((line) => line.startsWith("- "));
const llmsOk = llmsLinks.length > 0 && llmsLinks.every((line) => {
  const match = line.match(/^- \[[^\]]+\]\((\S+)\): \S/);
  if (!match || !URL.canParse(match[1])) return false;
  const url = new URL(match[1]);
  if (url.origin !== HOST || url.search || !expectedUrls.includes(`${url.origin}${url.pathname}`)) return false;
  return !url.hash || idsByRoute.get(url.pathname)?.has(url.hash.slice(1));
});
check("llms.txt descreve URLs canônicas e âncoras existentes", llmsOk, `${llmsLinks.length} links`);

console.log(`\n${failures === 0 ? "ALL PASS" : failures + " FAILURES"}`);
process.exit(failures === 0 ? 0 : 1);
