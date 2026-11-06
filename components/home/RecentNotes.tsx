import Link from "next/link";
import { notes } from "@/lib/notes";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function RecentNotes() {
  const recent = notes.slice(0, 3);

  return (
    <section
      className="section-spacing"
      style={{ borderBottom: "1px solid var(--border)" }}
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
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="note-row-hover"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "24px",
                padding: "24px 16px",
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
                {String(i + 1).padStart(2, "0")} — {note.category.toUpperCase().slice(0, 2)}
              </span>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "var(--text-primary)",
                    marginBottom: "6px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {note.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "14px",
                    lineHeight: 1.6,
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
                    marginTop: "10px",
                  }}
                >
                  {note.category.toUpperCase()} · {note.readingTime.toUpperCase()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
