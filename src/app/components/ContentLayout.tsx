import type { ReactNode } from "react";
import { BRAND, CITY, EMAIL, EMAIL_COMPOSE_URL, PHONE_DISPLAY, PHONE_E164, whatsappUrl } from "../content";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { MobileCtaBar } from "./MobileCtaBar";
import { HeaderNav } from "./HeaderNav";

export function ContentLayout({ children, activePage, whatsappMessage }: { children: ReactNode; activePage?: "blog" | "about"; whatsappMessage?: string }) {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="header-inner">
          <a href="/" className="header-brand" aria-label={`${BRAND} - início`}><Logo className="logo logo-header" /></a>
          <HeaderNav>
              <li><a href="/">Início</a></li>
              <li><a href="/#servicos">Serviços</a></li>
              <li><a href="/blog" aria-current={activePage === "blog" ? "page" : undefined}>Blog</a></li>
              <li><a href="/sobre" aria-current={activePage === "about" ? "page" : undefined}>Sobre</a></li>
              <li><a href="/#contato">Contato</a></li>
          </HeaderNav>
          <a href={whatsappUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" data-cta-event="whatsapp_click" data-cta-position="header"><WhatsAppIcon /><span>Orçamento</span></a>
        </div>
      </header>
      <div className="sheet content-sheet">
        <main id="conteudo" className="content-main">{children}</main>
        <footer className="site-footer">
          <Logo className="logo logo-footer" />
          <div className="footer-text">
            <p><strong>{BRAND}</strong> · Usinagem, ferramentaria e manutenção industrial em {CITY}.</p>
            <p>
              <a href={`tel:${PHONE_E164}`} data-cta-event="call_click" data-cta-position="footer">{PHONE_DISPLAY}</a> ·{" "}
              <a href={EMAIL_COMPOSE_URL} data-cta-event="email_click" data-cta-position="footer">{EMAIL}</a>
            </p>
            <p>
              <a href="/#contato">Localização</a> · <a href="/blog">Blog</a> · <a href="/sobre">Sobre</a> ·{" "}
              <a href="/politica-de-privacidade">Política de privacidade</a>
            </p>
          </div>
        </footer>
      </div>
      <MobileCtaBar whatsappMessage={whatsappMessage} />
    </>
  );
}
