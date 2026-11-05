const KEY = "duhelo_consent";
export type Consent = { analytics: boolean; date: string };

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v ? (JSON.parse(v) as Consent) : null;
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