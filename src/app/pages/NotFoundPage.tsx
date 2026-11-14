import { ContentLayout } from "../components/ContentLayout";

export function NotFoundPage() {
  return (
    <ContentLayout>
      <section className="content-section content-hero" aria-labelledby="not-found-title">
        <div className="reading-width">
          <p className="blog-meta">Erro 404</p>
          <h1 id="not-found-title">Página não encontrada</h1>
          <p className="section-lead">O endereço pode ter mudado. Volte ao início ou veja os serviços de usinagem da Duhelo.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="/">Voltar ao início</a>
            <a className="btn btn-ghost" href="/#servicos">Ver serviços</a>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
}
