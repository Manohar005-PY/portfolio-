"use client";

import { useState } from "react";

type Scenario = "normal" | "failure" | "retry";

export function FlowForgeDiagram() {
  const [scenario, setScenario] = useState<Scenario>("normal");

  const isFailure = scenario === "failure";
  const isRetry = scenario === "retry";

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
          FLOWFORGE / JOB LIFECYCLE — {scenario.toUpperCase()} EXECUTION
        </p>

        <svg
          width="100%"
          viewBox="0 0 680 320"
          fill="none"
          aria-label={`FlowForge job lifecycle diagram — ${scenario} execution`}
          role="img"
        >
          <defs>
            <marker id="arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="var(--border-hover)" />
            </marker>
            <marker id="arr-fail" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="var(--text-muted)" />
            </marker>
          </defs>

          {/* API */}
          <rect x="20" y="130" width="100" height="60" rx="3" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="70" y="155" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">FastAPI</text>
          <text x="70" y="172" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Job submit</text>

          {/* API → Redis */}
          <line x1="120" y1="160" x2="168" y2="160" stroke="var(--border-hover)" strokeWidth="1" strokeDasharray="4 4" markerEnd="url(#arr2)" />
          <text x="144" y="150" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">enqueue</text>

          {/* Redis Queue */}
          <rect x="168" y="130" width="100" height="60" rx="3" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="218" y="155" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Redis</text>
          <text x="218" y="172" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Job queue</text>

          {/* Redis → Worker */}
          <line x1="268" y1="160" x2="316" y2="160" stroke="var(--border-hover)" strokeWidth="1" strokeDasharray="4 4" markerEnd="url(#arr2)" />
          <text x="292" y="150" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">dequeue</text>

          {/* Worker */}
          <rect x="316" y="130" width="100" height="60" rx="3"
            fill="var(--bg-primary)"
            stroke={isFailure ? "var(--text-muted)" : "var(--border)"}
            strokeWidth="1.5"
          />
          <text x="366" y="155" fill={isFailure ? "var(--text-muted)" : "var(--text-primary)"} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Worker</text>
          <text x="366" y="172" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">
            {isFailure ? "CRASH" : "Execution"}
          </text>

          {/* Worker → Postgres (always) */}
          <line x1="416" y1="160" x2="464" y2="160" stroke="var(--border-hover)" strokeWidth="1" markerEnd="url(#arr2)" />
          <text x="440" y="150" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">state</text>

          {/* Postgres */}
          <ellipse cx="540" cy="148" rx="52" ry="12" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
          <rect x="488" y="148" width="104" height="36" fill="var(--bg-primary)" />
          <line x1="488" y1="148" x2="488" y2="184" stroke="var(--border)" strokeWidth="1.5" />
          <line x1="592" y1="148" x2="592" y2="184" stroke="var(--border)" strokeWidth="1.5" />
          <ellipse cx="540" cy="184" rx="52" ry="12" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="540" y="168" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">PostgreSQL</text>
          <text x="540" y="182" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Job state</text>

          {/* Failure path */}
          {isFailure && (
            <>
              <text x="366" y="230" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">↓ heartbeat timeout</text>
              <text x="366" y="248" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">→ recovery triggered</text>
            </>
          )}

          {/* Retry path */}
          {isRetry && (
            <>
              <path d="M366,130 C366,60 218,60 218,130" stroke="var(--border-hover)" strokeWidth="1" strokeDasharray="4 4" fill="none" markerEnd="url(#arr2)" />
              <text x="292" y="52" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">retry (attempt N+1)</text>
            </>
          )}

          {/* Job state labels */}
          <text x="80" y="250" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">QUEUED</text>
          <text x="218" y="250" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">PROCESSING</text>
          <text x="366" y="250" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">{isFailure ? "FAILED" : "RUNNING"}</text>
          <text x="540" y="250" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">{isFailure ? "FAILED" : "COMPLETED"}</text>
        </svg>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap" }}>
        {(["normal", "failure", "retry"] as Scenario[]).map((s) => (
          <button
            key={s}
            onClick={() => setScenario(s)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: scenario === s ? "var(--text-primary)" : "var(--text-secondary)",
              border: `1px solid ${scenario === s ? "var(--border-hover)" : "var(--border)"}`,
              backgroundColor: "transparent",
              padding: "8px 16px",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              transition: "color var(--ease-fast), border-color var(--ease-fast)",
            }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)} execution
          </button>
        ))}
      </div>

      {scenario === "failure" && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)", marginTop: "12px" }}>
          Worker failure: job remains in processing state. Heartbeat timeout triggers recovery. Delivery is at-least-once — not exactly-once.
        </p>
      )}
      {scenario === "retry" && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)", marginTop: "12px" }}>
          Retry: job re-enters the queue for another execution attempt. Attempt count is tracked in PostgreSQL.
        </p>
      )}

      <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", marginTop: "10px", letterSpacing: "0.06em" }}>
        Conceptual flow. Adjusted to actual queue and persistence implementation.
      </p>
    </div>
  );
}
