"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { projects } from "@/lib/projects";
import { StatusLabel } from "@/components/ui/StatusLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProjectList() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      className="section-spacing"
      style={{ borderBottom: "1px solid var(--border)", position: "relative" }}
      aria-labelledby="work-heading"
    >
      <div className="container-main">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "56px" }}>
          <SectionHeading number="02 / SELECTED WORK" title="Projects" />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
              paddingTop: "4px",
            }}
          >
            {projects.length.toString().padStart(2, "0")} PROJECTS
          </span>
        </div>

        <div style={{ borderTop: "1px solid var(--border)" }}>
          {projects.map((project, i) => {
            const isHovered = hoveredId === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr auto auto 24px",
                    alignItems: "center",
                    gap: "24px",
                    padding: "26px 16px",
                    margin: "0 -16px",
                    borderBottom: "1px solid var(--border)",
                    textDecoration: "none",
                    backgroundColor: isHovered ? "var(--bg-hover)" : "transparent",
                    transition: "background-color 200ms ease",
                  }}
                  className="project-row-link"
                >
                  {/* Number */}
                  <motion.span
                    animate={{ color: isHovered ? "var(--text-primary)" : "var(--text-muted)" }}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {project.number}
                  </motion.span>

                  {/* Name + Stack */}
                  <div>
                    <h3
                      style={{
                        fontSize: "19px",
                        fontWeight: 400,
                        color: "var(--text-primary)",
                        marginBottom: "4px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {project.stack.slice(0, 4).join(" · ")}
                    </p>
                  </div>

                  {/* Tagline */}
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                      display: "none",
                    }}
                    className="tagline-cell"
                  >
                    {project.tagline}
                  </span>

                  {/* Status */}
                  <StatusLabel status={project.status} />

                  {/* Arrow with spring motion */}
                  <motion.span
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{
                      color: isHovered ? "var(--text-primary)" : "var(--text-secondary)",
                      fontSize: "18px",
                      display: "inline-block",
                    }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ marginTop: "36px" }}
        >
          <Link href="/projects" className="link-underline">
            View all project details →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
