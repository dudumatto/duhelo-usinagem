import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const script = await readFile(new URL("../public/cta.js", import.meta.url), "utf8");
const origin = "https://www.duhelousinagem.com.br";
const domain = "duhelousinagem.com.br";

function loadPage({ url = origin, route = "/", configured = true, storage = new Map(), article = false } = {}) {
  const requests = [];
  const localEvents = [];
  const clickListeners = new Map();
  const windowListeners = new Map();
  const articleRect = { top: 260, height: 1000 };

  class Element {
    constructor(dataset) { this.dataset = dataset; }
    closest() { return this; }
  }
  class CustomEvent {
    constructor(type, { detail }) { this.type = type; this.detail = detail; }
  }

  runInNewContext(script, {
    URL, URLSearchParams, Element, CustomEvent,
    location: new URL(url),
    innerHeight: 1000,
    sessionStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
    },
    document: {
      querySelector(selector) {
        if (selector.includes("canonical")) return { href: origin + route };
        if (selector.includes("analytics-domain") && configured) return { content: domain };
        if (selector === "[data-measure-scroll]" && article) return { getBoundingClientRect: () => articleRect };
        return null;
      },
      addEventListener: (type, handler) => clickListeners.set(type, handler),
    },
    window: {
      addEventListener: (type, handler) => windowListeners.set(type, handler),
      removeEventListener: (type) => windowListeners.delete(type),
      dispatchEvent: (event) => localEvents.push(event),
    },
    fetch: (endpoint, options) => {
      requests.push({ endpoint, options, body: JSON.parse(options.body) });
      return Promise.resolve();
    },
  });

  return {
    requests, localEvents, windowListeners, articleRect,
    click(ctaEvent, ctaPosition, type = "click", button = 0) {
      clickListeners.get(type)({ type, button, target: new Element({ ctaEvent, ctaPosition }) });
    },
  };
}

test("opt-in e domínio canônico controlam o envio; cliques locais continuam disponíveis", () => {
  for (const options of [{ configured: false }, { url: "http://localhost:4173/" }, { url: "https://preview.vercel.app/" }]) {
    const page = loadPage(options);
    page.click("whatsapp_click", "mobile_bar");
    assert.equal(page.requests.length, 0);
    assert.equal(page.localEvents[0].type, "duhelo:cta");
  }
});

test("payload usa canônica e UTMs permitidas, sem dados livres ou credenciais", () => {
  const storage = new Map();
  const campaign = { utm_source: "instagram", utm_medium: "social", utm_campaign: "bio" };
  loadPage({ url: origin + "/?utm_source=instagram&utm_medium=social&utm_campaign=bio", storage });

  const route = "/usinagem-de-precisao";
  const page = loadPage({ url: origin + route + "?email=teste%40example.invalid#5511999999999", route, storage });
  page.click("whatsapp_click", "middle");
  page.click("email_click", "teste@example.invalid");
  page.click("5511999999999", "middle");
  page.click("call_click", "end", "auxclick", 2);
  page.click("call_click", "end", "auxclick", 1);
  assert.equal(page.requests.length, 3);

  const [visit, whatsapp, call] = page.requests;
  assert.deepEqual(visit.body, { name: "pageview", domain, url: origin + route, props: campaign });
  assert.deepEqual(whatsapp.body, { name: "whatsapp_click", domain, url: origin + route, props: { ...campaign, cta_position: "middle" } });
  assert.equal(call.body.name, "call_click");
  assert.equal(whatsapp.endpoint, "https://plausible.io/api/event");
  assert.equal(whatsapp.options.method, "POST");
  assert.equal(whatsapp.options.credentials, "omit");
  assert.equal(whatsapp.options.referrerPolicy, "no-referrer");
  assert.equal(whatsapp.options.keepalive, true);
  assert.equal(whatsapp.options.headers["Content-Type"], "text/plain");
});

test("apenas um evento de 75% no corpo do artigo", () => {
  const page = loadPage({ route: "/blog/usinagem-de-precisao", article: true });
  page.windowListeners.get("scroll")();
  assert.equal(page.requests.length, 1);
  page.articleRect.top = 250;
  page.windowListeners.get("scroll")();
  assert.deepEqual(page.requests.map(({ body }) => body.name), ["pageview", "blog_scroll_75"]);
  assert.equal(page.windowListeners.has("scroll"), false);
  assert.equal(loadPage().windowListeners.has("scroll"), false);
});
