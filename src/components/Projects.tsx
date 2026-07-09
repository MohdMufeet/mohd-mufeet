'use client';

import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
import { Code2, ExternalLink, CheckCircle } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-12">
          <Code2 className="w-6 h-6 text-gray-600" />
          <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">{projects.name}</h3>
            <p className="text-gray-600 mt-1">{projects.subtitle}</p>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{projects.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><span className="font-medium">Name:</span> {projects.details.product.name}</li>
                <li><span className="font-medium">Version:</span> {projects.details.product.version}</li>
                <li><span className="font-medium">License:</span> {projects.details.product.license}</li>
                <li>
                  <span className="font-medium">Platforms:</span>{' '}
                  {projects.details.product.platforms.join(', ')}
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Links</h4>
              <div className="space-y-2 text-sm">
                <a 
                  href={projects.details.product.apiEndpoint}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  API Endpoint
                </a>
                <a 
                  href={projects.details.product.documentation}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Documentation
                </a>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {projects.details.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Supported Integrations</h4>
            <div className="flex flex-wrap gap-2">
              {projects.details.integrations.map((integration, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                >
                  {integration}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}