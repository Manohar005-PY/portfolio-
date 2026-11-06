"use client";

import Link from "next/link";
import { projects } from "@/lib/projects";
import { StatusLabel } from "@/components/ui/StatusLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useState } from "react";

export function ProjectList() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      className="section-spacing"
      style={{ borderBottom: "1px solid var(--border)" }}
      aria-labelledby="work-heading"
    >
      <div className="container-main">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "56px" }}>
          <div>
            <SectionHeading number="02 / SELECTED WORK" title="Projects" />
          </div>
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

        <div
          style={{
            borderTop: "1px solid var(--border)",
          }}
        >
          {projects.map((project, i) => {
            const isHovered = hoveredId === project.id;
            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "48px 1fr auto auto 24px",
                  alignItems: "center",
                  gap: "24px",
                  padding: "24px 16px",
                  borderBottom: "1px solid var(--border)",
                  textDecoration: "none",
                  transition: "background-color var(--ease-fast)",
                  backgroundColor: isHovered ? "var(--bg-hover)" : "transparent",
                  margin: "0 -16px",
                }}
                className="project-row-link"
              >
                {/* Number */}
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

                {/* Name + tagline */}
                <div>
                  <h3
                    style={{
                      fontSize: "18px",
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
                    {project.stack.slice(0, 3).join(" · ")}
                  </p>
                </div>

                {/* Tagline — hidden on mobile */}
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

                {/* Arrow */}
                <span
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "16px",
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

        <div style={{ marginTop: "32px" }}>
          <Link
            href="/projects"
            className="link-underline"
          >
            View all project details →
          </Link>
        </div>
      </div>
    </section>
  );
}
