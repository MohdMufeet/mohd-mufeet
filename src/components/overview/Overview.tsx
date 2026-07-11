"use client";

import { motion } from "framer-motion";

export default function Overview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-xl border border-[#30363d] bg-[#161b22] p-8"
    >
      <span className="text-sm text-gray-500">
        MohdMufeet / README.md
      </span>

      <h1 className="mt-6 text-5xl font-bold leading-tight">
        Hi 👋 I'm Mohd Mufeet
      </h1>

      <h2 className="mt-4 text-2xl font-semibold text-[#58a6ff]">
        Full Stack Developer
      </h2>

      <p className="mt-8 leading-8 text-gray-300">
        Passionate about building scalable web applications using
        React, Next.js, TypeScript, Node.js and modern backend
        technologies.
      </p>

      <blockquote className="mt-8 rounded-lg border-l-4 border-[#58a6ff] bg-[#0d1117] p-5 italic text-gray-300">
        "Creating fast, accessible and beautiful user experiences."
      </blockquote>

      <div className="mt-10">
        <h3 className="mb-4 text-2xl font-bold">
          🚀 Tech Stack
        </h3>

        <div className="flex flex-wrap gap-3">
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "Express",
            "MongoDB",
            "Supabase",
            "Tailwind CSS",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[#30363d] bg-[#0d1117] px-4 py-2 text-sm transition hover:border-[#58a6ff]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}