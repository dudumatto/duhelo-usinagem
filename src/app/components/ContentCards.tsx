import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function ContentCard({ href, title, description, label, media, meta }: {
  href: string;
  title: string;
  description: string;
  label: string;
  media?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <li className="content-card">
      {media}
      <div className="content-card-body">
        {meta && <p className="blog-meta">{meta}</p>}
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={href} className="btn btn-index" aria-label={`${label}: ${title}`}>
          {label}<ArrowRight className="icon" aria-hidden="true" />
        </a>
      </div>
    </li>
  );
}
