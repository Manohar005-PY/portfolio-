"use client";

import { motion } from "motion/react";
import { buildMetadata } from "@/lib/metadata";

const journey = [
  {
    stage: "01",
    title: "Exploring software development",
    description:
      "Building core programming fluency in Python and Java, exploring algorithms, and experimenting with different layers of software architecture.",
  },
  {
    stage: "02",
    title: "Focusing on backend systems",
    description:
      "Working with FastAPI, relational databases, SQLAlchemy ORM, and SQL constraints. Designing normalized schemas and REST APIs.",
  },
  {
    stage: "03",
    title: "Understanding system behavior & failure modes",
    description:
      "Investigating distributed transaction boundaries, Transactional Outbox patterns, background worker heartbeats, and failure recovery through OrderFlow and FlowForge.",
  },
  {
    stage: "04",
    title: "Expanding to enterprise Java & cloud deployments",
    description:
      "Deepening enterprise backend development with Spring Boot, Spring Data JPA, and Flyway migrations; deploying containerized services to Google Cloud Run with Cloud SQL.",
  },
];

const interests = [
  {
    title: "Backend Engineering & API Design",
    description: "Designing deterministic REST endpoints, explicit DTO schemas, and clean architectural boundaries between controllers and service business logic.",
  },
  {
    title: "Data Consistency & Transactions",
    description: "Ensuring atomicity across multi-step operations using the Transactional Outbox pattern, pessimistic locking (SKIP LOCKED), and relational foreign key constraints.",
  },
  {
    title: "Asynchronous Worker Pipelines",
    description: "Designing independent task execution daemons, Redis-backed queues, heartbeat health checks, and exponential backoff retry engines.",
  },
  {
    title: "Cloud Infrastructure & Containerization",
    description: "Building multi-stage Docker container images, deploying to serverless platforms like Google Cloud Run, and managing persistent databases on Cloud SQL.",
  },
];

const principles = [
  "I prefer thoroughly understanding the engineering problem before selecting a technology.",
  "I build systems to understand why they work and how they fail under edge conditions.",
  "I document architectural trade-offs, failure modes, and real limitations honestly.",
  "I prioritize automated testing and schema migrations over manual configuration.",
];

export default function AboutPage() {
  return (
    <div className="container-main" style={{ paddingTop: "80px", paddingBottom: "112px", position: "relative" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ marginBottom: "80px", maxWidth: "680px" }}
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px" }}>
          ABOUT / MANOHAR
        </p>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 54px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "20px", lineHeight: 1.1 }}>
          A little about how I approach building software.
        </h1>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "16px" }}>
          I am a Computer Science student at MVJ College of Engineering in Bengaluru, India, focused on
          backend systems, database correctness, and distributed processing. I believe the best way to understand
          systems is by building them from first principles.
        </p>
      </motion.div>

      <div className="about-grid">
        <div>
          {/* Journey timeline */}
          <div style={{ marginBottom: "72px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "32px" }}>
              TECHNICAL JOURNEY
            </p>
            <div style={{ position: "relative" }}>
              {/* Vertical line */}
              <div
                style={{
                  position: "absolute",
                  left: "19px",
                  top: "24px",
                  bottom: "24px",
                  width: "1px",
                  backgroundColor: "var(--border)",
                }}
              />

              {journey.map((item, i) => (
                <motion.div
                  key={item.stage}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{ display: "flex", gap: "24px", marginBottom: i < journey.length - 1 ? "40px" : 0 }}
                >
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
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)" }}>{item.stage}</span>
                    </div>
                  </div>
                  <div style={{ paddingTop: "8px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.7 }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
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
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  whileHover={{ x: 4 }}
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "16px",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "var(--bg-surface)",
                    transition: "border-color 150ms ease",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", paddingTop: "2px", minWidth: "16px" }}>—</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>{p}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div>
          {/* Interests */}
          <div style={{ marginBottom: "56px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "24px" }}>
              CORE TECHNICAL INTERESTS
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {interests.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  style={{ borderLeft: "2px solid var(--border-hover)", paddingLeft: "20px" }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "6px" }}>{item.title}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.65 }}>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: "40px" }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "20px" }}>
              EDUCATION
            </p>
            <div style={{ padding: "28px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-surface)" }}>
              <p style={{ fontSize: "16px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "4px" }}>
                MVJ College of Engineering
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "4px" }}>
                B.E. in Computer Science and Engineering
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "12px" }}>
                Bengaluru, Karnataka, India · CGPA: 7.5
              </p>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", border: "1px solid var(--border)", padding: "4px 8px", borderRadius: "var(--radius-sm)" }}>
                2023 — 2027
              </span>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "20px" }}>
              CERTIFICATIONS
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Python for Machine Learning Training — Spoken Tutorial",
                "Java Training — Spoken Tutorial",
                "Git Training — Spoken Tutorial",
              ].map((cert) => (
                <div
                  key={cert}
                  style={{
                    padding: "14px 18px",
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
