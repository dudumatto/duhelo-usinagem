import { getConsent, hasConsentedAnalytics, setConsent } from "./consent";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

export function isAnalyticsAllowedHost(): boolean {
  if (typeof window === "undefined") return false;
  // Flag explícito para teste local (VITE_GA_DEBUG_LOCAL=true em .env.local)
  if (import.meta.env.VITE_GA_DEBUG_LOCAL === "true") return true;
  if (!import.meta.env.PROD) return false;
  return window.location.hostname === "www.duhelousinagem.com.br";
}

function removeGaCookies() {
  if (typeof document === "undefined") return;
  const cookies = document.cookie.split(";");
  for (const c of cookies) {
    const name = c.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_")) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }
}

export function loadAnalytics() {
  if (!isAnalyticsAllowedHost() || !GA_ID || !hasConsentedAnalytics()) return;
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_ID}"]`)) return;

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer!.push(args);
  }
  window.gtag = gtag;

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true, send_page_view: true });
}

export function revokeAnalytics() {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", { analytics_storage: "denied" });
  }
  removeGaCookies();
}

export function trackEvent(name: string, params: Record<string, any> = {}) {
  if (!isAnalyticsAllowedHost() || !hasConsentedAnalytics()) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

export function initAnalyticsOnLoad() {
  if (hasConsentedAnalytics()) loadAnalytics();
}

// Reage a mudanças de consentimento
if (typeof window !== "undefined") {
  window.addEventListener("duhelo-consent", (e: any) => {
    if (e?.detail?.analytics) loadAnalytics();
    else revokeAnalytics();
  });
}