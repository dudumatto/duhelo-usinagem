import { BRAND, PHONE_E164, whatsappUrl } from "../content";
import { WhatsAppIcon } from "./WhatsAppIcon";

const drawingLabel = "Enviar desenho pelo WhatsApp";

export function ContactActions({ message, position, className = "hero-actions", label = drawingLabel }: {
  message: string;
  position: string;
  className?: string;
  label?: string;
}) {
  return (
    <div className={className}>
      <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg" data-cta-event="whatsapp_click" data-cta-position={position} data-drawing-cta={label === drawingLabel ? "" : undefined}>
        <WhatsAppIcon /> {label}
      </a>
      <a href={`tel:${PHONE_E164}`} className="btn btn-ghost btn-lg" aria-label={`Ligar para ${BRAND}`} data-cta-event="call_click" data-cta-position={position}>
        Ligar
      </a>
    </div>
  );
}
