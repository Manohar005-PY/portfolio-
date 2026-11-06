import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description: "A little about how Manohar approaches building software — a Computer Science student exploring backend engineering through practical applications.",
});

const journey = [
  {
    stage: "01",
    title: "Exploring software",
    description:
      "Building familiarity with programming, understanding different areas of software development, and experimenting with different technologies.",
  },
  {
    stage: "02",
    title: "Moving towards backend development",
    description:
      "Working with Python, FastAPI, relational databases, and application architecture. Learning how backend systems are structured and why.",
  },
  {
    stage: "03",
    title: "Understanding system behaviour",
    description:
      "Exploring transactions, background workers, retries, database consistency, and application failure handling through personal projects.",
  },
  {
    stage: "04",
    title: "Expanding the engineering toolkit",
    description:
      "Learning Java and Spring Boot, developing cloud deployment skills, and improving software testing practices.",
  },
];

const interests = [
  {
    title: "Backend engineering",
    description: "Building APIs, designing data models, managing application workflows, and understanding persistence.",
  },
  {
    title: "Data correctness",
    description: "Understanding how database transactions, constraints, and business rules maintain consistent state.",
  },
  {
    title: "Asynchronous processing",
    description: "Exploring how independent workers execute jobs and how applications handle failures.",
  },
  {
    title: "Infrastructure",
    description: "Understanding containers, deployment environments, and cloud services.",
  },
];

const principles = [
  "I prefer understanding the problem before choosing a technology.",
  "I try to understand why an implementation works, not just how to reproduce it.",
  "I use testing and debugging to investigate unexpected behaviour.",
  "I document trade-offs and limitations instead of hiding them.",
];

export default function AboutPage() {
  return (
    <div className="container-main" style={{ paddingTop: "80px", paddingBottom: "112px" }}>
      {/* Header */}
      <div style={{ marginBottom: "80px", maxWidth: "680px" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px" }}>
          ABOUT / MANOHAR
        </p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "16px", lineHeight: 1.1 }}>
          A little about how I approach building software.
        </h1>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "16px" }}>
          I am a Computer Science student exploring backend engineering through practical applications,
          experimentation, and continuous learning. I am based in Bengaluru, India, and expect to
          graduate in 2027.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }} className="about-grid">
        <div>
          {/* Journey timeline */}
          <div style={{ marginBottom: "72px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "32px" }}>
              MY JOURNEY
            </p>
            <div style={{ position: "relative" }}>
              {/* Vertical line */}
              <div style={{ position: "absolute", left: "19px", top: "24px", bottom: "0", width: "1px", backgroundColor: "var(--border)" }} />
              {journey.map((item, i) => (
                <div key={item.stage} style={{ display: "flex", gap: "24px", marginBottom: i < journey.length - 1 ? "36px" : 0 }}>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "1px solid var(--border)",
                        backgroundColor: "var(--bg-surface)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>{item.stage}</span>
                    </div>
                  </div>
                  <div style={{ paddingTop: "10px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.7 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Working principles */}
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "24px" }}>
              HOW I WORK
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {principles.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: "16px", padding: "14px 16px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-surface)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", paddingTop: "2px", minWidth: "16px" }}>—</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div>
          {/* Interests */}
          <div style={{ marginBottom: "56px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "24px" }}>
              WHAT INTERESTS ME
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {interests.map((item) => (
                <div key={item.title} style={{ borderLeft: "1px solid var(--border)", paddingLeft: "20px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "6px" }}>{item.title}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: "40px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "20px" }}>
              EDUCATION
            </p>
            <div style={{ padding: "24px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-surface)" }}>
              <p style={{ fontSize: "15px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "4px" }}>
                MVJ College of Engineering
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "4px" }}>
                B.E. in Computer Science and Engineering
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "8px" }}>
                Bengaluru, Karnataka, India · CGPA: 7.5
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
                2023 — 2027
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "20px" }}>
              CERTIFICATIONS
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                "Python for Machine Learning Training — Spoken Tutorial",
                "Java Training — Spoken Tutorial",
                "Git Training — Spoken Tutorial",
              ].map((cert) => (
                <div
                  key={cert}
                  style={{
                    padding: "12px 16px",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "var(--bg-surface)",
                  }}
                >
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-secondary)" }}>
                    {cert}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
