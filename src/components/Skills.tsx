'use client';

import { skillCategories } from '@/data/skills';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-12">
          <Zap className="w-6 h-6 text-gray-600" />
          <h2 className="text-3xl font-bold text-gray-900">Technical Skills</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill, sIndex) => (
                  <li key={sIndex} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-gray-400 mt-1.5">•</span>
                    <span>{skill}</span>
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
