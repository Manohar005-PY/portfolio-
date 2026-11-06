"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { projects, ProjectCategory } from "@/lib/projects";
import { StatusLabel } from "@/components/ui/StatusLabel";

type Filter = "all" | "backend" | "other";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "backend") return p.category === "backend";
    return p.category !== "backend";
  });

  return (
    <div className="container-main" style={{ paddingTop: "80px", paddingBottom: "112px", position: "relative" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: "64px", maxWidth: "680px" }}
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
          PROJECTS / SELECTED WORK
        </p>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "18px",
            lineHeight: 1.1,
          }}
        >
          Systems built through implementation.
        </h1>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, fontSize: "16px" }}>
          A documented catalogue of backend architectures, asynchronous execution engines,
          relational transaction managers, and deployed systems.
        </p>
      </motion.div>

      {/* Filter Tabs with Motion */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "48px",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "16px",
        }}
      >
        {(["all", "backend", "other"] as Filter[]).map((f) => {
          const isSelected = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                position: "relative",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: isSelected ? "var(--text-primary)" : "var(--text-muted)",
                padding: "6px 12px",
                transition: "color 150ms ease",
              }}
            >
              <span style={{ position: "relative", zIndex: 1 }}>{f.toUpperCase()}</span>
              {isSelected && (
                <motion.div
                  layoutId="activeFilterPill"
                  style={{
                    position: "absolute",
                    inset: 0,
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "var(--bg-surface)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Project Rows with AnimatePresence */}
      <motion.div layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, idx) => {
            const isHovered = hoveredId === project.id;
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "56px 1fr auto 24px",
                    alignItems: "center",
                    gap: "24px",
                    padding: "30px 16px",
                    margin: "0 -16px",
                    borderBottom: "1px solid var(--border)",
                    textDecoration: "none",
                    backgroundColor: isHovered ? "var(--bg-hover)" : "transparent",
                    transition: "background-color 200ms ease",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: isHovered ? "var(--text-primary)" : "var(--text-muted)",
                      letterSpacing: "0.05em",
                      transition: "color 150ms ease",
                    }}
                  >
                    {project.number}
                  </span>

                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        color: "var(--text-muted)",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      {project.category === "backend"
                        ? "Backend Engineering"
                        : project.category === "fullstack"
                        ? "Full-stack Engineering"
                        : "Applied ML"}
                    </p>
                    <h2
                      style={{
                        fontSize: "24px",
                        fontWeight: 400,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.02em",
                        marginBottom: "6px",
                      }}
                    >
                      {project.title}
                    </h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "8px" }}>
                      {project.tagline}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {project.stack.join(" · ")}
                    </p>
                  </div>

                  <StatusLabel status={project.status} />

                  <motion.span
                    animate={{ x: isHovered ? 6 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{
                      color: isHovered ? "var(--text-primary)" : "var(--text-secondary)",
                      display: "inline-block",
                      fontSize: "18px",
                    }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: "48px",
          color: "var(--text-muted)",
          fontSize: "13px",
          fontFamily: "var(--font-mono)",
        }}
      >
        Click any project row to explore the full interactive architecture diagram, decision trade-offs, and failure verification.
      </motion.p>
    </div>
  );
}
