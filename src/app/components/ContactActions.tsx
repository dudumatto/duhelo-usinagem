import { BRAND, PHONE_E164, whatsappUrl } from "../content";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function ContactActions({ message, position, className = "hero-actions" }: {
  message: string;
  position: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg" data-cta-event="whatsapp_click" data-cta-position={position}>
        <WhatsAppIcon /> Enviar desenho pelo WhatsApp
      </a>
      <a href={`tel:${PHONE_E164}`} className="btn btn-ghost btn-lg" aria-label={`Ligar para ${BRAND}`} data-cta-event="call_click" data-cta-position={position}>
        Ligar
      </a>
    </div>
  );
}
