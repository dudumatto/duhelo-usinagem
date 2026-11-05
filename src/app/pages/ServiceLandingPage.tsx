import { ArrowRight } from "lucide-react";
import { BRAND, CITY, EMAIL, PHONE_DISPLAY, WHATSAPP_LINK } from "../content";
import { landings } from "../serviceLandings";
import { Logo } from "../components/Logo";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { MobileCtaBar } from "../components/MobileCtaBar";
import { track } from "../../lib/track";

export function ServiceLandingPage({ slug }: { slug: string }) {
  const landing = landings.find((l) => l.slug === slug) ?? landings[0];
  const waLink = `https://wa.me/5519982731890?text=${encodeURIComponent(landing.whatsappMessage)}`;
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="header-inner">
          <a href="/" className="header-brand" aria-label={`${BRAND} - início`}><Logo className="logo logo-header" /></a>
          <nav aria-label="Navegação principal" className="header-nav"><ul><li><a href="/">Início</a></li><li><a href="/#servicos">Serviços</a></li><li><a href="/blog">Blog</a></li><li><a href="/#contato">Contato</a></li></ul></nav>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm"><WhatsAppIcon /><span>Orçamento</span></a>
        </div>
      </header>
      <div className="sheet">
        <main id="conteudo">
          <nav aria-label="Breadcrumb" className="breadcrumb"><a href="/">Início</a> / <span>{landing.h1}</span></nav>
          <section className="zone-section" aria-labelledby="landing-title">
            <div className="section-head">
              <h1 id="landing-title">{landing.h1}</h1>
              <p>{landing.intro}</p>
            </div>
            <div className="hero-actions">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg" onClick={() => track("whatsapp_click", { page: `/${slug}`, position: "cta" })}><WhatsAppIcon />Pedir orçamento pelo WhatsApp</a>
              <a href={`tel:+5519982731890`} className="btn btn-ghost btn-lg" onClick={() => track("call_click", { page: `/${slug}`, position: "cta" })}>Ligar: {PHONE_DISPLAY}</a>
            </div>
            <p>Envie desenho, foto ou amostra também por e-mail: <a href={`mailto:${EMAIL}`} className="text-link" onClick={() => track("email_click", { page: `/${slug}`, position: "cta" })}>{EMAIL}</a></p>
          </section>
          {landing.sections.map((s) => (
            <section key={s.h2} className="zone-section" aria-labelledby={s.h2}>
              <h2>{s.h2}</h2>
              <p>{s.body}</p>
            </section>
          ))}
          <section className="zone-section" aria-labelledby="faq-landing">
            <h2 id="faq-landing">Perguntas frequentes</h2>
            <div className="faq-list">
              {landing.faqs.map((f) => (
                <details key={f.q}>
                  <summary><span>{f.q}</span><span className="faq-mark" aria-hidden="true" /></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="zone-section" aria-labelledby="cta-landing">
            <h2 id="cta-landing">Envie seu desenho, foto ou amostra</h2>
            <p>A Duhelo avalia material, quantidade, aplicação e medidas críticas e retorna com orientação técnica e orçamento.</p>
            <div className="hero-actions">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg" onClick={() => track("whatsapp_click", { page: `/${slug}`, position: "cta" })}><WhatsAppIcon />Pedir orçamento pelo WhatsApp</a>
              <a href={`tel:+5519982731890`} className="btn btn-ghost btn-lg" onClick={() => track("call_click", { page: `/${slug}`, position: "cta" })}>Ligar: {PHONE_DISPLAY}</a>
            </div>
            <p>Envie desenho, foto ou amostra também por e-mail: <a href={`mailto:${EMAIL}`} className="text-link" onClick={() => track("email_click", { page: `/${slug}`, position: "cta" })}>{EMAIL}</a></p>
            <p><a href="/" className="text-link">Voltar para a home</a> · <a href="/blog" className="text-link">Ver blog</a></p>
          </section>
        </main>
        <footer className="site-footer">
          <Logo className="logo logo-footer" />
          <div className="footer-text">
            <p><strong>{BRAND}</strong> · Usinagem, ferramentaria e manutenção industrial em {CITY}.</p>
            <p><a href={`tel:+5519982731890`}>{PHONE_DISPLAY}</a> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          </div>
        </footer>
      </div>
      <MobileCtaBar whatsappMessage={landing.whatsappMessage} />
    </>
  );
}
