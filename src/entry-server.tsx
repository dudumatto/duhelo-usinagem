import { renderToStaticMarkup } from "react-dom/server";
import App from "./app/App";
import { structuredData } from "./app/structuredData";

export function render() {
  return renderToStaticMarkup(<App />);
}

export function renderHead() {
  const json = JSON.stringify(structuredData()).replace(/</g, "\u003c");
  return `<script type="application/ld+json">${json}</script>`;
}
