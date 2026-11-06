import { buildMetadata, siteMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with Manohar — interested in backend development, software engineering opportunities, or discussing technical projects.",
});

export default function ContactPage() {
  return (
    <div className="container-main" style={{ paddingTop: "80px", paddingBottom: "112px" }}>
      <div style={{ maxWidth: "680px" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px" }}>
          CONTACT / OPEN CONNECTION
        </p>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 56px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "24px",
            lineHeight: 1.1,
          }}
        >
          Let&apos;s talk about software and engineering.
        </h1>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "56px", fontSize: "16px" }}>
          Interested in backend development, software engineering opportunities, or discussing
          technical projects. I am open to internship opportunities involving APIs, databases,
          and application infrastructure.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { label: "Email", href: `mailto:${siteMetadata.email}`, display: siteMetadata.email },
            { label: "GitHub", href: siteMetadata.github, display: "github.com/Manohar005-PY" },
            { label: "LinkedIn", href: siteMetadata.linkedin, display: "LinkedIn profile" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="card-hover"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 24px",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--bg-surface)",
                textDecoration: "none",
              }}
            >
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "4px" }}>{item.label.toUpperCase()}</p>
                <p style={{ color: "var(--text-primary)", fontSize: "15px" }}>{item.display}</p>
              </div>
              <span style={{ color: "var(--text-secondary)", fontSize: "18px" }}>→</span>
            </a>
          ))}
        </div>

        <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
          {/* Decorative connection SVG */}
          <svg width="200" height="40" viewBox="0 0 200 40" fill="none" aria-hidden="true" style={{ opacity: 0.3 }}>
            <circle cx="10" cy="20" r="4" stroke="var(--border-hover)" strokeWidth="1" />
            <line x1="14" y1="20" x2="60" y2="20" stroke="var(--border)" strokeWidth="1" />
            <circle cx="64" cy="20" r="4" stroke="var(--border-hover)" strokeWidth="1" />
            <line x1="68" y1="20" x2="130" y2="20" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="134" cy="20" r="4" stroke="var(--border-hover)" strokeWidth="1" />
            <line x1="138" y1="20" x2="186" y2="20" stroke="var(--border)" strokeWidth="1" />
            <circle cx="190" cy="20" r="4" stroke="var(--border-hover)" strokeWidth="1" fill="var(--border)" />
          </svg>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", marginTop: "12px", letterSpacing: "0.06em" }}>
            No contact form. No newsletter. Just direct communication.
          </p>
        </div>
      </div>
    </div>
  );
}
