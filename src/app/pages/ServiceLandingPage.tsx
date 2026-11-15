import { ArrowDown } from "lucide-react";
import type { Landing } from "../serviceLandings";
import { ContentLayout } from "../components/ContentLayout";
import { ContentQuote } from "../components/ContentQuote";
import { Cover, HERO_COVER_SIZES } from "../components/Cover";
import { PostCards } from "../components/PostCards";
import { getPost } from "../blogPosts";

export function ServiceLandingPage({ landing }: { landing: Landing }) {
  const { slug, whatsappMessage } = landing;
  const relatedPosts = landing.relatedPostSlugs.map((postSlug) => {
    const post = getPost(postSlug);
    if (!post) throw new Error(`Artigo relacionado ausente em ${slug}: ${postSlug}`);
    return post;
  });

  return (
    <ContentLayout whatsappMessage={whatsappMessage}>
      <div className="content-section content-hero">
        <div className="content-width">
          <nav className="content-breadcrumb" aria-label="Caminho da página">
            <a href="/" className="text-link">Início</a><span aria-hidden="true">/</span>
            <a href="/#servicos" className="text-link">Serviços</a>
          </nav>
          <div className="content-hero-grid">
            <div>
              <h1>{landing.h1}</h1>
              <p className="section-lead">{landing.intro}</p>
              <a href="#orcamento" className="btn btn-primary content-hero-action">
                Como pedir orçamento<ArrowDown className="icon" aria-hidden="true" />
              </a>
            </div>
            <Cover source={landing.cover} sizes={HERO_COVER_SIZES} priority />
          </div>
        </div>
      </div>

      <section className="content-section" aria-labelledby="service-topics">
        <div className="content-width">
          <h2 id="service-topics">Aplicações e especificações</h2>
          <div className="service-topics">
            {landing.sections.map((section) => (
              <div key={section.h2} className="service-topic">
                <h3>{section.h2}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section content-panel" aria-labelledby="faq-landing">
        <div className="content-width service-faq">
          <h2 id="faq-landing">Perguntas frequentes</h2>
          <div className="faq-list">
            {landing.faqs.map((faq) => (
              <details key={faq.q}>
                <summary><span>{faq.q}</span><span className="faq-mark" aria-hidden="true" /></summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContentQuote title="O que preparar para o orçamento" message={whatsappMessage}>
        <ul>{landing.quoteDetails.map((detail) => <li key={detail}>{detail}</li>)}</ul>
      </ContentQuote>

      <section className="content-section" aria-labelledby="related-posts">
        <div className="content-width">
          <h2 id="related-posts">Artigos relacionados</h2>
          <PostCards posts={relatedPosts} />
        </div>
      </section>
    </ContentLayout>
  );
}
