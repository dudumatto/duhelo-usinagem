import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error('Elemento raiz "#root" não encontrado no index.html');
}
createRoot(root).render(<App />);
