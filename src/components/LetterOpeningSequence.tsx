import { useEffect, useState } from "react";

type Phase =
  | "sealed"
  | "seal-breaking"
  | "flap-opening"
  | "letter-lifting"
  | "folded-paper"
  | "unfolding"
  | "revealed";

const TIMELINE: Array<{ phase: Phase; at: number }> = [
  { phase: "sealed", at: 0 },
  { phase: "seal-breaking", at: 500 },
  { phase: "flap-opening", at: 1000 },
  { phase: "letter-lifting", at: 1700 },
  { phase: "folded-paper", at: 2400 },
  { phase: "unfolding", at: 3000 },
  { phase: "revealed", at: 4000 },
];

export function LetterOpeningSequence({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("sealed");

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onDone();
      return;
    }
    const timers = TIMELINE.map(({ phase: p, at }) =>
      window.setTimeout(() => setPhase(p), at),
    );
    const finish = window.setTimeout(onDone, 4500);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finish);
    };
  }, [onDone]);

  return (
    <div className="opening-overlay" data-phase={phase} role="presentation">
      <button
        type="button"
        className="skip-button"
        onClick={onDone}
        aria-label="Skip the opening animation"
      >
        Skip
      </button>
      <div className="opening-envelope" data-phase={phase} aria-hidden>
        <div className="body" />
        <div className="paper" />
        <div className="flap" />
        <div className="seal" />
      </div>
    </div>
  );
}
