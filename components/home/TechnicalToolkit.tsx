"use client";

import { motion } from "motion/react";
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
          number="05 / TECHNICAL TOOLKIT"
          title="Technologies I work with"
          description="A proven stack focused on building reliable, testable, and maintainable backend systems."
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {toolkit.map((category, i) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
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
                  <motion.span
                    key={item}
                    whileHover={{ y: -3, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--bg-surface)",
                      padding: "6px 12px",
                      borderRadius: "var(--radius-sm)",
                      cursor: "default",
                      transition: "border-color 150ms ease, color 150ms ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
