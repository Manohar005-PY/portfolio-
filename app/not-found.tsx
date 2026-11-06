import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="container-main"
      style={{
        paddingTop: "120px",
        paddingBottom: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px" }}>
        ERROR / 404
      </p>
      <h1 style={{ fontSize: "clamp(32px, 6vw, 72px)", fontWeight: 400, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: "16px", lineHeight: 1.1 }}>
        Page not found.
      </h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "40px", lineHeight: 1.7 }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn-outline">
        Return home →
      </Link>
    </div>
  );
}
