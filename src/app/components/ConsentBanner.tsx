import { useEffect, useState } from "react";
import { getConsent, setConsent } from "../../lib/consent";
import { loadAnalytics, initAnalyticsOnLoad } from "../../lib/analytics";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    initAnalyticsOnLoad();
    if (getConsent() === null) setVisible(true);
    else if (getConsent()?.analytics) loadAnalytics();
    const onChange = () => setVisible(getConsent() === null);
    const onOpen = () => setVisible(true);
    window.addEventListener("duhelo-consent", onChange);
    window.addEventListener("duhelo-open-consent", onOpen);
    return () => {
      window.removeEventListener("duhelo-consent", onChange);
      window.removeEventListener("duhelo-open-consent", onOpen);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="consent-banner" role="dialog" aria-labelledby="consent-title" aria-describedby="consent-desc">
      <div className="consent-inner">
        <p id="consent-title" className="consent-title">Cookies de medição</p>
        <p id="consent-desc" className="consent-desc">
          Usamos cookies de medição (Google Analytics) para entender como o site é usado e melhorar o conteúdo. Só ativamos após o seu aceite.{" "}
          <a href="/politica-de-privacidade" className="text-link">Política de privacidade</a>.
        </p>
        <div className="consent-actions">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setConsent(false); setVisible(false); }}>
            Recusar
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => { setConsent(true); loadAnalytics(); setVisible(false); }}>
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}