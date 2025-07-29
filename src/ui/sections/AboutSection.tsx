'use client';

import React from 'react';
import colors from '../../theme/colors';

interface Experience {
  title: string;
  company: string;
  period: string;
  type: string;
  highlights: string[];
}

interface AboutSectionProps {
  experiences: Experience[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ experiences }) => {
  return (
    <section id="about" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-gray-400 mb-4">
            {"// About Me"}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Professional <span style={{ color: colors.primary }}>Journey</span>
          </h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-300 leading-relaxed">
            <p className="mb-6">
              As a senior Flutter developer with more than four years of
              hands-on experience, I have designed over 10 cross-platform
              applications that have touched sectors like e-commerce,
              e-learning, and healthcare. I am driven to create apps that are
              seamless on web, Android, and iOS, yet feel simple and intuitive
              for users.
            </p>
            <p>
              With technologies like Flutter, Dart, Firebase, Supabase,
              Node.js, and Django, I love transforming ideas into fully
              deployed, scalable solutions. I am a strong believer in
              constructing proper foundations like MVVM, MVC, BLoC, and Clean
              Architecture to make apps not just functional but also simple to
              change and scale in the long run.
            </p>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="border border-white/10 p-6 transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${colors.primary}4D`; // 30% opacity
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {exp.title}
                  </h3>
                  <p className="mb-2" style={{ color: colors.primary }}>
                    {exp.company}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">{exp.period}</p>
                  <p className="text-sm text-gray-500">{exp.type}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {exp.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="text-gray-300 flex items-start gap-2"
                  >
                    <span className="mt-2" style={{ color: colors.primary }}>•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
