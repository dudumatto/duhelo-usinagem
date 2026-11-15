import { EllipsisVertical } from "lucide-react";
import type { ReactNode } from "react";

export function HeaderNav({ children }: { children: ReactNode }) {
  return (
    <>
      <nav aria-label="Navegação principal" className="header-nav">
        <ul>{children}</ul>
      </nav>
      <details className="header-menu">
        <summary aria-label="Menu de navegação"><EllipsisVertical aria-hidden="true" /></summary>
        <nav aria-label="Navegação principal" className="header-menu-panel">
          <ul>{children}</ul>
        </nav>
      </details>
    </>
  );
}
