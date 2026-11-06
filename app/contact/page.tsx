"use client";

import { motion } from "motion/react";
import { siteMetadata } from "@/lib/metadata";

export default function ContactPage() {
  return (
    <div className="container-main" style={{ paddingTop: "80px", paddingBottom: "112px", position: "relative" }}>
      <div style={{ maxWidth: "680px" }}>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px" }}>
            CONTACT / OPEN CONNECTION
          </p>
          <h1
            style={{
              fontSize: "clamp(30px, 5vw, 56px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: "24px",
              lineHeight: 1.1,
            }}
          >
            Let&apos;s talk about software and engineering.
          </h1>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "56px", fontSize: "16px" }}>
            Interested in backend development, distributed systems, and software engineering opportunities.
            Open to internship and engineering roles focused on reliable APIs, databases, and application infrastructure.
          </p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { label: "Direct Email", href: `mailto:${siteMetadata.email}`, display: siteMetadata.email },
            { label: "GitHub Profile", href: siteMetadata.github, display: "github.com/Manohar005-PY" },
            { label: "LinkedIn Connection", href: siteMetadata.linkedin, display: "linkedin.com/in/manohar-dilip-821a19303" },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 + idx * 0.1 }}
              whileHover={{ y: -3, scale: 1.01 }}
            >
              <a
                href={item.href}
                target={item.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "22px 28px",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--bg-surface)",
                  textDecoration: "none",
                  transition: "border-color 150ms ease, background-color 150ms ease",
                }}
                className="card-hover"
              >
                <div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "4px" }}>
                    {item.label.toUpperCase()}
                  </p>
                  <p style={{ color: "var(--text-primary)", fontSize: "16px" }}>{item.display}</p>
                </div>
                <span style={{ color: "var(--text-secondary)", fontSize: "20px" }}>→</span>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: "64px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}
        >
          {/* Decorative connection SVG */}
          <svg width="220" height="40" viewBox="0 0 220 40" fill="none" aria-hidden="true" style={{ opacity: 0.5 }}>
            <circle cx="10" cy="20" r="4" stroke="var(--border-hover)" strokeWidth="1" />
            <line x1="14" y1="20" x2="60" y2="20" stroke="var(--border)" strokeWidth="1.5" className="flowing-line" />
            <circle cx="64" cy="20" r="4" stroke="var(--border-hover)" strokeWidth="1" />
            <line x1="68" y1="20" x2="140" y2="20" stroke="var(--border)" strokeWidth="1.5" className="flowing-line-fast" />
            <circle cx="144" cy="20" r="4" stroke="var(--border-hover)" strokeWidth="1" />
            <line x1="148" y1="20" x2="206" y2="20" stroke="var(--border)" strokeWidth="1.5" className="flowing-line" />
            <circle cx="210" cy="20" r="4" stroke="var(--border-hover)" strokeWidth="1" fill="var(--border)" />
          </svg>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", marginTop: "14px", letterSpacing: "0.06em" }}>
            Direct point-to-point communication. No contact form queues.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
