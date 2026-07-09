'use client';

import { personalInfo } from '@/data/personal';
import About from '@/components/About';
import WorkExperience from '@/components/WorkExperience';
import AIExperience from '@/components/AIExperience';
import FeaturedWork from '@/components/FeaturedWork';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';

// These icons exist in lucide-react
import { 
  ChevronDown, 
  ExternalLink,
  Code2
} from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center px-6 pt-20">
        <div className="max-w-3xl mx-auto w-full">
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-4 font-mono">{personalInfo.timezone}</p>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4 tracking-tight">
              {personalInfo.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light">{personalInfo.title}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href={personalInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Code2 className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </a>
            <a 
              href={personalInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>

          <div className="mt-20 animate-bounce">
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </section>

      <About />
      <FeaturedWork />
      <WorkExperience />
      <AIExperience />
      <Projects />
      <Skills />

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-sm text-gray-400 border-t border-gray-100">
        <p>© 2026 {personalInfo.name}. Built with Next.js</p>
      </footer>
    </>
  );
}