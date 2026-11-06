"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { siteMetadata } from "@/lib/metadata";

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container-main" style={{ paddingTop: "64px", paddingBottom: "64px", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "64px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Text content */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                marginBottom: "24px",
                animation: "fadeUp 0.4s ease both",
              }}
            >
              MANOHAR / PORTFOLIO · 01 — INTRODUCTION
            </p>

            <h1
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "var(--text-primary)",
                marginBottom: "24px",
                maxWidth: "680px",
                animation: "fadeUp 0.4s 0.1s ease both",
              }}
            >
              Building backend
              <br />
              applications with
              <br />
              care and precision.
            </h1>

            <p
              style={{
                fontSize: "16px",
                color: "var(--text-secondary)",
                marginBottom: "40px",
                maxWidth: "480px",
                lineHeight: 1.7,
                animation: "fadeUp 0.4s 0.2s ease both",
              }}
            >
              I work with APIs, relational databases, background processing,
              and application infrastructure. Computer Science student based in
              Bengaluru, India.
            </p>

            <div
              style={{
                display: "flex",
                gap: "24px",
                flexWrap: "wrap",
                animation: "fadeUp 0.4s 0.3s ease both",
              }}
            >
              <Link href="/projects" className="btn-outline">
                Explore projects ↗
              </Link>
              <a
                href={siteMetadata.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                GitHub ↗
              </a>
              <Link href="/resume" className="link-underline">
                Resume
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                gap: "24px",
                marginTop: "48px",
                animation: "fadeUp 0.4s 0.4s ease both",
              }}
            >
              {["COMPUTER SCIENCE · 2027", "BENGALURU, INDIA"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    color: "var(--text-muted)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* System constellation */}
          <div className="hero-constellation">
            <SystemConstellation />
          </div>
        </div>
      </div>
    </section>
  );
}

function SystemConstellation() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Simple ambient pulse on nodes
    const nodes = svg.querySelectorAll(".node-circle");
    nodes.forEach((node, i) => {
      const el = node as SVGCircleElement;
      let t = i * 1.3;
      let direction = 1;

      const pulse = () => {
        t += 0.02 * direction;
        if (t > i * 1.3 + 1) direction = -1;
        if (t < i * 1.3 - 0.3) direction = 1;
        const opacity = 0.4 + Math.sin(t) * 0.3;
        el.style.opacity = String(Math.max(0.1, opacity));
        requestAnimationFrame(pulse);
      };
      requestAnimationFrame(pulse);
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      width="320"
      height="320"
      viewBox="0 0 320 320"
      fill="none"
      aria-hidden="true"
      style={{ opacity: 0.6 }}
    >
      {/* Connection lines */}
      <line x1="160" y1="60" x2="80" y2="140" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="160" y1="60" x2="240" y2="140" stroke="var(--border)" strokeWidth="1" />
      <line x1="80" y1="140" x2="160" y2="220" stroke="var(--border)" strokeWidth="1" />
      <line x1="240" y1="140" x2="160" y2="220" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="80" y1="140" x2="40" y2="220" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 6" />
      <line x1="240" y1="140" x2="280" y2="220" stroke="var(--border)" strokeWidth="1" />
      <line x1="160" y1="220" x2="120" y2="280" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="160" y1="220" x2="200" y2="280" stroke="var(--border)" strokeWidth="1" />

      {/* Edge labels */}
      <text x="108" y="92" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.05em">async</text>
      <text x="195" y="92" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.05em">HTTP</text>

      {/* Nodes */}
      {/* API */}
      <g>
        <rect x="130" y="40" width="60" height="40" rx="3" fill="var(--bg-surface)" stroke="var(--border)" strokeWidth="1" />
        <text x="160" y="64" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="0.05em">FastAPI</text>
      </g>

      {/* Service */}
      <g>
        <rect x="50" y="120" width="60" height="40" rx="3" fill="var(--bg-surface)" stroke="var(--border)" strokeWidth="1" />
        <text x="80" y="144" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="0.05em">Service</text>
      </g>

      {/* Worker */}
      <g>
        <rect x="210" y="120" width="60" height="40" rx="3" fill="var(--bg-surface)" stroke="var(--border)" strokeWidth="1" />
        <text x="240" y="144" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="0.05em">Worker</text>
      </g>

      {/* Redis (Queue shape) */}
      <g>
        <rect x="10" y="200" width="60" height="40" rx="3" fill="var(--bg-surface)" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
        <text x="40" y="224" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="0.05em">Redis</text>
      </g>

      {/* PostgreSQL (cylinder-like) */}
      <g>
        <ellipse cx="160" cy="225" rx="30" ry="8" fill="var(--bg-surface)" stroke="var(--border)" strokeWidth="1" />
        <rect x="130" y="225" width="60" height="24" fill="var(--bg-surface)" stroke="var(--border)" strokeWidth="1" />
        <ellipse cx="160" cy="249" rx="30" ry="8" fill="var(--bg-surface)" stroke="var(--border)" strokeWidth="1" />
        <text x="160" y="241" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="0.05em">Postgres</text>
      </g>

      {/* Cloud */}
      <g>
        <rect x="250" y="200" width="60" height="40" rx="3" fill="var(--bg-surface)" stroke="var(--border)" strokeWidth="1" />
        <text x="280" y="224" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="0.05em">Cloud</text>
      </g>

      {/* Pulsing dots on nodes */}
      <circle className="node-circle" cx="160" cy="60" r="3" fill="var(--text-secondary)" style={{ opacity: 0.6 }} />
      <circle className="node-circle" cx="80" cy="140" r="3" fill="var(--text-secondary)" style={{ opacity: 0.4 }} />
      <circle className="node-circle" cx="240" cy="140" r="3" fill="var(--text-secondary)" style={{ opacity: 0.5 }} />
      <circle className="node-circle" cx="40" cy="220" r="3" fill="var(--text-secondary)" style={{ opacity: 0.3 }} />
      <circle className="node-circle" cx="160" cy="220" r="3" fill="var(--text-secondary)" style={{ opacity: 0.6 }} />
      <circle className="node-circle" cx="280" cy="220" r="3" fill="var(--text-secondary)" style={{ opacity: 0.4 }} />
    </svg>
  );
}
