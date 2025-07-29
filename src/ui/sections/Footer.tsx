'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2025 Mubashir Ahmed. All rights reserved.
          </div>
          <div className="text-gray-400">
            Built with Next.js & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
