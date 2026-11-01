"use client";

import { useEffect, useRef, useState } from "react";

export type PortfolioStat = {
  value: number;
  suffix?: string;
  label: string;
  detail: string;
};

type PortfolioStatsProps = {
  stats: PortfolioStat[];
};

export function PortfolioStats({ stats }: PortfolioStatsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [values, setValues] = useState(() => stats.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frameId = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setValues(stats.map((stat) => stat.value));
          return;
        }

        const startedAt = performance.now();
        const duration = 1400;
        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const easedProgress = 1 - (1 - progress) ** 3;
          setValues(stats.map((stat) => Math.round(stat.value * easedProgress)));

          if (progress < 1) {
            frameId = requestAnimationFrame(animate);
          }
        };

        frameId = requestAnimationFrame(animate);
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [stats]);

  return (
    <section
      ref={sectionRef}
      aria-label="Portfolio highlights"
      className="container-shell pb-4"
    >
      <div className="portfolio-stats grid grid-cols-4 rounded-md border border-border bg-surface">
        {stats.map((stat, index) => (
          <article
            key={stat.label}
            className="portfolio-stat min-w-0 px-2 py-6 text-center sm:px-5 sm:py-8"
            aria-label={`${stat.value}${stat.suffix ?? ""} ${stat.label}. ${stat.detail}`}
          >
            <p
              className="text-[clamp(1.5rem,5vw,4rem)] font-semibold leading-none tracking-tight text-foreground tabular-nums"
              aria-hidden="true"
            >
              {values[index] ?? 0}
              {stat.suffix ?? ""}
            </p>
            <p className="mt-3 font-mono text-[0.625rem] uppercase leading-tight tracking-wide text-muted-foreground sm:text-label sm:tracking-[0.12em]">
              {stat.label}
            </p>
            <span className="sr-only">{stat.detail}</span>
            <div className="portfolio-stat__rule mx-auto mt-5" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
