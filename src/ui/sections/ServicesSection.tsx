'use client';

import React from 'react';
import { Smartphone, Monitor, Globe, Laptop } from 'lucide-react';
import colors from '../../theme/colors';

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="rounded-3xl p-12 relative overflow-hidden"
          style={{ backgroundColor: colors.primary }}
        >
          <div className="relative z-10">
            <p className="text-sm font-medium mb-6 tracking-wide text-black">● PLATFORMS</p>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight mb-8">
                  ONE CODEBASE<br />
                  EVERY<br />
                  PLATFORM
                </h2>
              </div>
              
              <div>
                <p className="text-lg text-black mb-8 leading-relaxed">
                  Flutter enables me to build natively compiled applications 
                  for mobile, web, desktop, and embedded devices from a single 
                  codebase. Fast, productive, and flexible development.
                </p>
              </div>
            </div>
            
            {/* Platform Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              
              {/* Mobile Development */}
              <div className="bg-black text-white rounded-2xl p-8 relative">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-xl font-bold">
                    MOBILE APPS<br />
                    ANDROID & iOS
                  </h3>
                  <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center">
                    <Smartphone size={20} />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-2 border border-gray-600 rounded-full text-sm">PLAY STORE</span>
                  <span className="px-4 py-2 border border-gray-600 rounded-full text-sm">APP STORE</span>
                  <span className="px-4 py-2 border border-gray-600 rounded-full text-sm">NATIVE PERFORMANCE</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">📱 ANDROID</span>
                  <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🍎 iOS</span>
                </div>
              </div>
              
              {/* Web Development */}
              <div className="bg-black text-white rounded-2xl p-8 relative">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-xl font-bold">
                    WEB APPLICATIONS<br />
                    RESPONSIVE & PWA
                  </h3>
                  <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center">
                    <Globe size={20} />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-2 border border-gray-600 rounded-full text-sm">PROGRESSIVE WEB APP</span>
                  <span className="px-4 py-2 bg-yellow-400 text-black rounded-full text-sm font-medium">RESPONSIVE</span>
                  <span className="px-4 py-2 border border-gray-600 rounded-full text-sm">FAST LOADING</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🌐 WEB</span>
                  <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">📱 MOBILE WEB</span>
                </div>
              </div>
              
              {/* Desktop Development */}
              <div className="bg-black text-white rounded-2xl p-8 relative">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-xl font-bold">
                    DESKTOP APPS<br />
                    WINDOWS, MAC, LINUX
                  </h3>
                  <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center">
                    <Monitor size={20} />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-2 border border-gray-600 rounded-full text-sm">WINDOWS</span>
                  <span className="px-4 py-2 border border-gray-600 rounded-full text-sm">macOS</span>
                  <span className="px-4 py-2 border border-gray-600 rounded-full text-sm">LINUX</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">💻 DESKTOP</span>
                  <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🖥️ NATIVE</span>
                </div>
              </div>
              
              {/* Cross-Platform Benefits */}
              <div className="bg-black text-white rounded-2xl p-8 relative">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-xl font-bold">
                    CROSS-PLATFORM<br />
                    SINGLE CODEBASE
                  </h3>
                  <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center">
                    <Laptop size={20} />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-2 border border-gray-600 rounded-full text-sm">FASTER DEVELOPMENT</span>
                  <span className="px-4 py-2 border border-gray-600 rounded-full text-sm">COST EFFECTIVE</span>
                  <span className="px-4 py-2 bg-yellow-400 text-black rounded-full text-sm font-medium">ONE TEAM</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">⚡ FAST</span>
                  <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🔄 HOT RELOAD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
