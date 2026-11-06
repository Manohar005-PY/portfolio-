import { SectionHeading } from "@/components/ui/SectionHeading";

const toolkit = [
  {
    label: "Programming Languages",
    items: ["Python", "Java", "SQL", "TypeScript"],
  },
  {
    label: "Backend & Architecture",
    items: ["FastAPI", "Spring Boot", "Pydantic", "SQLAlchemy", "REST APIs", "Transactional Outbox"],
  },
  {
    label: "Databases & Messaging",
    items: ["PostgreSQL", "Redis", "RabbitMQ", "Alembic", "Flyway"],
  },
  {
    label: "Infrastructure & Cloud",
    items: ["Docker", "Google Cloud Run", "Cloud SQL", "Artifact Registry", "Linux"],
  },
  {
    label: "Testing & DevOps",
    items: ["Pytest", "JUnit 5", "Mockito", "MockMvc", "Git", "GitHub"],
  },
];

export function TechnicalToolkit() {
  return (
    <section
      className="section-spacing"
      style={{ borderBottom: "1px solid var(--border)", position: "relative" }}
      aria-labelledby="toolkit-heading"
    >
      <div className="container-main">
        <SectionHeading
          number="TOOLS I USE"
          title="A practical stack, chosen project by project."
          description="These are the tools I have used to build, test, deploy, and learn from the projects above."
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {toolkit.map((category, i) => (
            <div
              key={category.label}
              style={{
                borderTop: "1px solid var(--border)",
                borderBottom: i === toolkit.length - 1 ? "1px solid var(--border)" : "none",
              }}
              className="toolkit-row"
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.06em",
                  color: "var(--text-muted)",
                  paddingTop: "4px",
                }}
              >
                {category.label}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {category.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--bg-surface)",
                      padding: "6px 12px",
                      borderRadius: "var(--radius-sm)",
                      cursor: "default",
                    }}
                    className="tool-chip"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
