"use client";

import { useState } from "react";
import { motion } from "motion/react";

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
          FLOWFORGE / DISTRIBUTED TASK EXECUTION — {scenario.toUpperCase()} SCENARIO
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
          </defs>

          {/* Continuous Traveling Packets */}
          {!isFailure && (
            <circle r="3" fill="var(--text-primary)">
              <animateMotion dur="2.8s" repeatCount="indefinite" path="M70,160 L218,160 L366,160 L540,160" />
            </circle>
          )}

          {/* API */}
          <rect x="20" y="130" width="100" height="60" rx="4" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="70" y="155" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">FastAPI</text>
          <text x="70" y="172" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Job submit</text>

          {/* API → Redis */}
          <line x1="120" y1="160" x2="168" y2="160" stroke="var(--border-hover)" strokeWidth="1.5" className="flowing-line" markerEnd="url(#arr2)" />
          <text x="144" y="150" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">enqueue</text>

          {/* Redis Queue */}
          <rect x="168" y="130" width="100" height="60" rx="4" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="218" y="155" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Redis</text>
          <text x="218" y="172" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Job queue</text>

          {/* Redis → Worker */}
          <line x1="268" y1="160" x2="316" y2="160" stroke="var(--border-hover)" strokeWidth="1.5" className="flowing-line-fast" markerEnd="url(#arr2)" />
          <text x="292" y="150" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">dequeue</text>

          {/* Worker */}
          <rect
            x="316"
            y="130"
            width="100"
            height="60"
            rx="4"
            fill="var(--bg-primary)"
            stroke={isFailure ? "var(--text-muted)" : "var(--border)"}
            strokeWidth={1.5}
          />
          <text x="366" y="155" fill={isFailure ? "var(--text-muted)" : "var(--text-primary)"} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Worker</text>
          <text x="366" y="172" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">
            {isFailure ? "CRASH / OOM" : "Execution"}
          </text>

          {/* Worker → Postgres */}
          <line x1="416" y1="160" x2="488" y2="160" stroke="var(--border-hover)" strokeWidth="1.5" className={isFailure ? "" : "flowing-line"} markerEnd="url(#arr2)" />
          <text x="452" y="150" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">state sync</text>

          {/* Postgres */}
          <ellipse cx="540" cy="148" rx="52" ry="12" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
          <rect x="488" y="148" width="104" height="36" fill="var(--bg-primary)" />
          <line x1="488" y1="148" x2="488" y2="184" stroke="var(--border)" strokeWidth="1.5" />
          <line x1="592" y1="148" x2="592" y2="184" stroke="var(--border)" strokeWidth="1.5" />
          <ellipse cx="540" cy="184" rx="52" ry="12" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="540" y="168" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">PostgreSQL</text>
          <text x="540" y="182" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Persistent State</text>

          {/* Failure path indicator */}
          {isFailure && (
            <g>
              <line x1="366" y1="190" x2="366" y2="235" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arr2)" />
              <text x="366" y="250" fill="var(--text-primary)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">HEARTBEAT EXPIRED (30s TTL)</text>
              <text x="366" y="266" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Supervisor re-queues unacknowledged job</text>
            </g>
          )}

          {/* Retry animated curved loop */}
          {isRetry && (
            <g>
              <path d="M366,130 C366,50 218,50 218,124" stroke="var(--border-hover)" strokeWidth="1.5" className="flowing-line-fast" fill="none" markerEnd="url(#arr2)" />
              <text x="292" y="45" fill="var(--text-primary)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">RETRY ENGINE (ATTEMPT N+1)</text>
              <circle r="3" fill="var(--text-primary)">
                <animateMotion dur="2s" repeatCount="indefinite" path="M366,130 C366,50 218,50 218,124" />
              </circle>
            </g>
          )}

          {/* State milestones */}
          <text x="70" y="240" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">QUEUED</text>
          <text x="218" y="240" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">DISPATCHED</text>
          <text x="366" y="240" fill={isFailure ? "var(--text-primary)" : "var(--text-muted)"} fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">{isFailure ? "HEARTBEAT LOST" : "PROCESSING"}</text>
          <text x="540" y="240" fill={isFailure ? "var(--text-muted)" : "var(--text-primary)"} fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">{isFailure ? "RE-QUEUED" : "COMPLETED"}</text>
        </svg>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
        {(["normal", "failure", "retry"] as Scenario[]).map((s) => (
          <motion.button
            key={s}
            onClick={() => setScenario(s)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: scenario === s ? "var(--text-primary)" : "var(--text-secondary)",
              border: `1px solid ${scenario === s ? "var(--border-hover)" : "var(--border)"}`,
              backgroundColor: scenario === s ? "var(--bg-surface)" : "transparent",
              padding: "8px 16px",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              transition: "border-color 150ms ease, color 150ms ease",
            }}
          >
            {s === "normal" && "▶ Normal Task Flow"}
            {s === "failure" && "⚠ Worker Crash / Heartbeat Lost"}
            {s === "retry" && "↺ Retry Loop (Exponential Backoff)"}
          </motion.button>
        ))}
      </div>

      {scenario === "failure" && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)", marginTop: "12px" }}>
          Worker recovery: When a worker crashes mid-task, its Redis heartbeat key expires. The supervisor daemon detects the stale lock and re-enqueues the job with incremented attempt tracking.
        </p>
      )}
      {scenario === "retry" && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)", marginTop: "12px" }}>
          Retry engine: Failed jobs re-enter Redis with exponential backoff intervals. Database audit rows record every execution attempt and stack trace.
        </p>
      )}
    </div>
  );
}
