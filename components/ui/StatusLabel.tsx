import { ProjectStatus } from "@/lib/projects";

const STATUS_LABELS: Record<ProjectStatus, string> = {
  functional: "Functional",
  prototype: "Prototype",
  "in-development": "In development",
  experiment: "Experiment",
  deployed: "Deployed",
};

export function StatusLabel({ status }: { status: ProjectStatus }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        letterSpacing: "0.1em",
        color: "var(--text-muted)",
        border: "1px solid var(--border)",
        padding: "3px 8px",
        borderRadius: "var(--radius-sm)",
        textTransform: "uppercase",
      }}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
