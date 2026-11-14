import { formatPostDate, type Post } from "../blogPosts";
import { ContentCard } from "./ContentCards";
import { CARD_COVER_SIZES, Cover } from "./Cover";

export function PostCards({ posts, showCover = false }: { posts: Post[]; showCover?: boolean }) {
  return (
    <ul className="content-cards">
      {posts.map((post) => (
        <ContentCard
          key={post.slug}
          href={`/blog/${post.slug}`}
          title={post.title}
          description={post.description}
          label="Ler artigo"
          meta={<><time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingMinutes} min de leitura</>}
          media={showCover ? <Cover source={post.cover} sizes={CARD_COVER_SIZES} /> : undefined}
        />
      ))}
    </ul>
  );
}
