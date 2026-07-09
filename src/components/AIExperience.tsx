'use client';

import { aiExperience } from '@/data/experience';
import { motion } from 'framer-motion';
import { Brain, Calendar } from 'lucide-react';

export default function AIExperience() {
  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-12">
          <Brain className="w-6 h-6 text-gray-600" />
          <h2 className="text-3xl font-bold text-gray-900">AI & ML Experience</h2>
        </div>

        <div className="space-y-8">
          {aiExperience.map((exp, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-900 font-semibold">{exp.company}</span>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{exp.period}</span>
                </div>
              </div>
              <ul className="space-y-3">
                {exp.highlights.map((highlight, hIndex) => (
                  <li key={hIndex} className="text-gray-600 leading-relaxed text-sm flex items-start gap-2">
                    <span className="text-blue-500 mt-1">▹</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}