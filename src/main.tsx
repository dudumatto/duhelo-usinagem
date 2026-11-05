import { createRoot } from "react-dom/client";
import { matchRoute } from "./app/router";

const root = createRoot(document.getElementById("root")!);
const m = matchRoute(window.location.pathname);
root.render(m ? m.render() : <p>Página não encontrada.</p>);