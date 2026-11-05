import "./styles/index.css";

// Em produção a página é pré-renderizada em HTML estático (scripts/prerender.mjs) e não precisa de JavaScript.
// No modo dev, o React renderiza a página normalmente.
if (import.meta.env.DEV) {
  (async () => {
    const root = document.getElementById("root");
    if (!root) return;
    try {
      const [{ default: App }, routerMod] = await Promise.all([
        import("./app/App"),
        import("./app/router"),
      ]);
      const m = routerMod.matchRoute(window.location.pathname);
      const { createRoot } = await import("react-dom/client");
      createRoot(root).render(m ? m.render() : <App />);
    } catch (err) {
      console.error("Erro ao renderizar no dev:", err);
      const { default: App } = await import("./app/App");
      const { createRoot } = await import("react-dom/client");
      createRoot(root).render(<App />);
    }
  })();
}