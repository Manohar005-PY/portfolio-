"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setTheme((stored as "dark" | "light") || preferred);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  if (!mounted) return <div style={{ width: 20, height: 20 }} />;

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--text-secondary)",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "color var(--ease-fast)",
        borderRadius: "var(--radius-sm)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
