import type { ReactNode } from "react";
import { BRAND, CITY, whatsappUrl } from "../content";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { MobileCtaBar } from "./MobileCtaBar";
import { ConsentBanner } from "./ConsentBanner";

export function ContentLayout({ children, activePage, whatsappMessage }: { children: ReactNode; activePage?: "blog" | "about"; whatsappMessage?: string }) {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="header-inner">
          <a href="/" className="header-brand" aria-label={`${BRAND} - início`}><Logo className="logo logo-header" /></a>
          <nav aria-label="Navegação principal" className="header-nav">
            <ul>
              <li><a href="/">Início</a></li>
              <li><a href="/#servicos">Serviços</a></li>
              <li><a href="/blog" aria-current={activePage === "blog" ? "page" : undefined}>Blog</a></li>
              <li><a href="/sobre" aria-current={activePage === "about" ? "page" : undefined}>Sobre</a></li>
              <li><a href="/#contato">Contato</a></li>
            </ul>
          </nav>
          <a href={whatsappUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" data-cta-event="whatsapp_click" data-cta-position="header"><WhatsAppIcon /><span>Orçamento</span></a>
        </div>
      </header>
      <div className="sheet">
        <main id="conteudo">{children}</main>
        <footer className="site-footer">
          <Logo className="logo logo-footer" />
          <div className="footer-text">
            <p><strong>{BRAND}</strong> · Usinagem, ferramentaria e manutenção industrial em {CITY}.</p>
            <p>
              {activePage !== "about" && <><a href="/sobre">Sobre a Duhelo</a> · </>}
              <a href="/#contato">Contato</a> · <a href="/politica-de-privacidade">Política de privacidade</a>
            </p>
          </div>
        </footer>
      </div>
      <MobileCtaBar whatsappMessage={whatsappMessage} />
      <ConsentBanner />
    </>
  );
}
