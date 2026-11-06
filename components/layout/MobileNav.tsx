"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";

interface MobileNavProps {
  links: { href: string; label: string }[];
  currentPath: string;
}

export function MobileNav({ links, currentPath }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <button
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-primary)",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          role="presentation"
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
        />
      )}

      {/* Panel */}
      <nav
        id="mobile-nav-panel"
        aria-label="Mobile navigation"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "280px",
          backgroundColor: "var(--bg-surface)",
          borderLeft: "1px solid var(--border)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          padding: "80px 32px 40px",
          gap: "8px",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform var(--ease-normal)",
        }}
      >
        <button
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-secondary)",
            padding: "4px",
          }}
        >
          <X size={20} />
        </button>

        {links.map(({ href, label }) => {
          const isActive = currentPath === href || currentPath.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                letterSpacing: "0.1em",
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                padding: "12px 0",
                borderBottom: "1px solid var(--border)",
                transition: "color var(--ease-fast)",
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
