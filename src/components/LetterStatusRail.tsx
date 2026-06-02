const STEPS = [
  { key: "sealed", label: "Sealed" },
  { key: "opened", label: "Opened" },
  { key: "reading", label: "Reading" },
  { key: "almost", label: "Almost" },
  { key: "complete", label: "Complete" },
] as const;

export type StatusKey = (typeof STEPS)[number]["key"];

export function LetterStatusRail({ active }: { active: StatusKey }) {
  const activeIdx = STEPS.findIndex((s) => s.key === active);
  return (
    <nav className="status-rail" aria-label="Reading progress">
      {STEPS.map((s, i) => {
        const cls =
          i < activeIdx ? "is-done" : i === activeIdx ? "is-active" : "";
        return (
          <div key={s.key} className={`status-rail-item ${cls}`}>
            <span className="status-rail-dot" aria-hidden />
            <span className="label" aria-hidden="true">{s.label}</span>
            <span className="sr-only">
              {s.label}
              {i === activeIdx ? " (current)" : ""}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
