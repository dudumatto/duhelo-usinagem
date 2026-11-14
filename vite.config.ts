import { defineConfig } from "vite";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
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
      name: "dev-blog-rss",
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          const url = new URL(request.url ?? "/", "http://localhost");
          if (url.pathname !== "/blog/feed.xml" || (request.method !== "GET" && request.method !== "HEAD")) return next();
          try {
            const { renderBlogFeed } = await server.ssrLoadModule("/src/entry-server.tsx");
            const rss = renderBlogFeed();
            response.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
            response.setHeader("Cache-Control", "no-cache");
            response.end(request.method === "HEAD" ? undefined : rss);
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
