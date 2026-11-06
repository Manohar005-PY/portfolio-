"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";

const approaches = [
  {
    number: "01",
    title: "Data correctness",
    description:
      "Understanding transactions, relational models, and consistency. Building applications where data integrity is maintained across multi-step operations.",
  },
  {
    number: "02",
    title: "Reliable execution",
    description:
      "Exploring background jobs, retries, and worker lifecycles. Designing systems that handle failures gracefully rather than hiding them.",
  },
  {
    number: "03",
    title: "Maintainable software",
    description:
      "Separating responsibilities, testing behaviour, and evolving applications over time. Preferring clarity over cleverness.",
  },
];

export function EngineeringApproach() {
  return (
    <section
      className="section-spacing"
      style={{ borderBottom: "1px solid var(--border)" }}
      aria-labelledby="approach-heading"
    >
      <div className="container-main">
        <SectionHeading
          number="03 / ENGINEERING APPROACH"
          title="How I think about building software"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            backgroundColor: "var(--border)",
            border: "1px solid var(--border)",
          }}
          className="approach-grid"
        >
          {approaches.map((item) => (
            <div
              key={item.number}
              style={{
                backgroundColor: "var(--bg-primary)",
                padding: "32px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  marginBottom: "16px",
                }}
              >
                {item.number}
              </p>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  marginBottom: "12px",
                  letterSpacing: "-0.01em",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
