import { BRAND, CITY, WHATSAPP_LINK } from "../content";
import { getPost } from "../blogPosts";
import { Logo } from "../components/Logo";
import { WhatsAppIcon } from "../components/WhatsAppIcon";

export function BlogPost({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) {
    return (
      <>
        <header className="site-header"><div className="header-inner"><a href="/" className="header-brand" aria-label={`${BRAND} - início`}><Logo className="logo logo-header" /></a></div></header>
        <main id="conteudo"><section className="zone-section"><h1>Artigo não encontrado</h1><p><a href="/blog" className="text-link">Voltar ao blog</a></p></section></main>
      </>
    );
  }
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
          <article>
            <section className="zone-section" aria-labelledby="post-title">
              <div className="section-head">
                <p><a href="/blog" className="text-link">← Blog</a> · {post.category} · {post.date}</p>
                <h1 id="post-title">{post.title}</h1>
                <p className="section-lead">{post.description}</p>
              </div>
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </section>
            <section className="zone-section" aria-labelledby="post-cta">
              <h2 id="post-cta">Precisa usinar uma peça?</h2>
              <p>Envie desenho, foto ou amostra pelo WhatsApp e receba orientação técnica e orçamento.</p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg"><WhatsAppIcon />Pedir orçamento pelo WhatsApp</a>
              <p><a href="/" className="text-link">Voltar para a home</a></p>
            </section>
          </article>
        </main>
        <footer className="site-footer">
          <Logo className="logo logo-footer" />
          <div className="footer-text">
            <p><strong>{BRAND}</strong> · Usinagem, ferramentaria e manutenção industrial em {CITY}.</p>
          </div>
        </footer>
      </div>
    </>
  );
}