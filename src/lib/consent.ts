const KEY = "duhelo_consent";
const ACCEPT_MONTHS = 12;
const REJECT_MONTHS = 6;
const MS_PER_MONTH = 30 * 24 * 60 * 60 * 1000;

export type Consent = { analytics: boolean; date: string };

function isExpired(c: Consent): boolean {
  const then = new Date(c.date).getTime();
  if (Number.isNaN(then)) return true;
  const months = c.analytics ? ACCEPT_MONTHS : REJECT_MONTHS;
  return Date.now() > then + months * MS_PER_MONTH;
}

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    if (!v) return null;
    const c = JSON.parse(v) as Consent;
    if (isExpired(c)) {
      localStorage.removeItem(KEY);
      return null;
    }
    return c;
  } catch {
    return null;
  }
}

export function setConsent(analytics: boolean): Consent {
  const v: Consent = { analytics, date: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(v));
  window.dispatchEvent(new CustomEvent("duhelo-consent", { detail: v }));
  return v;
}

export function hasConsentedAnalytics(): boolean {
  return getConsent()?.analytics === true;
}

export function clearConsent() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("duhelo-consent", { detail: null }));
}