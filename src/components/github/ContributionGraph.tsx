"use client";

import { motion } from "framer-motion";

const colors = [
  "bg-[#161b22]",
  "bg-[#0e4429]",
  "bg-[#006d32]",
  "bg-[#26a641]",
  "bg-[#39d353]",
];

const cells = Array.from({ length: 364 }, (_, i) => i);

export default function ContributionGraph() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mt-8 rounded-xl border border-[#30363d] bg-[#161b22] p-6"
    >
      <h2 className="mb-6 text-xl font-bold">
        Contributions
      </h2>

      <div className="grid grid-cols-28 gap-1 overflow-x-auto">
        {cells.map((cell) => (
          <div
            key={cell}
            className={`h-3 w-3 rounded-sm ${
              colors[Math.floor(Math.random() * colors.length)]
            } transition hover:scale-125`}
          />
        ))}
      </div>

      <p className="mt-6 text-sm text-gray-500">
        GitHub-style contribution graph
      </p>
    </motion.section>
  );
}