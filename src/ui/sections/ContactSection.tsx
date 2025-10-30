'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import colors from '../../theme/colors';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="rounded-3xl p-12 relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%)'
          }}
        >
          <div className="relative z-10">
            <p className="text-sm font-medium mb-6 tracking-wide" style={{ color: colors.primary }}>● CONTACT</p>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                  HAVE A PROJECT?<br />
                  LET&apos;S BUILD IT TOGETHER
                </h2>
                
                <div className="absolute top-8 right-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                    <div className="text-black text-2xl">✨</div>
                  </div>
                </div>
                
                <div className="absolute bottom-8 right-8 text-right text-gray-400 text-sm">
                  <p>getmemubashir@gmail.com</p>
                  <p>+91 9562229979</p>
                </div>
              </div>
              
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">NAME</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your fullname"
                      className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 py-3 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Where I can contact you"
                      className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 py-3 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">BUDGET</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-gray-600 text-white py-3 focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-black">Amount</option>
                      <option value="5000-10000" className="bg-black">$5,000 - $10,000</option>
                      <option value="10000-25000" className="bg-black">$10,000 - $25,000</option>
                      <option value="25000-50000" className="bg-black">$25,000 - $50,000</option>
                      <option value="50000+" className="bg-black">$50,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">MESSAGE</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Leave a message here"
                      rows={4}
                      className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 py-3 focus:border-white focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  
                  <div className="pt-6">
                    <button
                      type="submit"
                      className="text-black font-bold px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: colors.primary }}
                    >
                      SEND NOW
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
