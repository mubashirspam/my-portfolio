'use client';

import { motion } from 'framer-motion';

const words1 = "Ciao — I'm a Mobile Developer and Flutter Enthusiast based in India, passionate about building beautiful cross-platform applications.".split(' ');
const words2 = "My focus is on solving real engineering problems and complex architectural studies.".split(' ');

export function BioSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated orbit decoration */}
      <motion.div
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 320 320" fill="none" className="w-full h-full opacity-[0.07]">
          <circle cx="160" cy="160" r="150" stroke="var(--fg)" strokeWidth="0.5" strokeDasharray="4 6" />
          <circle cx="160" cy="160" r="100" stroke="var(--fg)" strokeWidth="0.5" strokeDasharray="4 6" />
          <circle cx="160" cy="160" r="50" stroke="var(--fg)" strokeWidth="0.5" />
          <circle cx="160" cy="10" r="5" fill="var(--accent-color)" />
          <circle cx="260" cy="160" r="4" fill="var(--accent-color)" opacity="0.6" />
          <circle cx="110" cy="160" r="3" fill="var(--accent-color)" opacity="0.4" />
        </svg>
      </motion.div>

      {/* Floating dots decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: '10%', y: '20%', size: 4, delay: 0, duration: 6 },
          { x: '85%', y: '30%', size: 3, delay: 1, duration: 8 },
          { x: '70%', y: '80%', size: 5, delay: 2, duration: 7 },
          { x: '25%', y: '75%', size: 3, delay: 0.5, duration: 9 },
          { x: '50%', y: '15%', size: 4, delay: 1.5, duration: 6 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: dot.x,
              top: dot.y,
              width: dot.size,
              height: dot.size,
              backgroundColor: 'var(--accent-color)',
              opacity: 0.15,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              delay: dot.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-16 h-1 rounded-full mb-10 origin-left"
        style={{ backgroundColor: 'var(--accent-color)' }}
      />

      {/* Word-by-word animated text */}
      <p
        className="text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.3] tracking-[-0.5px] relative z-10"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        {words1.map((word, i) => (
          <motion.span
            key={`w1-${i}`}
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="inline-block mr-[0.3em] text-foreground"
          >
            {word}
          </motion.span>
        ))}
        <br className="hidden sm:block" />
        {words2.map((word, i) => (
          <motion.span
            key={`w2-${i}`}
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (words1.length + i) * 0.04 }}
            className="inline-block mr-[0.3em] text-muted-foreground"
          >
            {word}
          </motion.span>
        ))}
      </p>
    </section>
  );
}
