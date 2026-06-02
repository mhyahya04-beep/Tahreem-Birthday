import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { letter } from "@/content/letter";

export function HeroBirthdaySection() {
  const navigate = useNavigate();

  const openLetter = useCallback(() => {
    navigate({ to: "/letter" });
  }, [navigate]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLetter();
    }
  };

  return (
    <main className="relative min-h-dvh w-full overflow-hidden">
      <div className="cinematic-background" aria-hidden />
      <div className="cinematic-haze" aria-hidden />
      <div className="paper-grain" aria-hidden />

      <section className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-5 py-10">
        {/* Spotlight behind the letter */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-[55%]">
          <div className="cinematic-spotlight" aria-hidden />
        </div>

        <p
          className="relative z-10 mb-8 text-center text-[0.72rem] uppercase tracking-[0.32em] text-[oklch(0.65_0.04_60)]"
          style={{ fontFamily: '"Special Elite", monospace' }}
        >
          {letter.eyebrow}
        </p>

        <button
          type="button"
          onClick={openLetter}
          onKeyDown={onKey}
          aria-label={`Open the birthday letter for ${letter.recipient}`}
          className="hero-envelope relative z-10"
        >
          <span className="wax-seal" aria-hidden />
        </button>

        <h1 className="relative z-10 mt-10 text-center text-[clamp(1.6rem,6vw,2.4rem)] font-semibold italic text-[oklch(0.9_0.03_70)]">
          {letter.title} <span className="hero-heart">♥</span>
        </h1>

        <p
          className="relative z-10 mt-3 text-center text-[0.78rem] uppercase tracking-[0.28em] text-[oklch(0.6_0.04_55)]"
          style={{ fontFamily: '"Special Elite", monospace' }}
        >
          {letter.instruction}
        </p>
      </section>
    </main>
  );
}
