"use client";

import { useEffect, useState } from "react";

export interface Stat {
  value: string;
  label: string;
}

export default function StatsCarousel({
  stats,
  intervalMs = 4500,
}: {
  stats: Stat[];
  intervalMs?: number;
}) {
  const pages: Stat[][] = [];
  for (let i = 0; i < stats.length; i += 2) {
    pages.push(stats.slice(i, i + 2));
  }

  const [pageIndex, setPageIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || pages.length <= 1) return;
    const id = setInterval(() => {
      setPageIndex((i) => (i + 1) % pages.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [paused, pages.length, intervalMs]);

  const current = pages[pageIndex] ?? [];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        key={pageIndex}
        className="stat-flip grid grid-cols-1 gap-8 sm:grid-cols-2"
        style={{ perspective: "800px" }}
      >
        {current.map((s) => (
          <div key={s.label}>
            <p className="font-display text-3xl font-bold text-steel-700">{s.value}</p>
            <p className="mt-1.5 text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {pages.length > 1 && (
        <div className="mt-8 flex justify-center gap-1.5">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Показать группу показателей ${i + 1} из ${pages.length}`}
              onClick={() => setPageIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === pageIndex ? "w-6 bg-signal" : "w-1.5 bg-line"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}