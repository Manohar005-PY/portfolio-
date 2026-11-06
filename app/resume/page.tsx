"use client";

import { motion } from "motion/react";
import { siteMetadata } from "@/lib/metadata";
import { certifications } from "@/lib/certifications";

const skills = [
  { category: "Languages", items: "Python, Java, SQL, TypeScript" },
  { category: "Frameworks & Libs", items: "FastAPI, Spring Boot, Next.js, SQLAlchemy, Pydantic, scikit-learn" },
  { category: "Databases & Messaging", items: "PostgreSQL, Redis, RabbitMQ, Alembic, Flyway" },
  { category: "Tools & Platforms", items: "Docker, Google Cloud Run, Cloud SQL, Artifact Registry, Git, Linux" },
  { category: "Testing", items: "Pytest, JUnit 5, Mockito, MockMvc" },
];

const projects = [
  {
    title: "OrderFlow",
    stack: "FastAPI · PostgreSQL · RabbitMQ · Redis · Pydantic · Outbox · JWT · Argon2 · Alembic",
    description:
      "Transactional order and payment backend using service-layer transactions and a transactional outbox; includes RabbitMQ consumers with retry queues and dead-letter handling, JWT authentication, Argon2 password hashing and Alembic migrations.",
    github: "https://github.com/Manohar005-PY/OrderFlow",
  },
  {
    title: "FlowForge",
    stack: "FastAPI · PostgreSQL · Redis · SQLAlchemy · Async workers · Retry engine",
    description:
      "Distributed job execution platform with FastAPI, SQLAlchemy and PostgreSQL for job lifecycle tracking; Redis-backed queue with independent workers, retry handling and automated retry tests.",
    github: "https://github.com/Manohar005-PY/FlowForge",
  },
  {
    title: "KAGE",
    stack: "Next.js · FastAPI · PostgreSQL · Docker · Google Cloud Run · Cloud SQL · CSRF · Argon2id",
    description:
      "Live anime library and progress tracker with a Next.js frontend and FastAPI/PostgreSQL backend; deployed on Google Cloud Run with Cloud SQL and Artifact Registry, with CSRF protection, expiring email links and Argon2id password hashing.",
    live: "https://mykage.in/",
    github: "https://github.com/Manohar005-PY",
  },
  {
    title: "IncidentHub",
    stack: "Java · Spring Boot · Maven · JUnit · Spring Data JPA · Flyway · REST APIs",
    description:
      "Incident lifecycle REST API built with Java and Spring Boot, separating controllers from service-layer lifecycle rules, centralized RFC 7807 error handling and validated with JUnit/MockMvc tests.",
    github: "https://github.com/Manohar005-PY/IncidentHub",
  },
  {
    title: "SupportDesk",
    stack: "Python · scikit-learn · TF-IDF · Logistic Regression · Unigram & Bigram",
    description:
      "Banking intent classification baseline using TF-IDF and Logistic Regression on Banking77 (13,082 queries, 77 classes); evaluated unigram and bigram features, achieving 89.46% validation accuracy and an F1 score of 0.8950.",
    github: "https://github.com/Manohar005-PY/SupportDesk",
  },
];

export default function ResumePage() {
  return (
    <div className="container-main" style={{ paddingTop: "80px", paddingBottom: "112px", position: "relative" }}>
      {/* Header */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "24px",
          marginBottom: "56px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "12px" }}>
            DOCUMENT / RESUME
          </p>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "8px", lineHeight: 1.1 }}>
            Manohar
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>Backend Developer · Python · Java · Distributed Systems</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", marginTop: "8px", letterSpacing: "0.06em" }}>
            Bengaluru, India · dmanoharwork@gmail.com
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
            <a
              href="/resume/Manohar_Resume_ATS.pdf"
              download
              className="btn-outline"
            >
              Download PDF ↓
            </a>
          </motion.div>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <a
              href={siteMetadata.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
              style={{ fontSize: "11px" }}
            >
              GitHub ↗
            </a>
            <a
              href={siteMetadata.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
              style={{ fontSize: "11px" }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </motion.div>

      <div style={{ maxWidth: "760px" }}>
        {/* Profile */}
        <motion.div>
          <ResumeSection title="PROFILE">
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
              Computer Science student with a focus on backend engineering and distributed systems.
              I build robust applications using Python and Java, working with relational databases,
              background workers, asynchronous execution, and application infrastructure.
              Seeking software engineering internships involving backend APIs, data pipelines,
              and reliable infrastructure.
            </p>
          </ResumeSection>
        </motion.div>

        {/* Education */}
        <motion.div>
          <ResumeSection title="EDUCATION">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <p style={{ color: "var(--text-primary)", fontSize: "16px", fontWeight: 400, marginBottom: "4px" }}>
                  MVJ College of Engineering
                </p>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "2px" }}>
                  B.E. in Computer Science and Engineering
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                  Bengaluru, Karnataka, India · CGPA: 7.5
                </p>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
                2023 — 2027
              </span>
            </div>
          </ResumeSection>
        </motion.div>

        {/* Technical skills */}
        <motion.div>
          <ResumeSection title="TECHNICAL SKILLS">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {skills.map((s) => (
                <div key={s.category} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "16px", alignItems: "baseline" }} className="skills-row">
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.06em" }}>{s.category}</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>{s.items}</span>
                </div>
              ))}
            </div>
          </ResumeSection>
        </motion.div>

        {/* Projects */}
        <motion.div>
          <ResumeSection title="SELECTED PROJECTS">
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {projects.map((p) => (
                <div key={p.title} style={{ paddingLeft: "16px", borderLeft: "2px solid var(--border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <p style={{ color: "var(--text-primary)", fontSize: "16px", fontWeight: 400 }}>{p.title}</p>
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="link-underline" style={{ fontSize: "11px" }}>
                          Repo ↗
                        </a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" className="link-underline" style={{ fontSize: "11px" }}>
                          Live Demo ↗
                        </a>
                      )}
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.06em" }}>{p.stack}</span>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.7 }}>{p.description}</p>
                </div>
              ))}
            </div>
          </ResumeSection>
        </motion.div>

        {/* Certifications */}
        <motion.div>
          <ResumeSection title="CERTIFICATIONS">
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {certifications.map((cert) => (
                <a key={cert.title} href={cert.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "12px", width: "fit-content" }} className="link-muted-hover">
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>—</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>{cert.title} — {cert.issuer} ↗</span>
                </a>
              ))}
            </div>
          </ResumeSection>
        </motion.div>

        {/* Contact links */}
        <motion.div>
          <ResumeSection title="DIRECT CONTACT">
            <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
              <a href="mailto:dmanoharwork@gmail.com" className="link-underline" style={{ fontSize: "14px" }}>
                dmanoharwork@gmail.com
              </a>
              <a href={siteMetadata.github} target="_blank" rel="noopener noreferrer" className="link-underline" style={{ fontSize: "14px" }}>
                github.com/Manohar005-PY
              </a>
              <a href={siteMetadata.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline" style={{ fontSize: "14px" }}>
                linkedin.com/in/manohar-dilip-821a19303
              </a>
            </div>
          </ResumeSection>
        </motion.div>
      </div>
    </div>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "40px", paddingBottom: "40px", borderBottom: "1px solid var(--border)" }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "20px" }}>{title}</p>
      {children}
    </div>
  );
}
