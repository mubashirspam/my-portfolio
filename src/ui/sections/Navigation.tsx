"use client";

import React from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import colors from "../../theme/colors";

interface NavigationProps {
  activeSection: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  scrollToSection: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
}) => {
  const navItems = ["home", "about", "skills", "projects", "contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left - Menu Icon */}
          <button
            className="text-white hover:text-gray-300 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Center - Name in WindSong Font */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1
              className="text-4xl md:text-5xl text-gray-400 tracking-wide typewriter"
              style={{ fontFamily: "var(--font-wind-song)" }}
            >
              Mubashir
            </h1>
          </div>

          {/* Right - Contact Button */}
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-transparent border border-white/20 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:border-white transition-all duration-300 group"
          >
            CONTACT US NOW
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowRight size={16} className="text-black" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/10">
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  scrollToSection(item);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left capitalize transition-colors ${
                  activeSection === item ? "" : "text-gray-300"
                }`}
                style={{
                  color: activeSection === item ? colors.primary : undefined,
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
