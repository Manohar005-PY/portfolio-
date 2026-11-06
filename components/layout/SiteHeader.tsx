"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
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
          backgroundColor: scrolled ? "rgba(11, 11, 11, 0.85)" : "transparent",
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
          {/* Logo as Manohar */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span className="radar-dot" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  color: "var(--text-primary)",
                  textTransform: "uppercase",
                }}
              >
                MANOHAR
              </span>
            </motion.div>
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
                    <motion.div
                      layoutId="activeNavIndicator"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        backgroundColor: "var(--text-primary)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
