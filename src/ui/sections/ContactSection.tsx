'use client';

import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import colors from '../../theme/colors';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 relative z-10 bg-gray-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-gray-400 mb-4">
            {"// Get In Touch"}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Let&rsquo;s Build Something Amazing Together
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to bring your app ideas to life? Let&rsquo;s discuss your
            next Flutter project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border flex items-center justify-center" style={{ borderColor: colors.primary }}>
                <Mail style={{ color: colors.primary }} size={20} />
              </div>
              <div>
                <h3 className="text-white font-semibold">Email</h3>
                <p className="text-gray-300">getmemubashir@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border flex items-center justify-center" style={{ borderColor: colors.primary }}>
                <Phone style={{ color: colors.primary }} size={20} />
              </div>
              <div>
                <h3 className="text-white font-semibold">Phone</h3>
                <p className="text-gray-300">+91 95622 29979</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border flex items-center justify-center" style={{ borderColor: colors.primary }}>
                <MapPin style={{ color: colors.primary }} size={20} />
              </div>
              <div>
                <h3 className="text-white font-semibold">Location</h3>
                <p className="text-gray-300">Wayanad, Kerala, India</p>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <a
                href="https://www.linkedin.com/in/mubashir-ahmad/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-white/20 flex items-center justify-center transition-colors"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-white/20 flex items-center justify-center transition-colors"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">
                Name *
              </label>
              <input
                type="text"
                className="w-full bg-transparent border border-white/20 p-3 text-white focus:outline-none transition-colors"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                className="w-full bg-transparent border border-white/20 p-3 text-white focus:outline-none transition-colors"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                placeholder="Your email"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Project Type
              </label>
              <select className="w-full bg-black border border-white/20 p-3 text-white focus:outline-none transition-colors"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}>
                <option>Mobile App Development</option>
                <option>Cross-Platform App</option>
                <option>UI/UX Design</option>
                <option>Consultation</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full bg-transparent border border-white/20 p-3 text-white focus:outline-none transition-colors resize-none"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button className="w-full px-8 py-3 border border-white/20 text-white transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.primary;
                e.currentTarget.style.color = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = 'white';
              }}>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
