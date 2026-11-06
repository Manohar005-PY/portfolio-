"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { siteMetadata } from "@/lib/metadata";

export function Hero() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <section
      aria-label="Introduction"
      style={{
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div className="container-main" style={{ paddingTop: "72px", paddingBottom: "72px", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--bg-surface)",
                marginBottom: "28px",
              }}
            >
              <span className="radar-dot" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--text-secondary)",
                }}
              >
                BACKEND & SYSTEMS · BENGALURU, INDIA
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontSize: "clamp(38px, 6vw, 70px)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                color: "var(--text-primary)",
                marginBottom: "28px",
                maxWidth: "680px",
              }}
            >
              Building backend
              <br />
              applications with
              <br />
              care and precision.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{
                fontSize: "16px",
                color: "var(--text-secondary)",
                marginBottom: "40px",
                maxWidth: "500px",
                lineHeight: 1.75,
              }}
            >
              I design resilient APIs, relational schemas with strict transaction boundaries,
              and asynchronous background execution platforms. Focused on data consistency,
              failure recovery, and clean application architecture.
            </motion.p>

            {/* CTAs with Motion */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link href="/projects" className="btn-outline">
                  Explore projects ↗
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <a
                  href={siteMetadata.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  GitHub ↗
                </a>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link href="/resume" className="link-underline">
                  Resume
                </Link>
              </motion.div>
            </motion.div>

            {/* Footer Metadata */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              style={{
                display: "flex",
                gap: "24px",
                marginTop: "48px",
              }}
            >
              {["COMPUTER SCIENCE · 2027", "PYTHON · JAVA · POSTGRESQL"].map((tag) => (
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
            </motion.div>
          </div>

          {/* Living System Constellation */}
          <div className="hero-constellation" style={{ justifyContent: "center" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ width: "100%", maxWidth: "420px" }}
            >
              <SystemConstellation selectedNode={selectedNode} onSelectNode={setSelectedNode} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ConstellationProps {
  selectedNode: string | null;
  onSelectNode: (id: string | null) => void;
}

function SystemConstellation({ selectedNode, onSelectNode }: ConstellationProps) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        backgroundColor: "var(--bg-surface)",
        padding: "24px",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
          LIVING ARCHITECTURE MOTIF
        </p>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-muted)" }}>
          ACTIVE PACKET FLOW
        </span>
      </div>

      <svg
        width="100%"
        viewBox="0 0 360 320"
        fill="none"
        aria-label="Animated Living System Constellation"
        role="img"
      >
        <defs>
          <path id="path-api-service" d="M180,60 L90,135" />
          <path id="path-service-db" d="M90,135 L180,215" />
          <path id="path-api-queue" d="M180,60 L270,135" />
          <path id="path-queue-worker" d="M270,135 L270,215" />
          <path id="path-worker-db" d="M270,215 L180,215" />

          {/* Glowing pulse filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Static background lines */}
        <line x1="180" y1="60" x2="90" y2="135" stroke="var(--border)" strokeWidth="1" />
        <line x1="90" y1="135" x2="180" y2="215" stroke="var(--border)" strokeWidth="1" />
        <line x1="180" y1="60" x2="270" y2="135" stroke="var(--border)" strokeWidth="1" />
        <line x1="270" y1="135" x2="270" y2="215" stroke="var(--border)" strokeWidth="1" />
        <line x1="270" y1="215" x2="180" y2="215" stroke="var(--border)" strokeWidth="1" />

        {/* Active Animated Flow Lines */}
        <line x1="180" y1="60" x2="90" y2="135" stroke="var(--border-hover)" strokeWidth="1.5" className="flowing-line" />
        <line x1="90" y1="135" x2="180" y2="215" stroke="var(--border-hover)" strokeWidth="1.5" className="flowing-line-fast" />
        <line x1="180" y1="60" x2="270" y2="135" stroke="var(--border-hover)" strokeWidth="1.5" className="flowing-line" />
        <line x1="270" y1="135" x2="270" y2="215" stroke="var(--border-hover)" strokeWidth="1.5" className="flowing-line-fast" />
        <line x1="270" y1="215" x2="180" y2="215" stroke="var(--border-hover)" strokeWidth="1.5" className="flowing-line" />

        {/* Traveling Data Packet 1: API -> Service -> DB */}
        <circle r="3" fill="var(--text-primary)">
          <animateMotion dur="2.8s" repeatCount="indefinite" path="M180,60 L90,135 L180,215" />
        </circle>

        {/* Traveling Data Packet 2: API -> Queue -> Worker -> DB */}
        <circle r="3" fill="var(--text-secondary)">
          <animateMotion dur="3.6s" repeatCount="indefinite" path="M180,60 L270,135 L270,215 L180,215" />
        </circle>

        {/* Nodes */}

        {/* Node 1: FastAPI API Gateway */}
        <g
          style={{ cursor: "pointer" }}
          onClick={() => onSelectNode(selectedNode === "api" ? null : "api")}
        >
          <rect
            x="140"
            y="35"
            width="80"
            height="46"
            rx="4"
            fill="var(--bg-primary)"
            stroke={selectedNode === "api" ? "var(--text-primary)" : "var(--border)"}
            strokeWidth="1.5"
          />
          <text x="180" y="56" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">FastAPI</text>
          <text x="180" y="70" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">REST Gateway</text>
        </g>

        {/* Node 2: Service Layer */}
        <g
          style={{ cursor: "pointer" }}
          onClick={() => onSelectNode(selectedNode === "service" ? null : "service")}
        >
          <rect
            x="50"
            y="112"
            width="80"
            height="46"
            rx="4"
            fill="var(--bg-primary)"
            stroke={selectedNode === "service" ? "var(--text-primary)" : "var(--border)"}
            strokeWidth="1.5"
          />
          <text x="90" y="133" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Services</text>
          <text x="90" y="147" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Tx Ownership</text>
        </g>

        {/* Node 3: Redis Queue */}
        <g
          style={{ cursor: "pointer" }}
          onClick={() => onSelectNode(selectedNode === "redis" ? null : "redis")}
        >
          <rect
            x="230"
            y="112"
            width="80"
            height="46"
            rx="4"
            fill="var(--bg-primary)"
            stroke={selectedNode === "redis" ? "var(--text-primary)" : "var(--border)"}
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text x="270" y="133" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Redis Queue</text>
          <text x="270" y="147" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Broker</text>
        </g>

        {/* Node 4: Worker Process */}
        <g
          style={{ cursor: "pointer" }}
          onClick={() => onSelectNode(selectedNode === "worker" ? null : "worker")}
        >
          <rect
            x="230"
            y="192"
            width="80"
            height="46"
            rx="4"
            fill="var(--bg-primary)"
            stroke={selectedNode === "worker" ? "var(--text-primary)" : "var(--border)"}
            strokeWidth="1.5"
          />
          <text x="270" y="213" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Workers</text>
          <text x="270" y="227" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Execution Daemon</text>
        </g>

        {/* Node 5: PostgreSQL Database */}
        <g
          style={{ cursor: "pointer" }}
          onClick={() => onSelectNode(selectedNode === "postgres" ? null : "postgres")}
        >
          <ellipse cx="180" cy="205" rx="35" ry="8" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
          <rect x="145" y="205" width="70" height="25" fill="var(--bg-primary)" />
          <line x1="145" y1="205" x2="145" y2="230" stroke="var(--border)" strokeWidth="1.5" />
          <line x1="215" y1="205" x2="215" y2="230" stroke="var(--border)" strokeWidth="1.5" />
          <ellipse cx="180" cy="230" rx="35" ry="8" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="180" y="222" fill="var(--text-primary)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">PostgreSQL</text>
        </g>

        {/* Bottom Status bar inside SVG */}
        <text x="180" y="280" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">
          {selectedNode === "api" && "FastAPI: Non-blocking asynchronous route validation and JWT authentication."}
          {selectedNode === "service" && "Services: Transaction boundaries owned strictly above repositories."}
          {selectedNode === "redis" && "Redis: Ephemeral, ultra-fast task coordination and pub/sub transport."}
          {selectedNode === "worker" && "Workers: Decoupled daemons with heartbeat monitors and retry loops."}
          {selectedNode === "postgres" && "PostgreSQL: ACID persistence, pessimistic locking and relational integrity."}
          {!selectedNode && "Click any system node to inspect its architectural responsibility."}
        </text>
      </svg>
    </div>
  );
}
