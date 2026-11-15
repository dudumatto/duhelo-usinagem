import type { ReactNode } from "react";
import { EMAIL, EMAIL_COMPOSE_URL } from "../content";
import { ContactActions } from "./ContactActions";

export function ContentQuote({ title, message, children }: {
  title: string;
  message: string;
  children?: ReactNode;
}) {
  return (
    <section id="orcamento" className="content-section content-quote contact-section" aria-labelledby="content-quote-title">
      <div className="content-width content-quote-grid">
        <div>
          <h2 id="content-quote-title">{title}</h2>
          {children}
        </div>
        <div className="content-quote-actions">
          <ContactActions label="Pedir orçamento pelo WhatsApp" message={message} position="end" />
          <a href={EMAIL_COMPOSE_URL} data-cta-event="email_click" data-cta-position="end">{EMAIL}</a>
        </div>
      </div>
    </section>
  );
}
