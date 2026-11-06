"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const approaches = [
  {
    number: "01",
    title: "Data correctness",
    description:
      "Understanding transactions, relational models, and consistency. Building applications where data integrity is maintained across multi-step operations using the Transactional Outbox pattern and ACID transaction boundaries.",
  },
  {
    number: "02",
    title: "Reliable execution",
    description:
      "Exploring background jobs, retries, and worker lifecycles. Designing systems that handle failures gracefully with dead-letter queues, worker heartbeats, and exponential backoff retry engines rather than hiding errors.",
  },
  {
    number: "03",
    title: "Maintainable software",
    description:
      "Decoupling controllers from service domain rules, testing behavior rigorously with Mockito and MockMvc, and evolving database schemas through automated versioned migrations like Alembic and Flyway.",
  },
];

export function EngineeringApproach() {
  return (
    <section
      className="section-spacing"
      style={{ borderBottom: "1px solid var(--border)", position: "relative" }}
      aria-labelledby="approach-heading"
    >
      <div className="container-main">
        <SectionHeading
          number="03 / ENGINEERING APPROACH"
          title="How I think about building software"
        />

        <div className="approach-grid">
          {approaches.map((item) => (
            <motion.div
              key={item.number}
              whileHover={{ y: -4 }}
              style={{
                backgroundColor: "var(--bg-primary)",
                padding: "36px 32px",
                transition: "background-color 200ms ease, border-color 200ms ease",
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
                  fontSize: "19px",
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  marginBottom: "14px",
                  letterSpacing: "-0.01em",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "14px",
                  lineHeight: 1.75,
                }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
