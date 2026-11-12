import { BRAND, PHONE_E164, whatsappUrl } from "../content";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function MobileCtaBar({ whatsappMessage }: { whatsappMessage?: string }) {
  return (
    <div className="mobile-cta-bar" role="group" aria-label="Contato rápido">
      <a href={whatsappUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${BRAND}`} className="mobile-cta-btn mobile-cta-wa" data-cta-event="whatsapp_click" data-cta-position="mobile_bar">
        <WhatsAppIcon /> WhatsApp
      </a>
      <a href={`tel:${PHONE_E164}`} aria-label={`Ligar para ${BRAND}`} className="mobile-cta-btn mobile-cta-call" data-cta-event="call_click" data-cta-position="mobile_bar">
        Ligar
      </a>
    </div>
  );
}
