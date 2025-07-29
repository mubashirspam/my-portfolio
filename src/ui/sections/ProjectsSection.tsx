'use client';

import React from 'react';
import colors from '../../theme/colors';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  stats: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-gray-400 mb-4">
            {"// Portfolio"}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Featured <span style={{ color: colors.primary }}>Projects</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-white/10 p-6 transition-all duration-300 group"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${colors.primary}4D`; // 30% opacity
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white transition-colors"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'white';
                  }}>
                  {project.title}
                </h3>
                <div className="text-right">
                  <p className="text-gray-400">
                    {project.link !== '#' ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = colors.primary;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#9CA3AF';
                        }}
                      >
                        View
                      </a>
                    ) : (
                      'Coming Soon'
                    )}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs border border-white/20 text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="text-sm font-mono" style={{ color: colors.primary }}>
                {project.stats}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
