import { createHash } from "node:crypto";
import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIST = path.resolve("dist");
const HOST = "https://www.duhelousinagem.com.br";
const BUSINESS_ID = `${HOST}/#business`;

async function fileExists(p) { try { await access(p); return true; } catch { return false; } }

const imageDimensions = new Map();
async function checkSocialImage(route, name, value) {
  const url = URL.canParse(value) ? new URL(value) : null;
  const canonicalHost = url?.origin === HOST && !url.search && !url.hash && !url.username && !url.password;
  if (!canonicalHost) {
    check(`${route} ${name} usa URL absoluta no host canônico`, false, value);
    return;
  }

  if (!imageDimensions.has(value)) {
    const file = path.join(DIST, url.pathname);
    imageDimensions.set(value, await sharp(file).metadata().catch(() => null));
  }
  const dimensions = imageDimensions.get(value);
  check(
    `${route} ${name} absoluto e imagem existente de 1200x630`,
    dimensions?.width === 1200 && dimensions?.height === 630,
    dimensions ? `${value} (${dimensions.width}x${dimensions.height})` : `${value} (imagem ausente ou inválida)`,
  );
}

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
const hasCtaScript = await fileExists(path.join(DIST, "cta.js"));
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
  await checkSocialImage(route, "og:image", ogImg);

  const twImgMatch = html.match(/<meta name="twitter:image" content="([^"]*)"/);
  const twImg = twImgMatch ? twImgMatch[1] : "";
  await checkSocialImage(route, "twitter:image", twImg);

  check(`${route} sem utm_`, !/utm_/.test(html));
  check(`${route} script de CTA local`, hasCtaScript && (html.match(/<script\b[^>]*src="\/cta\.js"/g) ?? []).length === 1);

  // JSON-LD parseable
  const ldMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  let ldOk = ldMatches.length > 0;
  const nodes = [];
  for (const m of ldMatches) {
    const json = m.replace(/<script type="application\/ld\+json">/, "").replace(/<\/script>/, "");
    try {
      const data = JSON.parse(json);
      nodes.push(...(data["@graph"] ?? [data]));
      const article = data["@graph"]?.find((item) => item["@type"] === "Article");
      if (article) articleDates.set(canonical, article.dateModified);
    } catch { ldOk = false; }
  }
  check(`${route} JSON-LD parseável`, ldOk, `${ldMatches.length} blocos`);
  const businesses = nodes.filter((node) => node["@type"] === "LocalBusiness");
  check(`${route} LocalBusiness com @id único`, businesses.length === 1 && businesses[0]["@id"] === BUSINESS_ID, BUSINESS_ID);
  const serviceNodes = [
    ...nodes.filter((node) => node["@type"] === "Service"),
    ...(businesses[0]?.makesOffer ?? []).map((offer) => offer.itemOffered),
  ];
  const businessRef = (node) => node?.["@id"] === BUSINESS_ID && Object.keys(node).length === 1;
  if (serviceNodes.length) {
    check(`${route} Service.provider referencia LocalBusiness`, serviceNodes.every((service) => businessRef(service?.provider)));
  }
  if (route.startsWith("/blog/")) {
    const articles = nodes.filter((node) => node["@type"] === "Article");
    check(`${route} Article.author e Article.publisher referenciam LocalBusiness`, articles.length === 1 &&
      businessRef(articles[0].author) && businessRef(articles[0].publisher));
  }

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

const notFoundHtml = await readFile(path.join(DIST, "404.html"), "utf8").catch(() => "");
const notFoundRobots = notFoundHtml.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] ?? "";
check("404.html existe e pede exclusão do índice", /(?:^|[\s,])noindex(?:$|[\s,])/i.test(notFoundRobots));

const feed = await readFile(path.join(DIST, "blog", "feed.xml"), "utf8").catch(() => "");
const feedEntries = [...feed.matchAll(/<guid>([^<]+)<\/guid>/g)];
const feedUrls = new Set(feedEntries.map((match) => match[1]));
const articleUrls = expectedUrls.filter((url) => url.startsWith(`${HOST}/blog/`));
check("RSS lista os artigos canônicos", feedEntries.length === articleUrls.length && articleUrls.every((url) => feedUrls.has(url)), `${feedEntries.length} itens`);

const catalog = await readFile(routeMap.get("/blog"), "utf8");
const catalogCovers = [...catalog.matchAll(/<img\b[^>]*\bsrc="(\/images\/blog\/[^"]+)"/g)].map((match) => match[1]);
const coverHashes = new Set();
let coversOk = catalogCovers.length === articleUrls.length;
for (const url of articleUrls) {
  const route = new URL(url).pathname;
  const cover = `/images/blog/${route.slice("/blog/".length)}.webp`;
  const html = await readFile(routeMap.get(route), "utf8");
  const image = await readFile(path.join(DIST, cover.slice(1))).catch(() => null);
  if (!image?.length || !catalogCovers.includes(cover) || !html.includes(`src="${cover}"`)) {
    coversOk = false;
    console.log(`  capa ausente no catálogo ou artigo: ${route}`);
    continue;
  }
  const hash = createHash("sha256").update(image).digest("hex");
  if (coverHashes.has(hash)) console.log(`  imagem repetida: ${cover}`);
  coverHashes.add(hash);
}
check("cada artigo tem uma capa exclusiva", coversOk && coverHashes.size === articleUrls.length, `${coverHashes.size} imagens`);

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
