import { useEffect, useRef, useState } from "react";
import { letter } from "@/content/letter";
import { LetterStatusRail, type StatusKey } from "./LetterStatusRail";

export function ScrollingLetterPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = new Set(prev);
          for (const e of entries) {
            if (e.isIntersecting) {
              const idx = Number((e.target as HTMLElement).dataset.idx);
              next.add(idx);
            }
          }
          return next;
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );
    paragraphRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const status: StatusKey =
    progress >= 0.98
      ? "complete"
      : progress >= 0.75
      ? "almost"
      : progress >= 0.15
      ? "reading"
      : "opened";

  return (
    <div className="relative min-h-dvh w-full overflow-x-hidden" ref={containerRef}>
      <div className="cinematic-background" aria-hidden />
      <div className="cinematic-haze" aria-hidden style={{ opacity: 0.5 }} />
      <div className="paper-grain" aria-hidden />

      {/* very soft, slower spotlight */}
      <div className="pointer-events-none fixed left-1/2 top-1/2 -z-10 h-[140vmin] w-[140vmin] -translate-x-1/2 -translate-y-1/2 opacity-60">
        <div className="cinematic-spotlight quiet" aria-hidden />
      </div>

      <LetterStatusRail active={status} />

      <article className="relative mx-auto w-full max-w-[640px] px-4 py-16 sm:py-24">
        <div className="letter-sheet">
          <header>
            <h1>{letter.heading}</h1>
            <p className="dateline">{letter.dateline}</p>
          </header>
          {letter.paragraphs.map((text, i) => (
            <p
              key={i}
              data-idx={i}
              ref={(el) => {
                paragraphRefs.current[i] = el;
              }}
              className={`letter-paragraph ${visible.has(i) ? "is-visible" : ""}`}
            >
              {text}
            </p>
          ))}
        </div>

        <p
          className="mt-10 text-center text-[0.7rem] uppercase tracking-[0.3em] text-[oklch(0.55_0.04_55)]"
          style={{ fontFamily: '"Special Elite", monospace' }}
        >
          ♥ end of letter ♥
        </p>
      </article>
    </div>
  );
}
