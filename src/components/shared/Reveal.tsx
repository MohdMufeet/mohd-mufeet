"use client";

import type { ReactNode } from "react";
import { domAnimation, LazyMotion, m, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.25, delay, ease: [0.2, 0, 0, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
