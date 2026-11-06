"use client";

import { useState } from "react";
import { motion } from "motion/react";

type TraceStep = "api" | "service" | "repo" | "db" | null;

export function OrderFlowDiagram() {
  const steps: TraceStep[] = ["api", "service", "repo", "db"];
  const [tracing, setTracing] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);

  const startTrace = () => {
    setTracing(true);
    setStepIndex(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < steps.length) {
        setStepIndex(i);
      } else {
        clearInterval(interval);
        setTimeout(() => { setTracing(false); setStepIndex(-1); }, 1000);
      }
    }, 700);
  };

  const isActive = (node: TraceStep) =>
    tracing && steps[stepIndex] === node;

  return (
    <div>
      {/* Diagram Container */}
      <div
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: "32px",
          overflowX: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
            }}
          >
            ORDERFLOW / TRANSACTIONAL ARCHITECTURE & OUTBOX
          </p>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-muted)" }}>
            {tracing ? `ACTIVE STAGE: ${steps[stepIndex]?.toUpperCase()}` : "IDLE / RUNNING SYSTEM"}
          </span>
        </div>

        <svg
          width="100%"
          viewBox="0 0 680 300"
          fill="none"
          aria-label="OrderFlow architecture: HTTP Client → FastAPI Routes → Service Layer → Repository Layer → PostgreSQL"
          role="img"
        >
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="var(--border-hover)" />
            </marker>
          </defs>

          {/* Continuous Traveling Packets */}
          <circle r="3" fill="var(--text-primary)">
            <animateMotion dur="3.2s" repeatCount="indefinite" path="M70,150 L228,150 L396,150 L564,150 L564,240" />
          </circle>

          {/* HTTP Client */}
          <g opacity={tracing && !isActive("api") ? 0.35 : 1} style={{ transition: "opacity 300ms ease" }}>
            <rect x="20" y="120" width="100" height="60" rx="4" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="5 5" />
            <text x="70" y="145" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">HTTP</text>
            <text x="70" y="162" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Client</text>
          </g>

          {/* Arrow 1 */}
          <g>
            <line x1="120" y1="150" x2="168" y2="150" stroke="var(--border-hover)" strokeWidth="1.5" className="flowing-line" markerEnd="url(#arrow)" />
            <text x="144" y="140" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">HTTP</text>
          </g>

          {/* FastAPI Routes */}
          <g opacity={tracing && !isActive("api") ? 0.35 : 1} style={{ transition: "opacity 300ms ease" }}>
            <rect
              x="168"
              y="110"
              width="120"
              height="80"
              rx="4"
              fill="var(--bg-primary)"
              stroke={isActive("api") ? "var(--text-primary)" : "var(--border)"}
              strokeWidth={isActive("api") ? 2 : 1.5}
            />
            <text x="228" y="143" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">FastAPI</text>
            <text x="228" y="158" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Routes</text>
            <text x="228" y="178" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Validation · Routing</text>
          </g>

          {/* Arrow 2 */}
          <g>
            <line x1="288" y1="150" x2="336" y2="150" stroke="var(--border-hover)" strokeWidth="1.5" className="flowing-line" markerEnd="url(#arrow)" />
            <text x="312" y="140" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">call</text>
          </g>

          {/* Service Layer */}
          <g opacity={tracing && !isActive("service") ? 0.35 : 1} style={{ transition: "opacity 300ms ease" }}>
            <rect
              x="336"
              y="110"
              width="120"
              height="80"
              rx="4"
              fill="var(--bg-primary)"
              stroke={isActive("service") ? "var(--text-primary)" : "var(--border)"}
              strokeWidth={isActive("service") ? 2 : 1.5}
            />
            <text x="396" y="143" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Service</text>
            <text x="396" y="158" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Layer</text>
            <text x="396" y="178" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Business logic · Tx</text>
          </g>

          {/* Arrow 3 */}
          <g>
            <line x1="456" y1="150" x2="504" y2="150" stroke="var(--border-hover)" strokeWidth="1.5" className="flowing-line" markerEnd="url(#arrow)" />
            <text x="480" y="140" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">query</text>
          </g>

          {/* Repository Layer */}
          <g opacity={tracing && !isActive("repo") ? 0.35 : 1} style={{ transition: "opacity 300ms ease" }}>
            <rect
              x="504"
              y="110"
              width="120"
              height="80"
              rx="4"
              fill="var(--bg-primary)"
              stroke={isActive("repo") ? "var(--text-primary)" : "var(--border)"}
              strokeWidth={isActive("repo") ? 2 : 1.5}
            />
            <text x="564" y="143" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Repository</text>
            <text x="564" y="158" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Layer</text>
            <text x="564" y="178" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Data access · ORM</text>
          </g>

          {/* Arrow down to DB */}
          <g>
            <line x1="564" y1="190" x2="564" y2="228" stroke="var(--border-hover)" strokeWidth="1.5" className="flowing-line-fast" markerEnd="url(#arrow)" />
            <text x="580" y="214" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">SQL</text>
          </g>

          {/* PostgreSQL cylinder */}
          <g opacity={tracing && !isActive("db") ? 0.35 : 1} style={{ transition: "opacity 300ms ease" }}>
            <ellipse cx="564" cy="240" rx="50" ry="12" fill="var(--bg-primary)" stroke={isActive("db") ? "var(--text-primary)" : "var(--border)"} strokeWidth="1.5" />
            <rect x="514" y="240" width="100" height="40" fill="var(--bg-primary)" />
            <line x1="514" y1="240" x2="514" y2="280" stroke={isActive("db") ? "var(--text-primary)" : "var(--border)"} strokeWidth="1.5" />
            <line x1="614" y1="240" x2="614" y2="280" stroke={isActive("db") ? "var(--text-primary)" : "var(--border)"} strokeWidth="1.5" />
            <ellipse cx="564" cy="280" rx="50" ry="12" fill="var(--bg-primary)" stroke={isActive("db") ? "var(--text-primary)" : "var(--border)"} strokeWidth="1.5" />
            <text x="564" y="262" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">PostgreSQL</text>
            <text x="564" y="276" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Orders · Stock · Outbox</text>
          </g>
        </svg>

        {/* Legend */}
        <div style={{ display: "flex", gap: "24px", marginTop: "16px", flexWrap: "wrap" }}>
          {[
            { label: "Service", style: "solid" },
            { label: "Database", style: "cylinder" },
            { label: "External", style: "dashed" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "16px",
                  height: "10px",
                  border: "1px solid var(--border)",
                  borderStyle: item.style === "dashed" ? "dashed" : "solid",
                  borderRadius: "1px",
                }}
              />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
                {item.label}
              </span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "16px", height: "1px", backgroundColor: "var(--border-hover)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>Synchronous</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "16px", height: "1px", borderTop: "1.5px dashed var(--border-hover)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>Active Packet Flow</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
        <motion.button
          onClick={startTrace}
          disabled={tracing}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.08em",
            color: tracing ? "var(--text-muted)" : "var(--text-secondary)",
            border: "1px solid var(--border)",
            backgroundColor: "transparent",
            padding: "8px 16px",
            borderRadius: "var(--radius-sm)",
            cursor: tracing ? "not-allowed" : "pointer",
            transition: "color var(--ease-fast), border-color var(--ease-fast)",
          }}
        >
          {tracing ? "Tracing request..." : "▶ Trace live flow"}
        </motion.button>
        <button
          onClick={() => { setTracing(false); setStepIndex(-1); }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
            border: "1px solid var(--border)",
            backgroundColor: "transparent",
            padding: "8px 16px",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", marginTop: "10px", letterSpacing: "0.06em" }}>
        OrderFlow transactional pipeline: Service coordinates product verification, inventory decrement, and outbox insertion in one database transaction.
      </p>
    </div>
  );
}
