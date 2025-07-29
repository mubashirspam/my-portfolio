'use client';

import React from 'react';
import colors from '../../theme/colors';

interface SkillGroup {
  category: string;
  items: string[];
}

interface SkillsSectionProps {
  skills: SkillGroup[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <section id="skills" className="py-20 relative z-10 bg-gray-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-gray-400 mb-4">
            {"// Technical Skills"}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            My <span style={{ color: colors.primary }}>Expertise</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
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
              <h3 className="text-xl font-bold mb-4 transition-colors" style={{ color: colors.primary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}>
                {skillGroup.category}
              </h3>
              <div className="space-y-2">
                {skillGroup.items.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></span>
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
