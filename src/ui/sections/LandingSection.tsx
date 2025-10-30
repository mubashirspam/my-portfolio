"use client";

import React from "react";
import Image from "next/image";
import colors from "../../theme/colors";
import profileImage from "../../assets/image.png";

const LandingSection: React.FC = () => {
  return (
    <section
      id="landing"
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Tagline */}
          <p className="text-gray-400 text-sm md:text-base tracking-[0.3em] mb-12 uppercase">
            Crafting Digital Goods Since — Y.2017
          </p>

          {/* Large Name with Image */}
          <div className="relative inline-block w-full">
            <h1 className="text-[10vw] md:text-[8vw] lg:text-[7vw] font-black leading-none tracking-tight">
              <span className="block" style={{ color: colors.primary }}>
                MUBASHIR
              </span>
              <span
                className="block relative"
                style={{ color: colors.primary }}
              >
                <span className="inline-block mr-4">AHA</span>
                {/* Circular Image */}
                <span className="inline-block relative align-middle">
                  <div
                    className="relative w-[15vw] h-[15vw] md:w-[12vw] md:h-[12vw] lg:w-[10vw] lg:h-[10vw] rounded-full overflow-hidden border-4 flex-shrink-0"
                    style={{ borderColor: colors.primary }}
                  >
                    <Image
                      src={profileImage}
                      alt="Mubashir Ahammed"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </span>
                <span className="inline-block ml-4">MMED</span>
              </span>
            </h1>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
