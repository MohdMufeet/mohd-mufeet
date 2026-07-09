'use client';

import { featuredWork } from '@/data/personal';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FeaturedWork() {
  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Featured Work</span>
        <div className="mt-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">{featuredWork.title}</h3>
          <p className="text-gray-300 leading-relaxed mb-6">{featuredWork.description}</p>
          <a 
            href={featuredWork.caseStudyLink}
            className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition-colors group"
          >
            Read case study
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}