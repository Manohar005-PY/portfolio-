import Link from "next/link";
import { siteMetadata } from "@/lib/metadata";
import { ExternalLink } from "@/components/ui/ExternalLink";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        marginTop: "auto",
      }}
    >
      {/* Contact section */}
      <div
        className="container-main"
        style={{
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            marginBottom: "24px",
          }}
        >
          GET IN TOUCH
        </p>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "16px",
            maxWidth: "560px",
            lineHeight: 1.2,
          }}
        >
          Looking for an intern who cares about the details?
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "40px",
            maxWidth: "480px",
          }}
        >
          I&apos;m looking for software engineering internships where I can contribute to backend development, APIs, databases, or cloud infrastructure—and keep learning from a strong team.
        </p>

        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
          <ExternalLink href={`mailto:${siteMetadata.email}`} label="Email">
            dmanoharwork@gmail.com
          </ExternalLink>
          <ExternalLink href={siteMetadata.github} label="GitHub">
            GitHub ↗
          </ExternalLink>
          <ExternalLink href={siteMetadata.linkedin} label="LinkedIn">
            LinkedIn ↗
          </ExternalLink>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="container-main"
        style={{
          paddingTop: "24px",
          paddingBottom: "32px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--text-muted)",
          }}
        >
          © {year} Manohar. Built from real projects and plenty of iteration.
        </span>
        <Link
          href="#main-content"
          className="link-muted-hover"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.08em",
          }}
        >
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
}
