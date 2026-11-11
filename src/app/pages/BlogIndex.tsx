import { blogCategories, blogDescription, formatPostDate, posts } from "../blogPosts";
import { ContentLayout } from "../components/ContentLayout";

export function BlogIndex() {
  return (
    <ContentLayout activePage="blog">
      <section className="zone-section" aria-labelledby="blog-title">
        <div className="blog-width">
          <h1 id="blog-title" className="blog-title">Blog da Duhelo Usinagem</h1>
          <p className="section-lead blog-summary">{blogDescription}</p>
          <nav className="blog-categories" aria-label="Categorias do blog">
            <ul>
              {blogCategories.map((category) => (
                <li key={category.slug}><a className="text-link" href={`#${category.slug}`}>{category.label}</a></li>
              ))}
            </ul>
          </nav>
          <a href="/blog/feed.xml" className="text-link">Acompanhar pelo RSS</a>
        </div>
      </section>
      {blogCategories.map((category) => (
        <section id={category.slug} className="zone-section blog-category" aria-labelledby={`categoria-${category.slug}`} key={category.slug}>
          <div className="blog-width">
            <h2 id={`categoria-${category.slug}`}>{category.label}</h2>
            <ul className="blog-cards">
              {posts.filter((post) => post.category === category).map((post) => (
                <li key={post.slug}>
                  <article className="blog-card">
                    <h3><a className="text-link" href={`/blog/${post.slug}`}>{post.title}</a></h3>
                    <p>{post.description}</p>
                    <p className="blog-meta"><time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingMinutes} min de leitura</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </ContentLayout>
  );
}
