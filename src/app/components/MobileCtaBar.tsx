import { BRAND, PHONE_DISPLAY, WHATSAPP_LINK } from "../content";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { track } from "../../lib/track";

export function MobileCtaBar({ whatsappMessage }: { whatsappMessage?: string }) {
  const wa = whatsappMessage
    ? `https://wa.me/5519982731890?text=${encodeURIComponent(whatsappMessage)}`
    : WHATSAPP_LINK;
  return (
    <div className="mobile-cta-bar" role="group" aria-label="Contato rápido">
      <a href={wa} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${BRAND}`} className="mobile-cta-btn mobile-cta-wa" onClick={() => track("whatsapp_click", { page: typeof window !== "undefined" ? window.location.pathname : "/", position: "mobile_bar" })}>
        <WhatsAppIcon /> WhatsApp
      </a>
      <a href="tel:+5519982731890" aria-label={`Ligar para ${BRAND}`} className="mobile-cta-btn mobile-cta-call" onClick={() => track("call_click", { page: typeof window !== "undefined" ? window.location.pathname : "/", position: "mobile_bar" })}>
        Ligar
      </a>
    </div>
  );
}
