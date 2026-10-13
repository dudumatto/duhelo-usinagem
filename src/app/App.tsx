import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FlangeDrawing, ShaftRecoveryDrawing } from "./components/Drawings";
import {
  BRAND,
  CITY,
  EMAIL,
  MAPS_LINK,
  MATERIALS,
  PHONE_DISPLAY,
  PHONE_E164,
  WHATSAPP_LINK,
  differentiators,
  equipment,
  faqs,
  navLinks,
  processSteps,
  quoteNotes,
  services,
  technicalChecks,
} from "./content";

const YEAR = new Date().getFullYear();

function WhatsAppIcon({ className = "icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.44-9.44 9.44m8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.3l5.68-1.49a11.33 11.33 0 0 0 5.78 1.47h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.89-3.33-8.04"
      />
    </svg>
  );
}

function Photo({
  name,
  alt,
  sizes,
  priority = false,
  position,
  className,
}: {
  name: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  position?: string;
  className?: string;
}) {
  const base = `/images/opt/${name}`;
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={`${base}-480.webp 480w, ${base}-800.webp 800w, ${base}-1200.webp 1200w`} sizes={sizes} />
      <img
        src={`/images/${name}.jpg`}
        alt={alt}
        width={1200}
        height={799}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        {...(priority ? { fetchpriority: "high" } : {})}
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  );
}

function Logo({ className = "logo" }: { className?: string }) {
  return (
    <picture>
      <source type="image/webp" srcSet="/images/opt/duhelo-logo.webp" />
      <img src="/images/opt/duhelo-logo.png" alt={BRAND} width={220} height={160} className={className} />
    </picture>
  );
}

function Zone({ letter }: { letter: string }) {
  return (
    <span className="zone" aria-hidden="true">
      {letter}
    </span>
  );
}

