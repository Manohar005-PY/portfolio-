"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "@/lib/projects";
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
    <div className="container-main" style={{ paddingTop: "80px", paddingBottom: "112px" }}>
      {/* Header */}
      <div style={{ marginBottom: "72px", maxWidth: "680px" }}>
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
            fontSize: "clamp(28px, 5vw, 56px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "16px",
            lineHeight: 1.1,
          }}
        >
          Systems built through implementation.
        </h1>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
          A collection of applications and experiments exploring backend
          development, data management, asynchronous processing, and software
          infrastructure.
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          marginBottom: "48px",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "16px",
        }}
      >
        {(["all", "backend", "other"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: filter === f ? "var(--text-primary)" : "var(--text-secondary)",
              borderBottom: filter === f ? "1px solid var(--text-primary)" : "1px solid transparent",
              paddingBottom: "2px",
              transition: "color var(--ease-fast)",
            }}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Project rows */}
      <div>
        {filtered.map((project) => {
          const isHovered = hoveredId === project.id;
          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "56px 1fr auto 24px",
                alignItems: "center",
                gap: "24px",
                padding: "28px 16px",
                margin: "0 -16px",
                borderBottom: "1px solid var(--border)",
                textDecoration: "none",
                backgroundColor: isHovered ? "var(--bg-hover)" : "transparent",
                transition: "background-color var(--ease-fast)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  letterSpacing: "0.05em",
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
                    marginBottom: "8px",
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
                <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                  {project.tagline}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    marginTop: "8px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {project.stack.join(" · ")}
                </p>
              </div>

              <StatusLabel status={project.status} />

              <span
                style={{
                  color: "var(--text-secondary)",
                  transform: isHovered ? "translateX(4px)" : "translateX(0)",
                  transition: "transform var(--ease-fast)",
                  display: "inline-block",
                }}
              >
                →
              </span>
            </Link>
          );
        })}
      </div>

      <p
        style={{
          marginTop: "48px",
          color: "var(--text-secondary)",
          fontSize: "14px",
        }}
      >
        More implementation details are available in the individual project breakdowns.
      </p>
    </div>
  );
}
