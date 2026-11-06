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
          backgroundColor: "var(--bg-primary)",
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
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "18px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              transition: "opacity var(--ease-fast)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            M.
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
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    borderBottom: isActive ? "1px solid var(--text-primary)" : "1px solid transparent",
                    paddingBottom: "2px",
                    transition: "color var(--ease-fast), border-color var(--ease-fast)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }
                  }}
                >
                  {label}
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
