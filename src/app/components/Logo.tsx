import { BRAND } from "../content";

export function Logo({ className = "logo" }: { className?: string }) {
  return (
    <picture>
      <source type="image/webp" srcSet="/images/opt/duhelo-logo-80.webp 80w, /images/opt/duhelo-logo-160.webp 160w, /images/opt/duhelo-logo.webp 225w" sizes={className.includes("logo-header") ? "71px" : "90px"} />
      <img src="/images/opt/duhelo-logo.png" alt={BRAND} width={225} height={160} className={className} />
    </picture>
  );
}
