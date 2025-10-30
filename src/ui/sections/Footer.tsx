'use client';

import React from 'react';
import { ArrowUp, ArrowRight } from 'lucide-react';
import colors from '../../theme/colors';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Main Content */}
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
              NEED AN APP FOR<br />
              <span className="text-yellow-400">ANY PLATFORM?</span><br />
              <span className="flex items-center gap-4">
                <span className="text-white">📱🌐💻</span>
              </span>
              <span className="text-white">ONE CODEBASE!</span>
            </h2>
          </div>
          
          {/* Right Side - Contact Cards */}
          <div className="space-y-6">
            
            {/* Have a Project Card */}
            <div className="bg-gray-100 text-black rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-2">HAVE A PROJECT?</h3>
              <p className="text-sm text-gray-600 mb-6">LET&apos;S WORK TOGETHER</p>
              
              <button 
                className="w-full text-black font-semibold py-4 rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: colors.primary }}
              >
                SEND ME A MESSAGE
                <ArrowRight size={20} />
              </button>
            </div>
            
            {/* Navigation & Socials */}
            <div className="grid grid-cols-2 gap-6">
              
              {/* Content Table */}
              <div className="bg-gray-800 text-white rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-sm">CONTENT TABLE</h4>
                  <div className="w-6 h-6 border border-gray-600 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400"></div>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>HOME</div>
                  <div>ABOUT</div>
                  <div>SKILLS</div>
                  <div>PROJECTS</div>
                  <div>CONTACT</div>
                </div>
              </div>
              
              {/* Socials */}
              <div className="bg-gray-800 text-white rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-sm">SOCIALS</h4>
                  <div className="w-6 h-6 border border-gray-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>GITHUB</div>
                  <div>LINKEDIN</div>
                  <div>PLAY STORE</div>
                  <div>APP STORE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back to Top Button */}
        <div className="mt-16">
          <button
            onClick={scrollToTop}
            className="w-full text-black font-bold py-6 rounded-2xl flex items-center justify-center gap-4 transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: colors.primary }}
          >
            BACK TO TOP
            <ArrowUp size={24} />
          </button>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Mubashir Ahmed - Lead Flutter Developer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
