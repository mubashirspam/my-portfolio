'use client';

import React from 'react';
import { Download } from 'lucide-react';
import colors from '../../theme/colors';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <p className="text-sm font-mono text-gray-400 mb-4">
              {"// Hello, World!"}
            </p>
            <h1 className="hero-title text-white mb-4">
              Mubashir <span style={{ color: colors.primary }}>Ahmed</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-400 mb-8 font-light">
              &ldquo; Lead Flutter Developer &rdquo;
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="text-center lg:text-left">
                <div className="text-4xl md:text-6xl font-bold mb-2" style={{ color: colors.primary }}>
                  4+
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  Years Experience
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-4xl md:text-6xl font-bold mb-2" style={{ color: colors.primary }}>
                  10+
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  Apps Developed
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 text-white rounded-none border transition-all duration-300 hover:bg-transparent"
                style={{
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                  '--hover-color': colors.primary
                } as React.CSSProperties & { '--hover-color': string }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary;
                  e.currentTarget.style.color = 'white';
                }}
              >
                Get In Touch
              </button>
              <a
                href="#"
                className="px-8 py-3 border border-white/20 text-white transition-all duration-300 flex items-center justify-center gap-2"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = 'white';
                }}
              >
                <Download size={16} />
                Download CV
              </a>
            </div>
          </div>

          {/* Spline 3D Scene */}
          <div className="relative h-[400px] lg:h-[600px] flex items-center justify-center">
            <iframe
              src="https://flutter.dev/assets/images/dash/Dashatars.png"
              className="w-full h-full border-none"
              title="Flutter Dash"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-title {
          font-size: 120px;
          line-height: 1;
          font-weight: 500;
          letter-spacing: -0.04em;
        }

        @media screen and (max-width: 991px) {
          .hero-title {
            font-size: 100px;
          }
        }

        @media screen and (max-width: 767px) {
          .hero-title {
            font-size: 80px;
          }
        }

        @media screen and (max-width: 479px) {
          .hero-title {
            font-size: 64px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
