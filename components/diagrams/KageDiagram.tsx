"use client";

import { useState } from "react";

type FlowMode = "standard" | "auth" | "verification";

export function KageDiagram() {
  const [mode, setMode] = useState<FlowMode>("standard");

  return (
    <div>
      <div
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: "32px",
          overflowX: "auto",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            marginBottom: "24px",
          }}
        >
          KAGE / CLOUD RUN DEPLOYMENT & SECURITY PIPELINE — {mode.toUpperCase()} FLOW
        </p>

        <svg
          width="100%"
          viewBox="0 0 680 340"
          fill="none"
          aria-label="KAGE cloud infrastructure deployment and security architecture"
          role="img"
        >
          <defs>
            <marker id="arr-cloud" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="var(--border-hover)" />
            </marker>
          </defs>

          {/* Google Cloud Boundary */}
          <rect x="130" y="10" width="530" height="315" rx="6" fill="transparent" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="145" y="32" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">GOOGLE CLOUD PLATFORM (GCP)</text>

          {/* Client */}
          <rect x="15" y="125" width="85" height="60" rx="3" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="57" y="152" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">User Browser</text>
          <text x="57" y="168" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">HTTPS</text>

          {/* Arrow Client → Next.js */}
          <line x1="100" y1="155" x2="155" y2="155" stroke="var(--border-hover)" strokeWidth="1" markerEnd="url(#arr-cloud)" />

          {/* Cloud Run Service 1: Next.js Frontend */}
          <g>
            <rect x="155" y="110" width="125" height="90" rx="4" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="217" y="135" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Next.js Frontend</text>
            <text x="217" y="152" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Cloud Run Container</text>
            <text x="217" y="168" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">SSR / App Router</text>
            <text x="217" y="186" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">mykage.in</text>
          </g>

          {/* Arrow Next.js → FastAPI Backend */}
          <line x1="280" y1="155" x2="335" y2="155" stroke="var(--border-hover)" strokeWidth="1" markerEnd="url(#arr-cloud)" />
          <text x="307" y="145" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Internal API</text>

          {/* Cloud Run Service 2: FastAPI Backend */}
          <g>
            <rect x="335" y="95" width="145" height="120" rx="4" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="407" y="122" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">FastAPI Backend</text>
            <text x="407" y="139" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Cloud Run Container</text>
            <line x1="345" y1="148" x2="470" y2="148" stroke="var(--border)" strokeWidth="0.5" />
            <text x="407" y="164" fill={mode === "auth" ? "var(--text-primary)" : "var(--text-muted)"} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">
              {mode === "auth" ? "Argon2id Hashing" : "CSRF Middleware"}
            </text>
            <text x="407" y="180" fill={mode === "verification" ? "var(--text-primary)" : "var(--text-muted)"} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">
              {mode === "verification" ? "Single-Use Link Check" : "JWT Token Validation"}
            </text>
            <text x="407" y="198" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Pydantic Schemas</text>
          </g>

          {/* Arrow Backend → Cloud SQL */}
          <line x1="480" y1="155" x2="525" y2="155" stroke="var(--border-hover)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arr-cloud)" />

          {/* Cloud SQL Database */}
          <g>
            <ellipse cx="580" cy="135" rx="45" ry="10" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
            <rect x="535" y="135" width="90" height="40" fill="var(--bg-primary)" />
            <line x1="535" y1="135" x2="535" y2="175" stroke="var(--border)" strokeWidth="1.5" />
            <line x1="625" y1="135" x2="625" y2="175" stroke="var(--border)" strokeWidth="1.5" />
            <ellipse cx="580" cy="175" rx="45" ry="10" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="580" y="152" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">Cloud SQL</text>
            <text x="580" y="167" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">PostgreSQL</text>
          </g>

          {/* Artifact Registry Component */}
          <g>
            <rect x="250" y="245" width="180" height="55" rx="3" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
            <text x="340" y="268" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">Artifact Registry</text>
            <text x="340" y="284" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Docker OCI Container Images</text>
            <line x1="217" y1="200" x2="270" y2="245" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="407" y1="215" x2="380" y2="245" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 2" />
          </g>
        </svg>
      </div>

      {/* Interactive Controls */}
      <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
        {[
          { id: "standard", label: "01. Standard Live Flow" },
          { id: "auth", label: "02. Auth & Argon2id Security" },
          { id: "verification", label: "03. Expiring Verification Links" },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setMode(btn.id as FlowMode)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: mode === btn.id ? "var(--text-primary)" : "var(--text-secondary)",
              border: `1px solid ${mode === btn.id ? "var(--border-hover)" : "var(--border)"}`,
              backgroundColor: mode === btn.id ? "var(--bg-surface)" : "transparent",
              padding: "8px 14px",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              transition: "border-color var(--ease-fast), color var(--ease-fast)",
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {mode === "standard" && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", marginTop: "12px" }}>
          Production architecture: Next.js frontend and FastAPI backend are packaged via multi-stage Docker builds and deployed as serverless containers to Google Cloud Run, communicating with a managed Cloud SQL PostgreSQL database.
        </p>
      )}
      {mode === "auth" && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)", marginTop: "12px" }}>
          Authentication security: User passwords are encrypted using memory-hard Argon2id (resistant to GPU cracking). Mutating requests mandate CSRF token verification before invoking database transactions.
        </p>
      )}
      {mode === "verification" && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)", marginTop: "12px" }}>
          Account verification: Generated verification URLs use single-use cryptographically signed tokens with strict expiration TTLs. Attempting to reuse or click an expired link immediately invalidates the operation.
        </p>
      )}
    </div>
  );
}
