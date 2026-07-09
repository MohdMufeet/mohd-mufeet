'use client';

import { useState, useEffect } from 'react';
import { personalInfo } from '@/data/personal';
import { Home, User, Briefcase, Code2, MoreHorizontal, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Header - Sticky Top */}
      <header className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="text-lg font-semibold text-gray-900 hover:text-gray-600 transition-colors"
          >
            {personalInfo.name}
          </button>
          <nav className="flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('work')} 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Work
            </button>
            <span className="text-sm text-gray-400">{personalInfo.timezone}</span>
          </nav>
        </div>
      </header>

      {/* Mobile Header - Sticky Bottom */}
      <header className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200">
        <div className="flex items-center justify-around py-3 px-4">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="text-xs">About</span>
          </button>
          <button 
            onClick={() => scrollToSection('work')} 
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-xs">Work</span>
          </button>
          <button 
            onClick={() => scrollToSection('projects')} 
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Code2 className="w-5 h-5" />
            <span className="text-xs">Projects</span>
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MoreHorizontal className="w-5 h-5" />}
            <span className="text-xs">More</span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute bottom-full left-0 right-0 bg-white border-t border-gray-200 p-4 mb-2 shadow-lg">
            <div className="flex flex-col gap-3">
              <span className="text-xs text-gray-400">{personalInfo.timezone}</span>
              <button 
                onClick={() => scrollToSection('skills')} 
                className="text-sm text-left text-gray-600 hover:text-gray-900"
              >
                Skills
              </button>
              <a 
                href={personalInfo.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                GitHub
              </a>
              <a 
                href={personalInfo.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                LinkedIn
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}