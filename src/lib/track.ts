export type Utm = { utm_source?: string; utm_medium?: string; utm_campaign?: string };

export function getUtm(): Utm {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem("utm");
    if (stored) return JSON.parse(stored) as Utm;
    const params = new URLSearchParams(window.location.search);
    const utm: Utm = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign"]) {
      const v = params.get(k);
      if (v) (utm as any)[k] = v;
    }
    if (Object.keys(utm).length) sessionStorage.setItem("utm", JSON.stringify(utm));
    return utm;
  } catch {
    return {};
  }
}

export function track(event: string, props: Record<string, any> = {}) {
  const utm = getUtm();
  const payload = { event, ...props, ...utm };
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log("[track]", payload);
  }
  // no-op: sem envio de rede nesta fase. Nenhum dado pessoal é coletado.
}