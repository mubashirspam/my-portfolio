'use client';

import React from "react";
import { ArrowRight, Home, Layers, Smartphone } from "lucide-react";
import colors from "../../theme/colors";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  return (
    <section
      id="home"
      className="min-h-screen bg-black text-white p-6 pt-20"
    >
      <div className="max-w-7xl mx-auto h-full">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full min-h-[calc(100vh-5rem)]">
          
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            
            {/* Main Content Card */}
            <div className="bg-gray-100 text-black rounded-3xl p-8 flex-1 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-sm font-medium mb-6 tracking-wide">HELLO, I&apos;M MUBASHIR AHMED</p>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                  BUILD FOR<br />
                  ANY SCREEN<br />
                  ONE CODEBASE
                </h1>
                
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-3 hover:bg-gray-800 transition-colors font-medium"
                >
                  CONTACT ME NOW
                  <ArrowRight size={20} />
                </button>
              </div>
              
              {/* Home Icon */}
              <div className="absolute top-8 right-8 bg-black text-white w-12 h-12 rounded-full flex items-center justify-center">
                <Home size={20} />
              </div>
            </div>
            
            {/* Contact Card */}
            <div className="bg-yellow-400 text-black rounded-3xl p-8 relative overflow-hidden">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                LET&apos;S BUILD<br />
                SOMETHING AMAZING
              </h3>
              
              <div className="flex justify-between items-end mt-6">
                <div>
                  <p className="text-sm font-medium">AVAILABLE FOR PROJECTS</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Wayanad, Kerala</p>
                  <p className="text-sm font-medium">+91 9562229979</p>
                </div>
              </div>
              
              {/* Arrow Icon */}
              <div className="absolute top-8 right-8 bg-black text-white w-12 h-12 rounded-full flex items-center justify-center">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col gap-6">
            
            {/* Service Card */}
            <div className="bg-gray-800 text-white rounded-3xl p-8 relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">PLATFORMS</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button className="border border-gray-600 rounded-full px-6 py-3 text-sm hover:border-gray-400 transition-colors">
                  📱 ANDROID
                </button>
                <button className="border border-gray-600 rounded-full px-6 py-3 text-sm hover:border-gray-400 transition-colors">
                  🍎 iOS
                </button>
                <button className="border border-gray-600 rounded-full px-6 py-3 text-sm hover:border-gray-400 transition-colors">
                  🌐 WEB
                </button>
                <button className="border border-gray-600 rounded-full px-6 py-3 text-sm hover:border-gray-400 transition-colors">
                  💻 DESKTOP
                </button>
              </div>
              
              {/* Layers Icon */}
              <div className="absolute top-8 right-8 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center">
                <Layers size={20} />
              </div>
            </div>
            
            {/* Trade Product Card */}
            <div 
              className="text-white rounded-3xl p-8 flex-1 relative overflow-hidden"
              style={{ backgroundColor: colors.primary }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">10+ APPS BUILT</h3>
              
              {/* Phone Mockup */}
              <div className="relative mt-8">
                <div className="bg-black rounded-2xl p-4 w-48 mx-auto transform rotate-12">
                  <div className="bg-gray-800 rounded-lg p-4 h-32">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-600 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-600 rounded w-1/2"></div>
                      <div className="h-2 bg-gray-600 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 className="text-xl font-bold mt-8">
                SINGLE CODEBASE<br />
                MULTIPLE PLATFORMS
              </h4>
              
              {/* Diamond Icon */}
              <div className="absolute top-8 right-8 bg-black text-white w-12 h-12 rounded-full flex items-center justify-center">
                <Smartphone size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
