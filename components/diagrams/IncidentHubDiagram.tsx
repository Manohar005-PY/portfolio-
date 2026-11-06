"use client";

import { useState } from "react";

type IncidentState = "NEW" | "INVESTIGATING" | "RESOLVED" | "CLOSED" | "ILLEGAL";

export function IncidentHubDiagram() {
  const [state, setState] = useState<IncidentState>("NEW");

  const stateColors: Record<IncidentState, string> = {
    NEW: "var(--text-primary)",
    INVESTIGATING: "var(--text-primary)",
    RESOLVED: "var(--text-secondary)",
    CLOSED: "var(--text-muted)",
    ILLEGAL: "var(--text-muted)",
  };

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
          INCIDENTHUB / ARCHITECTURE & STATE MACHINE — CURRENT STATE: {state}
        </p>

        <svg
          width="100%"
          viewBox="0 0 680 320"
          fill="none"
          aria-label="IncidentHub architecture and state lifecycle machine"
          role="img"
        >
          <defs>
            <marker id="arr-spring" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="var(--border-hover)" />
            </marker>
          </defs>

          {/* Client Request */}
          <rect x="20" y="100" width="90" height="60" rx="3" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="65" y="128" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">REST Client</text>
          <text x="65" y="145" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">JSON / HTTP</text>

          {/* Arrow 1 */}
          <line x1="110" y1="130" x2="154" y2="130" stroke="var(--border-hover)" strokeWidth="1" markerEnd="url(#arr-spring)" />
          <text x="132" y="120" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">HTTP</text>

          {/* Controller */}
          <rect x="154" y="90" width="120" height="80" rx="3" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="214" y="120" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">IncidentController</text>
          <text x="214" y="138" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">@RestController</text>
          <text x="214" y="154" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">@Valid validation</text>

          {/* Global Exception Handler (above controller) */}
          <rect x="154" y="15" width="120" height="50" rx="3" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
          <text x="214" y="38" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">@ControllerAdvice</text>
          <text x="214" y="52" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">RFC 7807 Errors</text>
          <line x1="214" y1="65" x2="214" y2="90" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 2" />

          {/* Arrow 2 */}
          <line x1="274" y1="130" x2="318" y2="130" stroke="var(--border-hover)" strokeWidth="1" markerEnd="url(#arr-spring)" />
          <text x="296" y="120" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">DTO</text>

          {/* Service Layer (State transition enforcement) */}
          <rect x="318" y="90" width="130" height="80" rx="3"
            fill="var(--bg-primary)"
            stroke={state === "ILLEGAL" ? "var(--text-muted)" : "var(--border)"}
            strokeWidth="1.5"
          />
          <text x="383" y="120" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">IncidentService</text>
          <text x="383" y="138" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">State Machine Rules</text>
          <text x="383" y="154" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">State: {state}</text>

          {/* Arrow 3 */}
          <line x1="448" y1="130" x2="492" y2="130" stroke="var(--border-hover)" strokeWidth="1" markerEnd="url(#arr-spring)" />
          <text x="470" y="120" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Entity</text>

          {/* Repository Layer */}
          <rect x="492" y="90" width="130" height="80" rx="3" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="557" y="120" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">IncidentRepository</text>
          <text x="557" y="138" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Spring Data JPA</text>
          <text x="557" y="154" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Hibernate ORM</text>

          {/* Arrow down to DB */}
          <line x1="557" y1="170" x2="557" y2="210" stroke="var(--border-hover)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arr-spring)" />

          {/* PostgreSQL */}
          <ellipse cx="557" cy="225" rx="45" ry="10" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
          <rect x="512" y="225" width="90" height="30" fill="var(--bg-primary)" />
          <line x1="512" y1="225" x2="512" y2="255" stroke="var(--border)" strokeWidth="1.5" />
          <line x1="602" y1="225" x2="602" y2="255" stroke="var(--border)" strokeWidth="1.5" />
          <ellipse cx="557" cy="255" rx="45" ry="10" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="557" y="244" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">PostgreSQL</text>
          <text x="557" y="258" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">+ Flyway migrations</text>

          {/* State Transition Flow Indicator at Bottom */}
          <g transform="translate(40, 240)">
            <rect x="0" y="0" width="380" height="45" rx="3" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1" />
            <text x="15" y="16" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">LIFECYCLE PIPELINE:</text>
            <text x="30" y="32" fill={state === "NEW" ? "var(--text-primary)" : "var(--text-muted)"} fontSize="9" fontFamily="var(--font-mono)">[NEW]</text>
            <text x="95" y="32" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">→</text>
            <text x="115" y="32" fill={state === "INVESTIGATING" ? "var(--text-primary)" : "var(--text-muted)"} fontSize="9" fontFamily="var(--font-mono)">[INVESTIGATING]</text>
            <text x="235" y="32" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">→</text>
            <text x="250" y="32" fill={state === "RESOLVED" ? "var(--text-primary)" : "var(--text-muted)"} fontSize="9" fontFamily="var(--font-mono)">[RESOLVED]</text>
            <text x="325" y="32" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">→</text>
            <text x="340" y="32" fill={state === "CLOSED" ? "var(--text-primary)" : "var(--text-muted)"} fontSize="9" fontFamily="var(--font-mono)">[CLOSED]</text>
          </g>
        </svg>
      </div>

      {/* State Machine Interactive Controls */}
      <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
        {[
          { id: "NEW", label: "01. Create (NEW)" },
          { id: "INVESTIGATING", label: "02. Assign (INVESTIGATING)" },
          { id: "RESOLVED", label: "03. Resolve (RESOLVED)" },
          { id: "CLOSED", label: "04. Close (CLOSED)" },
          { id: "ILLEGAL", label: "Illegal Jump (422 Error)" },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setState(btn.id as IncidentState)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: state === btn.id ? "var(--text-primary)" : "var(--text-secondary)",
              border: `1px solid ${state === btn.id ? "var(--border-hover)" : "var(--border)"}`,
              backgroundColor: state === btn.id ? "var(--bg-surface)" : "transparent",
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

      {state === "ILLEGAL" ? (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)", marginTop: "12px" }}>
          Validation enforcement: Attempting to transition directly from NEW to CLOSED triggers IllegalStateTransitionException, caught by @ControllerAdvice to return a structured 422 Unprocessable Entity.
        </p>
      ) : (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", marginTop: "12px" }}>
          Current lifecycle status: {state}. Controller validates inputs, service layer checks transition legality, and Spring Data JPA persists state with automated Flyway versioned migrations.
        </p>
      )}
    </div>
  );
}
