"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { notes } from "@/lib/notes";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function RecentNotes() {
  const recent = notes.slice(0, 3);

  return (
    <section
      className="section-spacing"
      style={{ borderBottom: "1px solid var(--border)", position: "relative" }}
      aria-labelledby="notes-heading"
    >
      <div className="container-main">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "56px" }}>
          <SectionHeading number="04 / ENGINEERING NOTES" title="Thoughts from building software" />
          <Link
            href="/notes"
            className="link-underline"
            style={{
              fontSize: "11px",
              whiteSpace: "nowrap",
              paddingTop: "4px",
            }}
          >
            All notes →
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {recent.map((note, i) => (
            <motion.div
              key={note.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              <Link
                href={`/notes/${note.slug}`}
                className="note-row-hover"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "24px",
                  padding: "26px 16px",
                  margin: "0 -16px",
                  borderTop: i === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: "1px solid var(--border)",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    color: "var(--text-muted)",
                    paddingTop: "4px",
                    minWidth: "60px",
                  }}
                >
                  0{i + 1} — {note.category.toUpperCase().slice(0, 3)}
                </span>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 400,
                      color: "var(--text-primary)",
                      marginBottom: "8px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {note.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                      lineHeight: 1.65,
                    }}
                  >
                    {note.summary}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      color: "var(--text-muted)",
                      marginTop: "12px",
                    }}
                  >
                    {note.category.toUpperCase()} · {note.readingTime.toUpperCase()}
                  </p>
                </div>
                <span style={{ color: "var(--text-muted)", paddingTop: "4px" }}>→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
