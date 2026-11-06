"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";

const toolkit = [
  {
    label: "Programming Languages",
    items: ["Python", "Java", "SQL", "TypeScript"],
  },
  {
    label: "Backend Development",
    items: ["FastAPI", "Spring Boot", "Pydantic", "SQLAlchemy"],
  },
  {
    label: "Databases & Data Processing",
    items: ["PostgreSQL", "Redis", "Alembic", "Flyway"],
  },
  {
    label: "Infrastructure & Cloud",
    items: ["Docker", "Google Cloud Run", "Cloud SQL", "Artifact Registry", "Linux"],
  },
  {
    label: "Testing & Development Tools",
    items: ["Pytest", "JUnit", "Mockito", "Git", "GitHub"],
  },
];

export function TechnicalToolkit() {
  return (
    <section
      className="section-spacing"
      style={{ borderBottom: "1px solid var(--border)" }}
      aria-labelledby="toolkit-heading"
    >
      <div className="container-main">
        <SectionHeading
          number="05 / TECHNICAL TOOLKIT"
          title="Technologies I work with"
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {toolkit.map((category, i) => (
            <div
              key={category.label}
              style={{
                display: "grid",
                gridTemplateColumns: "240px 1fr",
                gap: "24px",
                padding: "20px 0",
                borderTop: "1px solid var(--border)",
                borderBottom: i === toolkit.length - 1 ? "1px solid var(--border)" : "none",
                alignItems: "start",
              }}
              className="toolkit-row"
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.06em",
                  color: "var(--text-muted)",
                  paddingTop: "2px",
                }}
              >
                {category.label}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {category.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-sm)",
                    }}
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
