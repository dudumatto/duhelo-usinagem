import { BRAND, CITY, EMAIL, PHONE_DISPLAY, PHONE_E164, whatsappUrl } from "../content";
import type { Landing } from "../serviceLandings";
import { ContactActions } from "../components/ContactActions";
import { Logo } from "../components/Logo";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { MobileCtaBar } from "../components/MobileCtaBar";
import { getPost } from "../blogPosts";

export function ServiceLandingPage({ landing }: { landing: Landing }) {
  const { slug, whatsappMessage } = landing;
  const waLink = whatsappUrl(whatsappMessage);
  const relatedPosts = landing.relatedPostSlugs.map((postSlug) => {
    const post = getPost(postSlug);
    if (!post) throw new Error(`Artigo relacionado ausente em ${slug}: ${postSlug}`);
    return post;
  });
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="header-inner">
          <a href="/" className="header-brand" aria-label={`${BRAND} - início`}><Logo className="logo logo-header" /></a>
          <nav aria-label="Navegação principal" className="header-nav"><ul><li><a href="/">Início</a></li><li><a href="/#servicos">Serviços</a></li><li><a href="/blog">Blog</a></li><li><a href="/#contato">Contato</a></li></ul></nav>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" data-cta-event="whatsapp_click" data-cta-position="header"><WhatsAppIcon /><span>Orçamento</span></a>
        </div>
      </header>
      <div className="sheet">
        <main id="conteudo" className="service-landing">
          <section className="zone-section" aria-labelledby="landing-title">
            <nav aria-label="Caminho da página" className="service-breadcrumb"><a href="/" className="text-link">Início</a> / <a href="/#servicos" className="text-link">Serviços</a></nav>
            <div className="section-head">
              <h1 id="landing-title">{landing.h1}</h1>
              <p>{landing.intro}</p>
            </div>
            <div className="hero-actions">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg" data-cta-event="whatsapp_click" data-cta-position="hero"><WhatsAppIcon />Pedir orçamento pelo WhatsApp</a>
              <a href={`tel:${PHONE_E164}`} className="btn btn-ghost btn-lg" data-cta-event="call_click" data-cta-position="hero">Ligar: {PHONE_DISPLAY}</a>
            </div>
            <p>Envie o desenho ou fotos da amostra também por e-mail: <a href={`mailto:${EMAIL}`} className="text-link" data-cta-event="email_click" data-cta-position="hero">{EMAIL}</a></p>
          </section>
          {landing.sections.map((section, index) => (
            <section key={section.h2} className="zone-section service-copy" aria-labelledby={`service-topic-${index + 1}`}>
              <h2 id={`service-topic-${index + 1}`}>{section.h2}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          <section className="zone-section service-copy" aria-labelledby="sending-reference">
            <h2 id="sending-reference">Como enviar desenho ou amostra</h2>
            <p>{landing.howToSend}</p>
            <ContactActions message={whatsappMessage} position="middle" className="hero-actions" />
          </section>
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
          <section className="zone-section service-copy" aria-labelledby="related-posts">
            <h2 id="related-posts">Artigos sobre usinagem</h2>
            <ul className="service-related">
              {relatedPosts.map((p) => (
                <li key={p.slug}>
                  <a href={`/blog/${p.slug}`} className="text-link">{p.title}</a> — {p.description}
                </li>
              ))}
            </ul>
          </section>
          <section className="zone-section service-copy" aria-labelledby="cta-landing">
            <h2 id="cta-landing">Envie seu desenho, foto ou amostra</h2>
            <p>A Duhelo avalia material, quantidade, aplicação e medidas críticas e retorna com orientação técnica e orçamento.</p>
            <ContactActions message={whatsappMessage} position="end" className="hero-actions" />
            <p>Envie o desenho ou fotos da amostra também por e-mail: <a href={`mailto:${EMAIL}`} className="text-link" data-cta-event="email_click" data-cta-position="end">{EMAIL}</a></p>
            <p><a href="/#contato" className="text-link">Localização e contato</a> · <a href="/blog" className="text-link">Blog de usinagem</a> · <a href="/politica-de-privacidade" className="text-link">Política de privacidade</a></p>
          </section>
        </main>
        <footer className="site-footer">
          <Logo className="logo logo-footer" />
          <div className="footer-text">
            <p><strong>{BRAND}</strong> · Usinagem, ferramentaria e manutenção industrial em {CITY}.</p>
            <p><a href={`tel:${PHONE_E164}`} data-cta-event="call_click" data-cta-position="footer">{PHONE_DISPLAY}</a> · <a href={`mailto:${EMAIL}`} data-cta-event="email_click" data-cta-position="footer">{EMAIL}</a></p>
          </div>
        </footer>
      </div>
      <MobileCtaBar whatsappMessage={whatsappMessage} />
    </>
  );
}
