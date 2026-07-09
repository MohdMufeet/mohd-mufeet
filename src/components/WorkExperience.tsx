'use client';

import { experiences } from '@/data/experience';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

export default function WorkExperience() {
  return (
    <section id="work" className="py-20 px-6 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-12">
          <Briefcase className="w-6 h-6 text-gray-600" />
          <h2 className="text-3xl font-bold text-gray-900">Work Experience</h2>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 border-l-2 border-gray-200">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-900" />
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{exp.role}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-600 font-medium">{exp.company}</span>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-3">
                {exp.highlights.map((highlight, hIndex) => (
                  <li key={hIndex} className="text-gray-600 leading-relaxed flex items-start gap-2">
                    <span className="text-gray-400 mt-1.5">•</span>
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