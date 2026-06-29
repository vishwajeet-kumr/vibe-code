"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

const STEPS = [
  { id: 1, text: "Analyzing your project description", timeMs: 0 },
  { id: 2, text: "Designing system architecture", timeMs: 5000 },
  { id: 3, text: "Writing foundation prompts", timeMs: 12000 },
  { id: 4, text: "Mapping file structure & build sequence", timeMs: 20000 },
  { id: 5, text: "Finalizing your prompt kit", timeMs: 26000 },
];

export function GenerationLoader() {
  const [activeStepId, setActiveStepId] = useState<number>(0);
  const [dots, setDots] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reveal steps
    const timeouts = STEPS.map((step) =>
      setTimeout(() => {
        setActiveStepId(step.id);
      }, step.timeMs)
    );

    // Typing dots
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    // Progress bar animation to 95% over 30s
    const progressTimeout = setTimeout(() => {
      setProgress(95);
    }, 50);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(dotInterval);
      clearTimeout(progressTimeout);
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 shadow-sm">
      <h2 className="mb-1 font-serif text-2xl font-normal text-[var(--text-primary)]">
        Building your prompt kit
      </h2>
      <p className="mb-8 text-sm text-[var(--text-muted)]">
        This takes about 30 seconds. Sit tight.
      </p>

      <div className="mb-8 flex flex-col gap-4">
        {STEPS.map((step) => {
          const isDone = activeStepId > step.id;
          const isActive = activeStepId === step.id;
          const isPending = activeStepId < step.id;

          return (
            <div key={step.id} className="flex items-center gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                {isDone && <Check className="h-4 w-4 text-[var(--accent)]" strokeWidth={3} />}
                {isActive && <Loader2 className="h-4 w-4 animate-spin text-[var(--accent)]" />}
                {isPending && <div className="h-2 w-2 rounded-full border border-[var(--border)]" />}
              </div>
              <span
                className={`text-sm ${
                  isDone || isActive ? "font-medium text-[var(--accent)]" : "text-[var(--text-muted)]/50"
                }`}
              >
                {step.text}
                {isActive && <span className="inline-block w-4 text-left">{dots}</span>}
              </span>
            </div>
          );
        })}
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--accent-light)]/50">
        <div
          className="h-full bg-[var(--accent)]"
          style={{ width: `${progress}%`, transition: "width 30s linear" }}
        />
      </div>
    </div>
  );
}
