import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const script = await readFile(new URL("../public/cta.js", import.meta.url), "utf8");
const origin = "https://www.duhelousinagem.com.br";
const gaId = "G-TEST123";
const consentKey = "duhelo:analytics-consent:v1";

function load({ url = origin, configured = true, choices = new Map(), article = false, cookies = "" } = {}) {
  const route = article ? "/blog/usinagem-de-precisao" : "/";
  const scripts = [], deleted = [], local = [];
  const windowListeners = new Map(), documentListeners = new Map();
  const rect = { top: 300, height: 1000 };
  let reloads = 0;
  class Element {
    constructor(dataset = {}) { this.dataset = dataset; this.hidden = true; }
    closest() { return this; }
    hasAttribute() { return !!this.dataset.drawing; }
    addEventListener(type, callback) { this[type] = callback; }
    setAttribute() {}
    focus() {}
    scrollIntoView() {}
  }
  class CustomEvent {
    constructor(type, { detail }) { this.type = type; this.detail = detail; }
  }
  const panel = new Element(), toggle = new Element(), accept = new Element(), reject = new Element();
  panel.querySelector = (selector) => selector.includes("reject") ? reject : accept;
  const window = {
    addEventListener: (type, callback) => windowListeners.set(type, callback),
    removeEventListener: (type) => windowListeners.delete(type),
    dispatchEvent: (event) => local.push(event),
  };
  const storage = (map) => ({
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => map.set(key, value),
  });
  runInNewContext(script, {
    URL, URLSearchParams, Element, CustomEvent, window, innerHeight: 1000,
    location: Object.assign(new URL(url), { reload() { reloads++; } }),
    localStorage: storage(choices), sessionStorage: storage(new Map()),
    document: {
      referrer: "https://example.com/pesquisa?email=privado",
      head: { append: (tag) => scripts.push(tag) },
      createElement: () => ({}),
      get cookie() { return cookies; },
      set cookie(value) { deleted.push(value); },
      querySelector(selector) {
        if (selector.includes("canonical")) return { href: origin + route };
        if (selector.includes("ga-id") && configured) return { content: gaId };
        if (selector === "#analytics-preferences") return panel;
        if (selector === "[data-cookie-preferences]") return toggle;
        if (selector === "[data-measure-scroll]" && article) return { getBoundingClientRect: () => rect };
        return null;
      },
      addEventListener: (type, callback) => documentListeners.set(type, callback),
    },
  });
  return {
    scripts, panel, toggle, accept, reject, deleted, local, window, rect, windowListeners,
    reloads: () => reloads,
    calls: () => Array.from(window.dataLayer ?? [], (args) => Array.from(args)),
    click(ctaEvent, ctaPosition, drawing = false) {
      documentListeners.get("click")({ type: "click", target: new Element({ ctaEvent, ctaPosition, drawing }) });
    },
  };
}

test("sem ID, no preview ou antes do aceite não carrega tag; recusa é lembrada", () => {
  for (const options of [{ configured: false }, { url: "https://preview.vercel.app/" }, { url: "http://localhost:4173/" }]) {
    const page = load(options);
    page.click("whatsapp_click", "hero");
    assert.equal(page.local.length, 1);
    assert.equal(page.scripts.length, 0);
    assert.equal(page.panel.hidden, true);
  }
  const choices = new Map();
  const page = load({ choices });
  assert.equal(page.panel.hidden, false);
  page.click("call_click", "hero");
  assert.equal(page.window.gtag, undefined);
  page.reject.click();
  assert.equal(page.scripts.length, 0);
  assert.equal(choices.get(consentKey), "rejected");
  assert.equal(load({ choices }).panel.hidden, true);
});

test("aceite carrega uma tag, bloqueia publicidade e mede somente eventos permitidos", () => {
  const page = load({ url: origin + "/?utm_source=instagram&utm_medium=social&utm_campaign=bio&email=privado#pessoa" });
  page.accept.click();
  page.toggle.click();
  page.accept.click();
  assert.equal(page.scripts.length, 1);
  assert.equal(page.scripts[0].src, "https://www.googletagmanager.com/gtag/js?id=" + gaId);
  assert.equal(page.calls()[0][2].analytics_storage, "denied");
  assert.equal(page.calls()[1][2].analytics_storage, "granted");
  for (const key of ["ad_storage", "ad_user_data", "ad_personalization"]) assert.equal(page.calls()[1][2][key], "denied");
  const config = page.calls().find(([command]) => command === "config")[2];
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.allow_ad_personalization_signals, false);
  assert.equal(config.page_referrer, "https://example.com/");
  page.click("whatsapp_click", "hero", true);
  page.click("call_click", "end");
  page.click("email_click", "footer");
  page.click("cta_click", "hero_secondary");
  page.click("email_click", "privado");
  const events = page.calls().filter(([command]) => command === "event");
  assert.deepEqual(events.map(([, name]) => name), ["page_view", "whatsapp_click", "drawing_cta_click", "call_click", "email_click", "cta_click"]);
  assert.equal(events[1][2].page_location, origin + "/");
  assert.equal(events[1][2].cta_page, "/");
  assert.equal(events[1][2].cta_position, "hero");
  assert.equal(events[1][2].campaign_source, "instagram");
  assert.doesNotMatch(JSON.stringify(page.calls()), /privado|pessoa/);
});

test("rolagem 75% uma vez; revogação apaga cookies e bloqueia novas medições", () => {
  const choices = new Map([[consentKey, "accepted"]]);
  const page = load({ choices, article: true, cookies: "_ga=x; _ga_ABC=y; outro=z" });
  page.windowListeners.get("scroll")();
  assert.equal(page.calls().filter(([, name]) => name === "blog_scroll_75").length, 0);
  page.rect.top = 250;
  page.windowListeners.get("scroll")();
  assert.equal(page.calls().filter(([, name]) => name === "blog_scroll_75").length, 1);
  assert.equal(page.windowListeners.has("scroll"), false);
  page.toggle.click();
  page.reject.click();
  assert.equal(page.window["ga-disable-" + gaId], true);
  assert.equal(page.reloads(), 1);
  assert.equal(page.deleted.length, 6);
  assert.ok(page.deleted.every((cookie) => /^_ga/.test(cookie)));
  const count = page.calls().length;
  page.click("call_click", "hero");
  assert.equal(page.calls().length, count);
  assert.equal(load({ choices }).scripts.length, 0);
});
