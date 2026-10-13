// Pré-renderiza a página em HTML estático: o Google (e qualquer visitante) recebe o conteúdo completo
// sem depender de JavaScript. Roda depois de `vite build` e `vite build --ssr`.
import { readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const ssrEntry = path.resolve("dist-ssr/entry-server.js");

const { render, renderHead } = await import(pathToFileURL(ssrEntry).href);
const appHtml = render();

let html = await readFile(path.join(dist, "index.html"), "utf8");
if (!html.includes("<!--app-html-->")) throw new Error("Marcador <!--app-html--> não encontrado em dist/index.html");
html = html.replace("<!--app-html-->", appHtml).replace("<!--app-head-->", renderHead());

// A página publicada é 100% HTML + CSS: o único JS de produção é o bootstrap do modo dev (vazio no build).
// Removemos a tag <script> e o arquivo para não custar nenhuma requisição. Se um dia a página ganhar
// interatividade em JS, troque isto por hidratação (hydrateRoot) em src/main.tsx.
const scriptTag = /\s*<script type="module" crossorigin src="\/assets\/([^"]+\.js)"><\/script>/;
const match = html.match(scriptTag);
if (match) {
  html = html.replace(scriptTag, "");
  await rm(path.join(dist, "assets", match[1]));
}

// CSS embutido no HTML: elimina a requisição que bloqueia a primeira pintura (~5 KB gzip).
const cssTag = /<link rel="stylesheet" crossorigin href="\/assets\/([^"]+\.css)">/;
const cssMatch = html.match(cssTag);
if (cssMatch) {
  const css = await readFile(path.join(dist, "assets", cssMatch[1]), "utf8");
  html = html.replace(cssTag, () => `<style>${css}</style>`);
}

await writeFile(path.join(dist, "index.html"), html);
await rm(path.resolve("dist-ssr"), { recursive: true, force: true });
console.log(`prerender ok: ${Math.round(html.length / 1024)} KB de HTML`);
