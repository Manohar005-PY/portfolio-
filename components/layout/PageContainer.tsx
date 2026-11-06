import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  narrow?: boolean;
}

export function PageContainer({ children, narrow }: PageContainerProps) {
  return (
    <div
      className="container-main section-spacing"
      style={{ maxWidth: narrow ? "calc(var(--reading-width) + 160px)" : undefined }}
    >
      {children}
    </div>
  );
}
