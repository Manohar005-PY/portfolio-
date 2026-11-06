interface SectionHeadingProps {
  number?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ number, title, description }: SectionHeadingProps) {
  return (
    <div style={{ marginBottom: "56px" }}>
      {number && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            marginBottom: "12px",
          }}
        >
          {number}
        </p>
      )}
      <h2
        style={{
          fontSize: "clamp(22px, 3vw, 32px)",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
          marginBottom: description ? "12px" : 0,
        }}
      >
        {title}
      </h2>
      {description && (
        <p style={{ color: "var(--text-secondary)", maxWidth: "520px" }}>
          {description}
        </p>
      )}
    </div>
  );
}
