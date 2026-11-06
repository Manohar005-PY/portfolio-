"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { notes } from "@/lib/notes";

export default function NotesPage() {
  return (
    <div className="container-main" style={{ paddingTop: "80px", paddingBottom: "112px", position: "relative" }}>
      {/* Header */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: "72px", maxWidth: "680px" }}
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px" }}>
          WRITING / ENGINEERING NOTES
        </p>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "18px", lineHeight: 1.1 }}>
          Thoughts from building software.
        </h1>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, fontSize: "16px" }}>
          Technical notes, implementation decisions, and lessons learned while working with backend applications,
          database consistency, and distributed workers.
        </p>
      </motion.div>

      {/* Featured note with Motion hover */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        style={{ marginBottom: "64px" }}
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px" }}>
          FEATURED NOTE / {notes[0]?.category.toUpperCase()}
        </p>
        <motion.div
          whileHover={{ y: -4, borderColor: "var(--border-hover)" }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        >
          <Link
            href={`/notes/${notes[0].slug}`}
            style={{
              display: "block",
              padding: "36px",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              transition: "border-color 150ms ease",
            }}
          >
            <h2 style={{ fontSize: "24px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)", marginBottom: "14px" }}>
              {notes[0].title}
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "20px", fontSize: "15px" }}>
              {notes[0].summary}
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
              {notes[0].readingTime.toUpperCase()} · {notes[0].tags.join(" · ")} · Read full article ↗
            </p>
          </Link>
        </motion.div>
      </motion.div>

      {/* All notes */}
      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "24px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
          ALL TECHNICAL NOTES
        </p>
        {notes.map((note, i) => (
          <motion.div
            key={note.slug}
            transition={{ duration: 0.35, delay: i * 0.08 }}
          >
            <Link
              href={`/notes/${note.slug}`}
              className="note-row-hover"
              style={{
                display: "flex",
                gap: "24px",
                alignItems: "flex-start",
                padding: "26px 16px",
                margin: "0 -16px",
                borderBottom: "1px solid var(--border)",
                textDecoration: "none",
              }}
            >
              <div style={{ minWidth: "80px", paddingTop: "2px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
                  0{i + 1}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "6px" }}>
                  {note.category.toUpperCase()}
                </p>
                <h3 style={{ fontSize: "18px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                  {note.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.65, marginBottom: "10px" }}>
                  {note.summary}
                </p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
                  {note.readingTime.toUpperCase()} · {note.publishedAt}
                </p>
              </div>
              <span style={{ color: "var(--text-muted)", paddingTop: "4px" }}>→</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
