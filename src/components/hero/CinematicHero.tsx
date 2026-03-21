'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function CinematicHero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Fullscreen Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      {/* Subtle dark overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-black/30" />

      {/* Hero Content — vertically centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-32">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-1.5 text-sm font-medium rounded-full text-white/80 mb-8"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          Available for freelance projects
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-2px] max-w-5xl font-normal text-white"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Crafting <em className="not-italic text-white/50">digital</em>{' '}
          experiences that{' '}
          <em className="not-italic text-white/50">inspire.</em>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/60 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed"
        >
          Senior Flutter Engineer with 6+ years building production mobile apps.
          Clean architecture, beautiful interfaces, and scalable solutions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-12"
        >
          <a
            href="https://topmate.io/mubashir_ahammed"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-10 py-4 text-base font-medium text-white hover:scale-[1.03] transition-transform cursor-pointer"
          >
            Book a Call
          </a>
          <a
            href="#contact"
            className="rounded-full px-10 py-4 text-base font-medium text-white/80 hover:text-white border border-white/15 hover:border-white/30 transition-all cursor-pointer"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="#bio"
          className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
        >
          <span className="text-xs font-medium tracking-wider uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
