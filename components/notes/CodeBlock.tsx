"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  language: string;
  code: string;
  filename?: string;
}

export function CodeBlock({ language, code, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div
      style={{
        margin: "24px 0",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        backgroundColor: "var(--bg-surface)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 16px",
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--bg-primary)",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
          {filename || language}
        </span>
        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            padding: "4px 8px",
            borderRadius: "var(--radius-sm)",
            transition: "color var(--ease-fast)",
          }}
        >
          {copied ? <Check size={12} color="var(--text-primary)" /> : <Copy size={12} />}
          <span>{copied ? "COPIED" : "COPY"}</span>
        </button>
      </div>

      <pre
        style={{
          margin: 0,
          padding: "20px 24px",
          overflowX: "auto",
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          lineHeight: 1.6,
          color: "var(--text-primary)",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
