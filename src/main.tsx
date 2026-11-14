import "./styles/index.css";

// O build pré-renderiza o conteúdo. O script estático public/cta.js cuida dos eventos no navegador.
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
      createRoot(root).render((m ?? routerMod.matchRoute("/404"))?.render() ?? <App />);
    } catch (err) {
      console.error("Erro ao renderizar no dev:", err);
      const { default: App } = await import("./app/App");
      const { createRoot } = await import("react-dom/client");
      createRoot(root).render(<App />);
    }
  })();
}
