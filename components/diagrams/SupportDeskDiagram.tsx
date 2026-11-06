"use client";

import { useState } from "react";

type ModelVariant = "unigram" | "optimal" | "random";

export function SupportDeskDiagram() {
  const [variant, setVariant] = useState<ModelVariant>("optimal");

  const metrics = {
    random: { acc: "1.30%", f1: "0.0130", latency: "N/A", latencyNote: "Random baseline" },
    unigram: { acc: "86.12%", f1: "0.8590", latency: "1.8 ms", latencyNote: "Vocabulary: 6,420 features" },
    optimal: { acc: "89.46%", f1: "0.8950", latency: "3.4 ms", latencyNote: "Vocabulary: 28,140 unigram+bigram features" },
  };

  const current = metrics[variant];

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
          SUPPORTDESK / ML PIPELINE & BENCHMARK EVALUATION — {variant.toUpperCase()} MODEL
        </p>

        <svg
          width="100%"
          viewBox="0 0 680 300"
          fill="none"
          aria-label="SupportDesk text classification machine learning pipeline"
          role="img"
        >
          <defs>
            <marker id="arr-ml" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="var(--border-hover)" />
            </marker>
          </defs>

          {/* 01. Dataset */}
          <rect x="15" y="100" width="105" height="70" rx="3" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="67" y="125" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Banking77</text>
          <text x="67" y="142" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">13,082 Queries</text>
          <text x="67" y="156" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">77 Intent Classes</text>

          {/* Arrow 1 */}
          <line x1="120" y1="135" x2="155" y2="135" stroke="var(--border-hover)" strokeWidth="1" markerEnd="url(#arr-ml)" />

          {/* 02. Preprocessing / Split */}
          <rect x="155" y="100" width="115" height="70" rx="3" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="212" y="125" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Train/Val Split</text>
          <text x="212" y="142" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Stratified K-Fold</text>
          <text x="212" y="156" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Lowercasing / Norm</text>

          {/* Arrow 2 */}
          <line x1="270" y1="135" x2="305" y2="135" stroke="var(--border-hover)" strokeWidth="1" markerEnd="url(#arr-ml)" />

          {/* 03. TF-IDF Vectorizer */}
          <rect x="305" y="90" width="135" height="90" rx="3"
            fill="var(--bg-primary)"
            stroke={variant === "optimal" ? "var(--text-primary)" : "var(--border)"}
            strokeWidth="1.5"
          />
          <text x="372" y="115" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">TF-IDF Vectorizer</text>
          <text x="372" y="132" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Sublinear TF scaling</text>
          <text x="372" y="148" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">
            {variant === "unigram" ? "ngram_range=(1,1)" : "ngram_range=(1,2)"}
          </text>
          <text x="372" y="165" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">
            {variant === "unigram" ? "6,420 features" : "28,140 features"}
          </text>

          {/* Arrow 3 */}
          <line x1="440" y1="135" x2="475" y2="135" stroke="var(--border-hover)" strokeWidth="1" markerEnd="url(#arr-ml)" />

          {/* 04. Classifier */}
          <rect x="475" y="90" width="130" height="90" rx="3" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="540" y="115" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Logistic Regression</text>
          <text x="540" y="132" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">L2 Regularization</text>
          <text x="540" y="148" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Hyperparam C=2.5</text>
          <text x="540" y="165" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Sub-5ms CPU Latency</text>

          {/* 05. Evaluation Metrics Display Box at Bottom */}
          <g transform="translate(120, 205)">
            <rect x="0" y="0" width="440" height="75" rx="4" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1" />
            <text x="20" y="24" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">VALIDATION RESULTS ({variant.toUpperCase()}):</text>
            <text x="20" y="48" fill="var(--text-primary)" fontSize="16" fontFamily="var(--font-mono)">Accuracy: {current.acc}</text>
            <text x="185" y="48" fill="var(--text-primary)" fontSize="16" fontFamily="var(--font-mono)">Macro F1: {current.f1}</text>
            <text x="350" y="48" fill="var(--text-muted)" fontSize="11" fontFamily="var(--font-mono)">CPU: {current.latency}</text>
            <text x="20" y="65" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)">{current.latencyNote}</text>
          </g>
        </svg>
      </div>

      {/* Interactive Variant Controls */}
      <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
        {[
          { id: "optimal", label: "01. Unigram + Bigram (89.46% Acc / 0.8950 F1)" },
          { id: "unigram", label: "02. Unigram Baseline (86.12% Acc)" },
          { id: "random", label: "03. Random Baseline (1.30% Acc)" },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setVariant(btn.id as ModelVariant)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: variant === btn.id ? "var(--text-primary)" : "var(--text-secondary)",
              border: `1px solid ${variant === btn.id ? "var(--border-hover)" : "var(--border)"}`,
              backgroundColor: variant === btn.id ? "var(--bg-surface)" : "transparent",
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

      <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", marginTop: "12px" }}>
        {variant === "optimal" && "Optimal configuration: Extending TF-IDF to bigrams captures two-word financial terminology ('card stolen', 'pin reset'), lifting Macro F1 to 0.8950 with sub-5ms CPU latency."}
        {variant === "unigram" && "Unigram baseline: Bags of individual words miss compound idioms but achieve respectable 86.12% accuracy with a lightweight 6,420-word vocabulary."}
        {variant === "random" && "Statistical baseline: Uniform random classification across 77 equal classes gives ~1.30% expected accuracy, proving the statistical significance of the TF-IDF model."}
      </p>
    </div>
  );
}
