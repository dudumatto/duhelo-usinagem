(() => {
  const storageKey = "duhelo:attribution";
  const campaigns = new Map([
    ["google_business_profile", ["organic", "perfil_empresa"]],
    ["instagram", ["social", "bio"]],
    ["whatsapp", ["social", "status"]],
    ["email", ["email", "assinatura"]],
    ["cartao", ["offline", "qr_code"]],
  ]);
  const events = new Set(["whatsapp_click", "call_click", "email_click", "cta_click"]);
  const positions = new Set([
    "header", "hero", "hero_secondary", "title_block", "middle", "end", "faq",
    "contact", "contact_cell", "footer", "mobile_bar",
  ]);

  function knownAttribution(values) {
    const source = values?.utm_source;
    const preset = campaigns.get(source);
    if (!preset) return {};

    const [medium, campaign] = preset;
    return {
      utm_source: source,
      ...(values.utm_medium === medium ? { utm_medium: medium } : {}),
      ...(values.utm_campaign === campaign ? { utm_campaign: campaign } : {}),
    };
  }

  function readAttribution() {
    try {
      return knownAttribution(JSON.parse(sessionStorage.getItem(storageKey)));
    } catch {
      return null;
    }
  }

  const query = new URLSearchParams(location.search);
  const arrival = knownAttribution({
    utm_source: query.get("utm_source"),
    utm_medium: query.get("utm_medium"),
    utm_campaign: query.get("utm_campaign"),
  });
  const initialAttribution = arrival.utm_source ? arrival : readAttribution() ?? {};
  let useStoredAttribution = !arrival.utm_source;
  if (arrival.utm_source) {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(arrival));
      useStoredAttribution = true;
    } catch {
      // A origem ainda fica disponível enquanto esta página estiver aberta.
    }
  }

  const canonical = document.querySelector('link[rel="canonical"]');
  const canonicalUrl = canonical ? new URL(canonical.href) : null;
  const page = canonicalUrl?.pathname ?? "/";
  const gaId = document.querySelector('meta[name="duhelo-ga-id"]')?.content;
  const measurementEnabled = /^G-[A-Z0-9]+$/.test(gaId ?? "")
    && canonicalUrl?.origin === "https://www.duhelousinagem.com.br"
    && location.origin === canonicalUrl.origin;
  const consentKey = "duhelo:analytics-consent:v1";
  const denied = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
  let measuring = false;
  let choice;
  const articleBody = document.querySelector("[data-measure-scroll]");

  function attribution() {
    const stored = useStoredAttribution ? readAttribution() : null;
    return stored ?? initialAttribution;
  }

  function measure(name, source, position) {
    if (!measuring) return;
    window.gtag("event", name, {
      send_to: gaId,
      page_location: canonicalUrl.href,
      cta_page: page,
      ...(position ? { cta_position: position } : {}),
      ...(source.utm_source ? { campaign_source: source.utm_source } : {}),
      ...(source.utm_medium ? { campaign_medium: source.utm_medium } : {}),
      ...(source.utm_campaign ? { campaign_name: source.utm_campaign } : {}),
    });
  }

  function measureArticleScroll() {
    const { top, height } = articleBody.getBoundingClientRect();
    if (height <= 0 || innerHeight < top + height * 0.75) return;
    window.removeEventListener("scroll", measureArticleScroll);
    measure("blog_scroll_75", attribution());
  }

  function startMeasurement() {
    if (measuring) return;
    measuring = true;
    window["ga-disable-" + gaId] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", denied);
    window.gtag("consent", "update", { ...denied, analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", gaId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: "none",
      cookie_path: "/",
      page_location: canonicalUrl.href,
      page_referrer: document.referrer ? new URL(document.referrer).origin + "/" : "",
    });
    measure("page_view", attribution());
    const tag = document.createElement("script");
    tag.async = true;
    tag.referrerPolicy = "no-referrer";
    tag.src = "https://www.googletagmanager.com/gtag/js?id=" + gaId;
    document.head.append(tag);
    if (articleBody) window.addEventListener("scroll", measureArticleScroll, { passive: true });
  }

  function stopMeasurement() {
    window["ga-disable-" + gaId] = true;
    measuring = false;
    window.removeEventListener("scroll", measureArticleScroll);
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (!/^_ga(?:_[A-Z0-9]+)?$/i.test(name)) continue;
      for (const domain of ["", "; Domain=" + location.hostname, "; Domain=duhelousinagem.com.br"]) {
        document.cookie = name + "=; Max-Age=0; Path=/; Secure" + domain;
      }
    }
  }

  function showConsent() {
    const panel = document.querySelector("#analytics-preferences");
    const toggle = document.querySelector("[data-cookie-preferences]");
    if (!panel || !toggle) return;
    function open(focus = false) {
      panel.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      if (focus) {
        panel.focus({ preventScroll: true });
        panel.scrollIntoView({ block: "nearest" });
      }
    }
    function save(next) {
      const wasMeasuring = measuring;
      choice = next;
      try { localStorage.setItem(consentKey, next); } catch { /* choice applies to this page */ }
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      if (next === "accepted") startMeasurement();
      else {
        stopMeasurement();
        if (wasMeasuring) {
          // Remove the loaded library and its listeners. The saved refusal prevents reloading it.
          location.reload();
          return;
        }
      }
      toggle.focus({ preventScroll: true });
    }
    try { choice = localStorage.getItem(consentKey); } catch { /* ask on this page */ }
    panel.querySelector("[data-analytics-reject]").addEventListener("click", () => save("rejected"));
    panel.querySelector("[data-analytics-accept]").addEventListener("click", () => save("accepted"));
    toggle.hidden = false;
    toggle.addEventListener("click", () => open(true));
    if (choice === "accepted") startMeasurement();
    else if (choice === "rejected") stopMeasurement();
    else open();
    window.addEventListener("storage", (event) => {
      if (event.key !== consentKey && event.key !== null) return;
      if (measuring && event.newValue !== "accepted") {
        stopMeasurement();
        location.reload();
      }
    });
    window.addEventListener("pageshow", (event) => {
      if (!event.persisted || !measuring) return;
      try {
        if (localStorage.getItem(consentKey) === "accepted") return;
      } catch { /* a cached choice can no longer be confirmed */ }
      stopMeasurement();
      location.reload();
    });
  }

  function recordClick(event) {
    if (event.type === "auxclick" && event.button !== 1) return;
    const link = event.target instanceof Element && event.target.closest("a[data-cta-event]");
    if (!link) return;

    const { ctaEvent, ctaPosition } = link.dataset;
    if (!events.has(ctaEvent) || !positions.has(ctaPosition)) return;

    const source = attribution();
    measure(ctaEvent, source, ctaPosition);
    if (link.hasAttribute("data-drawing-cta")) measure("drawing_cta_click", source, ctaPosition);
    window.dispatchEvent(new CustomEvent("duhelo:cta", {
      detail: {
        event: ctaEvent,
        cta_page: page,
        cta_position: ctaPosition,
        ...source,
      },
    }));
  }

  document.addEventListener("click", recordClick);
  document.addEventListener("auxclick", recordClick);

  if (measurementEnabled) showConsent();
})();
