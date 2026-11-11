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
      name: "preview-prerendered-routes",
      configurePreviewServer(server) {
        const dist = path.resolve(server.config.root, server.config.build.outDir);
        server.middlewares.use((request, _response, next) => {
          const url = new URL(request.url ?? "/", "http://localhost");
          if (/^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(url.pathname)) {
            const indexFile = path.join(dist, url.pathname.slice(1), "index.html");
            if (existsSync(indexFile)) request.url = `${url.pathname}/index.html${url.search}`;
          }
          next();
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
