import { readFile, readdir, stat } from "node:fs/promises";
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

for (const route of routes) {
  const html = await readFile(routeMap.get(route), "utf8");
  const canonical = route === "/" ? `${HOST}/` : `${HOST}${route}`;

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

  check(`${route} sem utm_`, !/utm_/.test(html));

  // JSON-LD parseable
  const ldMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  let ldOk = ldMatches.length > 0;
  for (const m of ldMatches) {
    const json = m.replace(/<script type="application\/ld\+json">/, "").replace(/<\/script>/, "");
    try { JSON.parse(json); } catch { ldOk = false; }
  }
  check(`${route} JSON-LD parseável`, ldOk, `${ldMatches.length} blocos`);

  check(`${route} sem gtag no HTML`, !/googletagmanager|gtag\(/.test(html));
}

// sitemap
const sitemap = await readFile(path.join(DIST, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const indexable = routes.filter((r) => r !== "/404");
const expectedUrls = indexable.map((r) => r === "/" ? `${HOST}/` : `${HOST}${r}`);
const sitemapOk = sitemapUrls.length === expectedUrls.length && expectedUrls.every((u) => sitemapUrls.includes(u));
check("sitemap lista exatamente as rotas indexáveis", sitemapOk, `${sitemapUrls.length} urls`);

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
const llms = await readFile(path.join(DIST, "..", "public", "llms.txt"), "utf8").catch(() => "");
const llmsUrls = [...llms.matchAll(/https:\/\/www\.duhelousinagem\.com\.br\/[^\s)]*/g)].map((m) => m[0].replace(/[.,]$/, ""));
const llmsOk = llmsUrls.every((u) => {
  const p = u.replace(HOST, "").replace(/\/$/, "") || "/";
  return routeSet.has(p) || p === "/";
});
check("llms.txt só cita URLs existentes", llmsOk, `${llmsUrls.length} urls`);

console.log(`\n${failures === 0 ? "ALL PASS" : failures + " FAILURES"}`);
process.exit(failures === 0 ? 0 : 1);