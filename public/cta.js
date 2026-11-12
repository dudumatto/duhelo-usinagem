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
  const page = canonical ? new URL(canonical.href).pathname : "/";

  function recordClick(event) {
    if (event.type === "auxclick" && event.button !== 1) return;
    const link = event.target instanceof Element && event.target.closest("a[data-cta-event]");
    if (!link) return;

    const { ctaEvent, ctaPosition } = link.dataset;
    if (!events.has(ctaEvent) || !ctaPosition) return;

    const stored = useStoredAttribution ? readAttribution() : null;
    window.dispatchEvent(new CustomEvent("duhelo:cta", {
      detail: {
        event: ctaEvent,
        cta_page: page,
        cta_position: ctaPosition,
        ...(stored ?? initialAttribution),
      },
    }));
  }

  document.addEventListener("click", recordClick);
  document.addEventListener("auxclick", recordClick);
})();
