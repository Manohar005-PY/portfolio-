import { notFound } from "next/navigation";
import { projects, getProjectBySlug, getAdjacentProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/metadata";
import Link from "next/link";
import { StatusLabel } from "@/components/ui/StatusLabel";
import { OrderFlowDiagram } from "@/components/diagrams/OrderFlowDiagram";
import { FlowForgeDiagram } from "@/components/diagrams/FlowForgeDiagram";
import { IncidentHubDiagram } from "@/components/diagrams/IncidentHubDiagram";
import { KageDiagram } from "@/components/diagrams/KageDiagram";
import { SupportDeskDiagram } from "@/components/diagrams/SupportDeskDiagram";

// Generate static params for all projects
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.title} — ${project.tagline}`,
    description: project.problem.slice(0, 160),
  });
}

function getDiagramComponent(slug: string) {
  switch (slug) {
    case "orderflow": return <OrderFlowDiagram />;
    case "flowforge": return <FlowForgeDiagram />;
    case "incidenthub": return <IncidentHubDiagram />;
    case "kage": return <KageDiagram />;
    case "supportdesk": return <SupportDeskDiagram />;
    default: return null;
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const diagram = getDiagramComponent(slug);

  return (
    <div>
      {/* Project header */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--bg-surface)",
        }}
      >
        <div className="container-main" style={{ paddingTop: "48px", paddingBottom: "48px" }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "24px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
              <Link href="/" className="link-muted-hover">Home</Link>
              {" / "}
              <Link href="/projects" className="link-muted-hover">Projects</Link>
              {" / "}
              <span style={{ color: "var(--text-secondary)" }}>{project.title}</span>
            </span>
          </nav>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "start" }} className="project-header-grid">
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "12px" }}>
                PROJECT / {project.number.padStart(3, "0")}
              </p>
              <h1
                style={{
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                  marginBottom: "12px",
                  lineHeight: 1.1,
                }}
              >
                {project.title}
              </h1>
              <p style={{ fontSize: "18px", color: "var(--text-secondary)", marginBottom: "20px", fontWeight: 400 }}>
                {project.tagline}.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", minWidth: "180px" }}>
              {[
                { label: "TYPE", value: project.category === "ml" ? "ML experiment" : project.category === "fullstack" ? "Full-stack application" : "Backend application" },
                { label: "STATUS", value: null },
                { label: "SOURCE", value: null },
              ].map((item) => (
                <div key={item.label}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "6px" }}>
                    {item.label}
                  </p>
                  {item.label === "STATUS" ? (
                    <StatusLabel status={project.status} />
                  ) : item.label === "SOURCE" ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                    >
                      GitHub ↗
                    </a>
                  ) : (
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-secondary)" }}>{item.value}</p>
                  )}
                </div>
              ))}
              {project.liveUrl && (
                <div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "6px" }}>LIVE DEMO</p>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    Open site ↗
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Case study content */}
      <div className="container-main" style={{ paddingTop: "72px", paddingBottom: "112px", maxWidth: "calc(var(--container-width) + 80px)" }}>
        <div style={{ maxWidth: "760px" }}>

          {/* 01 / THE PROBLEM */}
          <Section number="01 / THE PROBLEM" title="The engineering problem">
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "24px" }}>
              {project.problem}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "var(--border)", border: "1px solid var(--border)", marginTop: "32px" }}>
              <div style={{ backgroundColor: "var(--bg-surface)", padding: "16px 20px" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "12px" }}>CONSTRAINTS</p>
                {project.problemConstraints.map((c) => (
                  <p key={c.constraint} style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "6px" }}>{c.constraint}</p>
                ))}
              </div>
              <div style={{ backgroundColor: "var(--bg-surface)", padding: "16px 20px" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "12px" }}>ENGINEERING FOCUS</p>
                {project.problemConstraints.map((c) => (
                  <p key={c.focus} style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "6px" }}>{c.focus}</p>
                ))}
              </div>
            </div>
          </Section>

          {/* 02 / ARCHITECTURE */}
          {diagram && (
            <Section number="02 / ARCHITECTURE" title="How the system works">
              {diagram}
            </Section>
          )}

          {/* 03 / IMPLEMENTATION */}
          <Section number={diagram ? "03 / IMPLEMENTATION" : "02 / IMPLEMENTATION"} title="What was built">
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0 }}>
              {project.implementation.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                    padding: "12px 16px",
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", paddingTop: "2px", minWidth: "20px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.7 }}>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* 04 / TECHNICAL DECISIONS */}
          <Section number={diagram ? "04 / DECISIONS" : "03 / DECISIONS"} title="Technical decisions">
            <div style={{ border: "1px solid var(--border)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", backgroundColor: "var(--bg-surface)", padding: "12px 20px", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)" }}>DECISION</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)" }}>REASONING</span>
              </div>
              {project.decisions.map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px",
                    padding: "16px 20px",
                    borderBottom: i < project.decisions.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-primary)" }}>{d.decision}</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>{d.reasoning}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* 05 / RELIABILITY */}
          <Section number={diagram ? "05 / RELIABILITY" : "04 / RELIABILITY"} title="Reliability and failure handling">
            <div style={{ border: "1px solid var(--border)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", backgroundColor: "var(--bg-surface)", padding: "12px 20px", borderBottom: "1px solid var(--border)" }} className="failure-header">
                {["SCENARIO", "EXPECTED BEHAVIOUR", "VERIFICATION"].map((h) => (
                  <span key={h} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)" }}>{h}</span>
                ))}
              </div>
              {project.failureScenarios.map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "16px",
                    padding: "16px 20px",
                    borderBottom: i < project.failureScenarios.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                  className="failure-row"
                >
                  <span style={{ color: "var(--text-primary)", fontSize: "13px" }}>{f.scenario}</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: 1.5 }}>{f.behaviour}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>{f.verification}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* 06 / LIMITATIONS */}
          <Section number={diagram ? "06 / LIMITATIONS" : "05 / LIMITATIONS"} title="Known limitations and future work">
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {project.limitations.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "14px 16px",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "var(--bg-surface)",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", paddingTop: "2px", minWidth: "16px" }}>—</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.7 }}>{item}</span>
                </div>
              ))}
            </div>
            <p style={{ marginTop: "16px", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", lineHeight: 1.6 }}>
              {project.whatItDemonstrates}
            </p>
          </Section>
        </div>

        {/* Project navigation */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            marginTop: "80px",
            paddingTop: "32px",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "24px",
            alignItems: "center",
          }}
        >
          <div>
            {prev && (
              <Link
                href={`/projects/${prev.slug}`}
                className="link-muted-hover"
                style={{ display: "block" }}
              >
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "4px" }}>← PREVIOUS</p>
                <p style={{ fontSize: "15px", color: "var(--text-primary)" }}>{prev.title}</p>
              </Link>
            )}
          </div>
          <Link
            href="/projects"
            className="btn-outline"
            style={{ padding: "8px 16px", fontSize: "11px", whiteSpace: "nowrap" }}
          >
            All projects
          </Link>
          <div style={{ textAlign: "right" }}>
            {next && (
              <Link
                href={`/projects/${next.slug}`}
                className="link-muted-hover"
                style={{ display: "block" }}
              >
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "4px" }}>NEXT →</p>
                <p style={{ fontSize: "15px", color: "var(--text-primary)" }}>{next.title}</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "72px" }}>
      <div style={{ marginBottom: "28px" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px" }}>
          {number}
        </p>
        <h2 style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
