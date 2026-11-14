import { type Landing } from "../serviceLandings";
import { ContentCard } from "./ContentCards";
import { CARD_COVER_SIZES, Cover } from "./Cover";

export function ServiceCards({ items }: { items: Landing[] }) {
  return (
    <ul className="content-cards">
      {items.map((landing) => (
        <ContentCard
          key={landing.slug}
          href={`/${landing.slug}`}
          title={landing.cardTitle}
          description={landing.cardDescription}
          label="Saiba mais"
          media={<Cover source={landing.cover} sizes={CARD_COVER_SIZES} />}
        />
      ))}
    </ul>
  );
}
