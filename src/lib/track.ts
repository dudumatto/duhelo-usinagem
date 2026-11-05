import { trackEvent } from "./analytics";

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
  const params: Record<string, any> = {};
  if (props.page) params.cta_page = props.page;
  if (props.position) params.cta_position = props.position;
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log("[track]", event, params);
  }
  // UTM não é enviado: o GA4 lê o UTM da URL de chegada.
  trackEvent(event, params);
}