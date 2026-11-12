import { useEffect } from "react";
import { BRAND } from "../content";
import { formatPostDate, getPost, getRelatedPosts } from "../blogPosts";
import { ContentLayout } from "../components/ContentLayout";
import { ContactActions } from "../components/ContactActions";
import { track } from "../../lib/track";

export function BlogPost({ slug }: { slug: string }) {
  useEffect(() => {
    let fired = false;
    const onScroll = () => {
      if (fired) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total >= 0.75) {
        fired = true;
        track("blog_scroll_75", { page: `/blog/${slug}` });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  const post = getPost(slug);
  if (!post) {
    return (
      <ContentLayout>
        <section className="zone-section"><h1>Artigo não encontrado</h1><p><a href="/blog" className="text-link">Voltar ao blog</a></p></section>
      </ContentLayout>
    );
  }

  const related = getRelatedPosts(post);
  const whatsappMessage = `Olá, li o artigo “${post.title}” e gostaria de um orçamento de usinagem.`;

  return (
    <ContentLayout whatsappMessage={whatsappMessage}>
      <article aria-labelledby="post-title">
        <section className="zone-section">
          <div className="blog-width">
            <nav className="blog-breadcrumb" aria-label="Caminho da página">
              <a href="/" className="text-link">Início</a> / <a href="/blog" className="text-link">Blog</a> /{" "}
              <a href={`/blog#${post.category.slug}`} className="text-link">{post.category.label}</a>
            </nav>
            <h1 id="post-title" className="blog-title">{post.title}</h1>
            <p className="blog-meta blog-byline">
              {BRAND} · {post.date === post.updated ? (
                <>Publicado e atualizado em <time dateTime={post.date}>{formatPostDate(post.date)}</time></>
              ) : (
                <>Publicado em <time dateTime={post.date}>{formatPostDate(post.date)}</time> · Atualizado em <time dateTime={post.updated}>{formatPostDate(post.updated)}</time></>
              )} · {post.readingMinutes} min de leitura
            </p>
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.introHtml }} />
            <nav className="blog-toc" aria-labelledby="post-toc-title">
              <h2 id="post-toc-title">Neste artigo</h2>
              <ol>
                {post.headings.map(({ id, text }) => <li key={id}><a className="text-link" href={`#${id}`}>{text}</a></li>)}
              </ol>
            </nav>
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.bodyStartHtml }} />
            <aside className="blog-prose cta-inline" aria-label="Orçamento de usinagem">
              <ContactActions message={whatsappMessage} position="middle" />
            </aside>
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.bodyEndHtml }} />
          </div>
        </section>
        {related.length > 0 && (
          <section className="zone-section blog-related" aria-labelledby="related-posts">
            <div className="blog-width">
              <h2 id="related-posts">Artigos relacionados</h2>
              <ul className="blog-cards">
                {related.map((other) => (
                  <li key={other.slug} className="blog-card">
                    <h3><a href={`/blog/${other.slug}`} className="text-link">{other.title}</a></h3>
                    <p>{other.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
        <section className="zone-section blog-cta" aria-labelledby="post-cta">
          <div className="blog-width">
            <h2 id="post-cta">Precisa usinar ou recuperar uma peça?</h2>
            <p className="section-lead">Veja os detalhes do serviço <a className="text-link" href={`/${post.service.slug}`}>{post.service.h1}</a>. Para pedir orçamento, envie o desenho ou fotos da amostra.</p>
            <ContactActions message={whatsappMessage} position="end" />
          </div>
        </section>
      </article>
    </ContentLayout>
  );
}
