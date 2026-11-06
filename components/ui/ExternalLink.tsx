import { ReactNode } from "react";

interface ExternalLinkProps {
  href: string;
  label: string;
  children: ReactNode;
}

export function ExternalLink({ href, label, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="link-underline"
      style={{ fontSize: "14px" }}
    >
      {children}
    </a>
  );
}
