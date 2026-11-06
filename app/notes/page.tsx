import { notes } from "@/lib/notes";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Engineering Notes",
  description: "Technical notes, implementation decisions, and lessons learned while working with backend applications and software systems.",
});

export default function NotesPage() {
  return (
    <div className="container-main" style={{ paddingTop: "80px", paddingBottom: "112px" }}>
      {/* Header */}
      <div style={{ marginBottom: "72px", maxWidth: "680px" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px" }}>
          WRITING / ENGINEERING NOTES
        </p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "16px", lineHeight: 1.1 }}>
          Thoughts from building software.
        </h1>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
          Technical notes, implementation decisions, and lessons learned while working with backend applications and software systems.
        </p>
      </div>

      {/* Featured note */}
      <div style={{ marginBottom: "56px" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px" }}>
          FEATURED NOTE / {notes[0]?.category.toUpperCase()}
        </p>
        <Link
          href={`/notes/${notes[0].slug}`}
          className="card-hover"
          style={{
            display: "block",
            padding: "32px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg-surface)",
            borderRadius: "var(--radius-sm)",
            textDecoration: "none",
          }}
        >
          <h2 style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)", marginBottom: "12px" }}>
            {notes[0].title}
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "16px" }}>
            {notes[0].summary}
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
            {notes[0].readingTime.toUpperCase()} · {notes[0].tags.join(" · ")} · Read article ↗
          </p>
        </Link>
      </div>

      {/* All notes */}
      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "24px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
          ALL NOTES
        </p>
        {notes.map((note, i) => (
          <Link
            key={note.slug}
            href={`/notes/${note.slug}`}
            className="note-row-hover"
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "flex-start",
              padding: "24px 16px",
              margin: "0 -16px",
              borderBottom: "1px solid var(--border)",
              textDecoration: "none",
            }}
          >
            <div style={{ minWidth: "80px", paddingTop: "2px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px" }}>
                {note.category.toUpperCase()}
              </p>
              <h3 style={{ fontSize: "16px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "6px", letterSpacing: "-0.01em" }}>
                {note.title}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6, marginBottom: "8px" }}>
                {note.summary}
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
                {note.readingTime.toUpperCase()} · {note.publishedAt}
              </p>
            </div>
            <span style={{ color: "var(--text-muted)", paddingTop: "2px" }}>→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
