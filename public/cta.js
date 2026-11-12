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
  const analyticsDomain = document.querySelector('meta[name="duhelo-analytics-domain"]')?.content;
  const measurementEnabled = canonicalUrl?.protocol === "https:" && location.origin === canonicalUrl.origin
    && analyticsDomain === canonicalUrl.hostname.replace(/^www\./, "");

  function attribution() {
    const stored = useStoredAttribution ? readAttribution() : null;
    return stored ?? initialAttribution;
  }

  function measure(name, source, position) {
    if (!measurementEnabled) return;

    const props = position ? { ...source, cta_position: position } : source;
    void fetch("https://plausible.io/api/event", {
      method: "POST",
      mode: "no-cors",
      credentials: "omit",
      referrerPolicy: "no-referrer",
      keepalive: true,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        name,
        domain: analyticsDomain,
        url: canonicalUrl.origin + page,
        ...(Object.keys(props).length ? { props } : {}),
      }),
    }).catch(() => {});
  }

  function recordClick(event) {
    if (event.type === "auxclick" && event.button !== 1) return;
    const link = event.target instanceof Element && event.target.closest("a[data-cta-event]");
    if (!link) return;

    const { ctaEvent, ctaPosition } = link.dataset;
    if (!events.has(ctaEvent) || !positions.has(ctaPosition)) return;

    const source = attribution();
    measure(ctaEvent, source, ctaPosition);
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

  if (measurementEnabled) {
    measure("pageview", attribution());
    const articleBody = document.querySelector("[data-measure-scroll]");
    if (articleBody) {
      function measureArticleScroll() {
        const { top, height } = articleBody.getBoundingClientRect();
        if (height <= 0 || innerHeight < top + height * 0.75) return;
        window.removeEventListener("scroll", measureArticleScroll);
        measure("blog_scroll_75", attribution());
      }
      window.addEventListener("scroll", measureArticleScroll, { passive: true });
    }
  }
})();
