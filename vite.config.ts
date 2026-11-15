import { defineConfig } from "vite";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createGzip } from "node:zlib";
import react from "@vitejs/plugin-react";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDirectory = path.join(__dirname, "src", "content", "blog");

export default defineConfig(({ isPreview }) => ({
  appType: isPreview ? "mpa" : "spa",
  plugins: [
    react(),
    {
      name: "markdown-blog-posts",
      async load(id) {
        if (!id.endsWith(".md?post")) return;
        const filename = id.slice(0, -"?post".length);
        if (path.relative(blogDirectory, path.dirname(filename)) !== "") return;
        const source = await readFile(filename, "utf8");
        if (!/^\uFEFF?---\r?\n/.test(source)) throw new Error(`${filename}: abra o cabeçalho YAML com uma linha '---'.`);
        const { data, content } = matter(source);
        return `export default ${JSON.stringify({ data, content })};`;
      },
    },
    {
      name: "dev-static-pages",
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          const url = new URL(request.url ?? "/", "http://localhost");
          if (request.method !== "GET" && request.method !== "HEAD") return next();
          const isFeed = url.pathname === "/blog/feed.xml";
          const pathname = url.pathname.replace(/\/$/, "") || "/";
          if (!isFeed && (!request.headers.accept?.includes("text/html") ||
              !/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(pathname))) return next();
          try {
            const { render, renderHead, renderBlogFeed, allRoutePaths, routeMeta, SITE_URL } = await server.ssrLoadModule("/src/entry-server.tsx");
            response.setHeader("Cache-Control", "no-cache");
            if (isFeed) {
              response.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
              response.end(request.method === "HEAD" ? undefined : renderBlogFeed());
              return;
            }
            const route = allRoutePaths.includes(pathname) ? pathname : "/404";
            const meta = routeMeta(route);
            const title = meta.title.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
            const canonical = new URL(route, SITE_URL).href;
            const [template, { default: css }] = await Promise.all([
              readFile(path.join(__dirname, "index.html"), "utf8"),
              server.ssrLoadModule("/src/styles/index.css?inline"),
            ]);
            let html = template
              .replace(/<title>[^<]*<\/title>/, () => `<title>${title}</title>`)
              .replace(/(<link rel="canonical" href=")[^"]+/, (_, prefix) => prefix + canonical)
              .replace("<!--app-head-->", () => `<style>${css}</style>${renderHead(route)}`)
              .replace("<!--app-html-->", () => render(route))
              .replace('<script type="module" src="/src/main.tsx"></script>', "");
            if (route !== "/") html = html.replace(/\s*<link\s+rel="preload"\s+as="image"[^>]*>/, "");
            if (meta.indexable === false) html = html.replace(/(<meta name="robots" content=")[^"]+/, "$1noindex, follow");
            response.statusCode = route === "/404" ? 404 : 200;
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.setHeader("Vary", "Accept-Encoding");
            const gzip = request.headers["accept-encoding"]?.split(",").some((coding) =>
              /^gzip(?:\s*;\s*q=(?:1(?:\.0*)?|0\.\d*[1-9]\d*))?$/i.test(coding.trim()),
            );
            if (gzip) response.setHeader("Content-Encoding", "gzip");
            if (request.method === "HEAD") response.end();
            else if (gzip) {
              const stream = createGzip();
              stream.on("error", (error) => response.destroy(error));
              stream.pipe(response);
              stream.end(html);
            } else response.end(html);
          } catch (error) {
            next(error);
          }
        });
      },
    },
    {
      name: "preview-prerendered-routes",
      configurePreviewServer(server) {
        const dist = path.resolve(server.config.root, server.config.build.outDir);
        server.middlewares.use((request, response, next) => {
          const url = new URL(request.url ?? "/", "http://localhost");
          if (url.pathname === "/blog/feed.xml") {
            response.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
          }
          if (/^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(url.pathname)) {
            const indexFile = path.join(dist, url.pathname.slice(1), "index.html");
            if (existsSync(indexFile)) request.url = `${url.pathname}/index.html${url.search}`;
          }
          next();
        });
        return () => server.middlewares.use(async (request, response, next) => {
          if ((request.method !== "GET" && request.method !== "HEAD") ||
              !request.headers.accept?.includes("text/html")) return next();
          const { pathname } = new URL(request.url ?? "/", "http://localhost");
          // O fallback do Vite já reescreveu as páginas existentes em arquivos HTML.
          if (/^\/(?:[a-z0-9-]+\/)*[a-z0-9-]+\.html$/.test(pathname) &&
              existsSync(path.join(dist, pathname.slice(1)))) return next();
          try {
            const html = await readFile(path.join(dist, "404.html"));
            response.statusCode = 404;
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end(request.method === "HEAD" ? undefined : html);
          } catch (error) {
            next(error);
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
