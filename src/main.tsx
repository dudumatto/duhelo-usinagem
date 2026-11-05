import "./styles/index.css";

import { createRoot } from "react-dom/client";
import { matchRoute } from "./app/router";

// Em produção a página é pré-renderizada em HTML estático (scripts/prerender.mjs) e não precisa de JavaScript.
// No modo dev, o React renderiza a página normalmente.
if (import.meta.env.DEV) {
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(matchRoute(window.location.pathname)?.render() ?? <p>Página não encontrada.</p>);
  }
}