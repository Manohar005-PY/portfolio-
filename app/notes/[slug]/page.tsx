import { notes, getNoteBySlug } from "@/lib/notes";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { CodeBlock } from "@/components/notes/CodeBlock";

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return {};
  return buildMetadata({ title: note.title, description: note.summary });
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  return (
    <div className="container-main" style={{ paddingTop: "72px", paddingBottom: "112px", maxWidth: "calc(var(--reading-width) + 160px)" }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "32px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
          <Link href="/notes" className="link-muted-hover">Notes</Link>
          {" / "}
          <span style={{ color: "var(--text-secondary)" }}>{note.category}</span>
        </span>
      </nav>

      <article style={{ maxWidth: "var(--reading-width)" }}>
        {/* Header */}
        <header style={{ marginBottom: "48px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px" }}>
            ENGINEERING NOTES / {note.category.toUpperCase()}
          </p>
          <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "16px", lineHeight: 1.2 }}>
            {note.title}
          </h1>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "20px", fontSize: "17px" }}>
            {note.summary}
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.08em", color: "var(--text-muted)", borderBottom: "1px solid var(--border)", paddingBottom: "24px" }}>
            MANOHAR · {note.readingTime.toUpperCase()} · {note.tags.join(" · ")} · {note.publishedAt}
          </p>
        </header>

        {/* Key Takeaways */}
        {note.takeaways && note.takeaways.length > 0 && (
          <div
            style={{
              padding: "24px",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "var(--bg-surface)",
              marginBottom: "56px",
            }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px" }}>
              KEY ARCHITECTURAL TAKEAWAYS
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {note.takeaways.map((point, i) => (
                <li key={i} style={{ display: "flex", gap: "12px", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>0{i + 1}.</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Sections */}
        {note.sections.map((section, idx) => (
          <section key={idx} style={{ marginBottom: "56px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)", marginBottom: "16px" }}>
              {section.heading}
            </h2>

            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "15px", marginBottom: "16px" }}>
                {p}
              </p>
            ))}

            {section.codeBlock && (
              <CodeBlock
                language={section.codeBlock.language}
                code={section.codeBlock.code}
                filename={section.codeBlock.filename}
              />
            )}

            {section.callout && (
              <aside
                style={{
                  borderLeft: "2px solid var(--border-hover)",
                  paddingLeft: "16px",
                  margin: "24px 0",
                  fontStyle: "italic",
                  color: "var(--text-primary)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                }}
              >
                {section.callout}
              </aside>
            )}
          </section>
        ))}

        {/* Footer Navigation */}
        <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
          <Link href="/notes" className="link-underline">
            ← All notes
          </Link>
        </div>
      </article>
    </div>
  );
}
