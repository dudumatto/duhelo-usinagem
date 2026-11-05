import { BRAND } from "../content";

export function Logo({ className = "logo" }: { className?: string }) {
  return (
    <picture>
      <source type="image/webp" srcSet="/images/opt/duhelo-logo.webp" />
      <img src="/images/opt/duhelo-logo.png" alt={BRAND} width={220} height={160} className={className} />
    </picture>
  );
}