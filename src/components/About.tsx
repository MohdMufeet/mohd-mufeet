'use client';

import { personalInfo, featuredWork } from '@/data/personal';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Hi, I&apos;m {personalInfo.name}</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          {personalInfo.shortBio}
        </p>
        
        {/* Featured Work Card */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Featured Work</span>
          <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3">{featuredWork.title}</h3>
          <p className="text-gray-600 leading-relaxed mb-4">{featuredWork.description}</p>
          <a 
            href={featuredWork.caseStudyLink}
            className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
          >
            Read case study →
          </a>
        </div>
      </motion.div>
    </section>
  );
}