function TitleBlock() {
  return (
    <dl className="title-block" aria-label="Dados da empresa">
      <div className="tb-cell tb-wide">
        <dt>Empresa</dt>
        <dd>{BRAND}</dd>
      </div>
      <div className="tb-cell">
        <dt>Local</dt>
        <dd>{CITY}</dd>
      </div>
      <div className="tb-cell">
        <dt>Processos</dt>
        <dd>Torno CNC · Torno convencional · Fresa</dd>
      </div>
      <div className="tb-cell tb-wide">
        <dt>Materiais</dt>
        <dd>{MATERIALS.join(" · ")}</dd>
      </div>
      <div className="tb-cell">
        <dt>WhatsApp</dt>
        <dd>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            {PHONE_DISPLAY}
          </a>
        </dd>
      </div>
      <div className="tb-cell tb-sheet">
        <dt>Folha</dt>
        <dd>01/01</dd>
      </div>
    </dl>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <header className="site-header">
        <div className="header-inner">
          <a href="#topo" className="header-brand" aria-label={`${BRAND} - início`}>
            <Logo className="logo logo-header" />
          </a>
          <nav aria-label="Navegação principal" className="header-nav">
            <ul>
              {navLinks.map(([label, href]) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            <WhatsAppIcon />
            <span>Orçamento</span>
          </a>
        </div>
        <div className="ruler" aria-hidden="true">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </header>

      <div className="sheet">
        <main id="conteudo">
          {/* A — Vista principal */}
          <section id="topo" className="hero zone-section" aria-labelledby="hero-title">
            <Zone letter="A" />
            <div className="hero-grid">
              <div className="hero-copy">
                <h1 id="hero-title">
                  Usinagem de precisão sob desenho, amostra ou <span className="hl">peça gasta</span>.
                </h1>
                <p className="hero-lead">
                  Em {CITY}, com torno CNC, torno convencional e fresadora para fabricar, produzir em lote e recuperar peças industriais. Mande o
                  desenho ou a foto da peça e receba o orçamento pelo WhatsApp.
                </p>
                <div className="hero-actions">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                    <WhatsAppIcon />
                    Enviar desenho pelo WhatsApp
                  </a>
                  <a href="#orcamento" className="btn btn-ghost btn-lg">
                    Como pedir orçamento
                    <ArrowRight className="icon" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <figure className="hero-figure">
                <div className="view-panel">
                  <span className="view-tag" aria-hidden="true">
                    Desenho
                  </span>
                  <FlangeDrawing />
                </div>
                <div className="hero-photo">
                  <Photo
                    name="card-usinagem-customizada"
                    alt="Flange de aço usinado com bucha de bronze, fabricado pela Duhelo Usinagem"
                    sizes="(min-width: 1024px) 26vw, 60vw"
                    priority
                  />
                  <svg className="photo-callout" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <circle cx="232" cy="178" r="4" />
                    <polyline points="232,178 200,214 186,214" />
                  </svg>
                  <span className="photo-plate" aria-hidden="true">
                    Bucha de bronze
                  </span>
                  <span className="view-tag view-tag-photo" aria-hidden="true">
                    Peça
                  </span>
                </div>
                <figcaption className="sr-only">Do desenho técnico à peça usinada.</figcaption>
              </figure>
            </div>
            <TitleBlock />
          </section>

          {/* B — Lista de peças / serviços */}
          <section id="servicos" className="zone-section" aria-labelledby="services-title">
            <Zone letter="B" />
            <div className="section-head">
              <h2 id="services-title">Serviços de usinagem</h2>
              <p>Do item único fora de catálogo ao lote com padrão de medida, e a manutenção que tira a máquina da parada.</p>
            </div>

            <ol className="parts-list">
              {services.map((service) => (
                <li key={service.item} className={`part-row ${service.photo ? "has-photo" : "no-photo"}`}>
                  <div className="part-text">
                    <span className="balloon" aria-hidden="true">
                      {service.item}
                    </span>
                    <h3>{service.title}</h3>
                    <p className="part-summary">{service.summary}</p>
                    <p className="part-desc">{service.description}</p>
                    <ul className="spec-list" aria-label={`Detalhes: ${service.title}`}>
                      {service.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="part-media">
                    {service.photo ? (
                      <Photo name={service.photo.name} alt={service.photo.alt} sizes="(min-width: 1024px) 40vw, 92vw" position={service.photo.position} />
                    ) : service.item === 4 ? (
                      <div className="view-panel view-panel-flat">
                        <ShaftRecoveryDrawing />
                      </div>
                    ) : (
                      <table className="material-table">
                        <caption>Materiais usinados</caption>
                        <thead>
                          <tr>
                            <th scope="col">Material</th>
                            <th scope="col">Uso típico</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>Aço carbono</td><td>Eixos, flanges, suportes</td></tr>
                          <tr><td>Aço inox</td><td>Peças expostas a corrosão</td></tr>
                          <tr><td>Alumínio</td><td>Peças leves, dispositivos</td></tr>
                          <tr><td>Bronze e latão</td><td>Buchas e mancais</td></tr>
                          <tr><td>UHMW e nylon</td><td>Guias e peças de desgaste</td></tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* C — Notas gerais / orçamento */}
          <section id="orcamento" className="zone-section notes-section" aria-labelledby="quote-title">
            <Zone letter="C" />
            <div className="notes-grid">
              <div>
                <h2 id="quote-title">Como pedir seu orçamento</h2>
                <p className="section-lead">Quanto mais completa a informação, mais preciso e rápido é o retorno.</p>
                <ol className="notes">
                  {quoteNotes.map((note) => (
                    <li key={note.title}>
                      <h3>{note.title}</h3>
                      <p>{note.text}</p>
                    </li>
                  ))}
                </ol>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                  <WhatsAppIcon />
                  Enviar dados da peça
                </a>
              </div>

              <aside className="checks" aria-labelledby="checks-title">
                <h3 id="checks-title">O que avaliamos antes de produzir</h3>
                <ul>
                  {technicalChecks.map((check) => (
                    <li key={check}>
                      <span className="check-box" aria-hidden="true">
                        <svg viewBox="0 0 16 16">
                          <path d="M3 8.5 6.5 12 13 4.5" />
                        </svg>
                      </span>
                      {check}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>

          {/* D — Estrutura e processo */}
          <section id="estrutura" className="zone-section" aria-labelledby="structure-title">
            <Zone letter="D" />
            <div className="section-head">
              <h2 id="structure-title">Equipamentos e processo</h2>
              <p>Estrutura para peça única, manutenção e lotes, com o mesmo controle do desenho à entrega.</p>
            </div>

            <div className="equipment">
              {equipment.map((item) => (
                <article key={item.name} className="equipment-item">
                  <h3>{item.name}</h3>
                  <p>{item.use}</p>
                </article>
              ))}
            </div>

            <div className="process" aria-labelledby="process-title">
              <h3 id="process-title">Da necessidade à peça pronta</h3>
              <ol className="process-line">
                {processSteps.map((step, index) => (
                  <li key={step.title}>
                    <span className="process-step-no" aria-hidden="true">
                      Etapa {index + 1}
                    </span>
                    <strong>{step.title}</strong>
                    <span className="process-step-text">{step.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* E — Diferenciais */}
          <section className="zone-section" aria-labelledby="why-title">
            <Zone letter="E" />
            <div className="why-grid">
              <h2 id="why-title">Método técnico antes de promessa</h2>
              <dl className="why-list">
                {differentiators.map((item) => (
                  <div key={item.title}>
                    <dt>{item.title}</dt>
                    <dd>{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* F — Dúvidas */}
          <section id="duvidas" className="zone-section" aria-labelledby="faq-title">
            <Zone letter="F" />
            <div className="faq-grid">
              <div className="section-head section-head-stack">
                <h2 id="faq-title">Perguntas frequentes</h2>
                <p>
                  Não achou sua dúvida?{" "}
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-link">
                    Pergunte pelo WhatsApp
                  </a>
                  .
                </p>
              </div>
              <div className="faq-list">
                {faqs.map((faq) => (
                  <details key={faq.q}>
                    <summary>
                      <span>{faq.q}</span>
                      <span className="faq-mark" aria-hidden="true" />
                    </summary>
                    <p>{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* G — Contato / carimbo final */}
          <section id="contato" className="zone-section contact-section" aria-labelledby="cta-title">
            <Zone letter="G" />
            <div className="contact-block">
              <div className="contact-main">
                <h2 id="cta-title">Envie seu desenho, foto ou amostra</h2>
                <p>A Duhelo avalia material, quantidade, aplicação e medidas críticas e retorna com orientação técnica e orçamento.</p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-xl">
                  <WhatsAppIcon />
                  Pedir orçamento pelo WhatsApp
                </a>
              </div>
              <address className="contact-cells">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="contact-cell">
                  <span className="cell-label">
                    <Phone className="icon" aria-hidden="true" /> Telefone / WhatsApp
                  </span>
                  <strong>{PHONE_DISPLAY}</strong>
                  <ArrowUpRight className="icon cell-arrow" aria-hidden="true" />
                </a>
                <a href={`mailto:${EMAIL}`} className="contact-cell">
                  <span className="cell-label">
                    <Mail className="icon" aria-hidden="true" /> E-mail
                  </span>
                  <strong>{EMAIL}</strong>
                  <ArrowUpRight className="icon cell-arrow" aria-hidden="true" />
                </a>
                <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="contact-cell">
                  <span className="cell-label">
                    <MapPin className="icon" aria-hidden="true" /> Localização
                  </span>
                  <strong>{CITY}</strong>
                  <ArrowUpRight className="icon cell-arrow" aria-hidden="true" />
                </a>
              </address>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <Logo className="logo logo-footer" />
          <div className="footer-text">
            <p>
              <strong>{BRAND}</strong> · Usinagem, ferramentaria e manutenção industrial em {CITY}.
            </p>
            <p>
              <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
            <p className="footer-legal">
              © {YEAR} {BRAND}. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>

      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mobile-cta">
        <WhatsAppIcon />
        Enviar desenho pelo WhatsApp
      </a>
    </>
  );
}
