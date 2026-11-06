"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileNav } from "@/components/layout/MobileNav";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const navLinks = [
  { href: "/projects", label: "WORK" },
  { href: "/notes", label: "NOTES" },
  { href: "/about", label: "ABOUT" },
  { href: "/credentials", label: "CERTS" },
  { href: "/resume", label: "RESUME" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: "76px",
          backgroundColor: scrolled ? "color-mix(in srgb, var(--bg-primary) 86%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
          transition: "border-color var(--ease-normal), background-color var(--ease-normal)",
        }}
      >
        <div
          className="container-main"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Personal brand */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: "var(--text-primary)",
                }}
              >
                MANOHAR<span style={{ color: "var(--accent-bright)" }}>.</span>
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            style={{ display: "flex", alignItems: "center", gap: "32px" }}
            className="hidden-mobile"
          >
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    position: "relative",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    padding: "6px 0",
                    transition: "color var(--ease-fast)",
                  }}
                  className="link-muted-hover"
                >
                  <span>{label}</span>
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        backgroundColor: "var(--text-primary)",
                      }}
                    />
                  )}
                </Link>
              );
            })}
            <ThemeToggle />
          </nav>

          {/* Mobile nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }} className="visible-mobile">
            <ThemeToggle />
            <MobileNav links={navLinks} currentPath={pathname} />
          </div>
        </div>
      </header>
    </>
  );
}
