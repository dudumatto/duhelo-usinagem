import { defineConfig } from "vite";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ isPreview }) => ({
  appType: isPreview ? "mpa" : "spa",
  plugins: [
    react(),
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
