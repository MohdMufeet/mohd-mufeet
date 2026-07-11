import React from "react";
import { Monitor } from "lucide-react";

export default function ContentArea(): React.JSX.Element {
  return (
    <div>
      {/* File Path Indicator */}
      <div className="text-xs font-mono text-gray-400 dark:text-neutral-500 mb-6 border-b border-gray-100 dark:border-neutral-800 pb-2">
        Mohd Mufeet / <span className="text-gray-600 dark:text-neutral-300">Overview.md</span>
      </div>

      {/* Main Animated Title / Accent Header */}
      <div className="text-center my-8">
        <h2 className="text-xl sm:text-2xl font-mono text-pink-500 tracking-wide font-medium">
          Creating User-Centric Ex
        </h2>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mt-4">
          Welcome to My Digital Space
        </h1>
      </div>

      <hr className="my-6 border-gray-200 dark:border-neutral-800" />

      {/* Intro Paragraph */}
      <p className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
        Hey there! I'm <strong className="text-neutral-900 dark:text-neutral-50 font-semibold">Sahil Khandekar</strong>, a passionate <strong className="text-neutral-900 dark:text-neutral-50 font-semibold">Full-Stack Developer</strong> and <strong className="text-neutral-900 dark:text-neutral-50 font-semibold">BSc IT student</strong> from <strong className="text-neutral-900 dark:text-neutral-50 font-semibold">Mumbai, India</strong>. This portfolio is a reflection of my journey in crafting impactful, scalable, and user-centric web applications using modern technologies.
      </p>

      {/* Blockquote Style */}
      <div className="my-6 pl-4 border-l-4 border-gray-300 dark:border-neutral-700 italic text-sm sm:text-base text-gray-600 dark:text-gray-400">
        I believe in <span className="font-medium text-gray-800 dark:text-neutral-200">learning by building</span> — every project here represents my dedication to solving real-world problems through clean code and thoughtful design.
      </div>

      {/* Tech Stack Section */}
      <div className="mt-8 flex items-center gap-2 text-lg sm:text-xl font-bold text-neutral-950 dark:text-neutral-50">
        <Monitor className="h-5 w-5 text-gray-700 dark:text-neutral-400" />
        <h3>Tech Stack</h3>
      </div>
      
      {/* Framer-motion icons or list goes here */}
    </div>
  );
}