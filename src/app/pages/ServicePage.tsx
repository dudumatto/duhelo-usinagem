import { BRAND, CITY, EMAIL, PHONE_DISPLAY, WHATSAPP_LINK, services } from "../content";
import { Logo } from "../components/Logo";
import { WhatsAppIcon } from "../components/WhatsAppIcon";

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function ServicePage({ slug }: { slug: string }) {
  const service = services.find((s) => slugify(s.title) === slug) ?? services[0];
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
          <section className="zone-section" aria-labelledby="service-title">
            <div className="section-head">
              <h1 id="service-title">{service.title}</h1>
              <p>{service.description}</p>
            </div>
            <p className="section-lead">{service.summary}</p>
            <ul className="spec-list" aria-label={`Detalhes: ${service.title}`}>
              {service.notes.map((note) => (<li key={note}>{note}</li>))}
            </ul>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg"><WhatsAppIcon />Pedir orçamento pelo WhatsApp</a>
          </section>
          <section className="zone-section" aria-labelledby="other-title">
            <h2 id="other-title">Outros serviços</h2>
            <ul>
              {services.filter((s) => s.item !== service.item).map((s) => (
                <li key={s.item}><a href={`/servicos/${slugify(s.title)}`}>{s.title}</a> — {s.summary}</li>
              ))}
            </ul>
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
    </>
  );
}
