import "./styles/index.css";

// Em produção a página é pré-renderizada em HTML estático (scripts/prerender.mjs) e não precisa de JavaScript.
// No modo dev, o React renderiza a página normalmente.
if (import.meta.env.DEV) {
  Promise.all([import("react-dom/client"), import("./app/App")]).then(([{ createRoot }, { default: App }]) => {
    const root = document.getElementById("root");
    if (!root) throw new Error('Elemento raiz "#root" não encontrado no index.html');
    createRoot(root).render(<App />);
  });
}
