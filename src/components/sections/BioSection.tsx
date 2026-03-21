'use client';

import { motion } from 'framer-motion';

export function BioSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <p
        className="text-3xl sm:text-4xl font-normal leading-snug tracking-[-0.5px]"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        <span className="text-foreground">
          Ciao &mdash; I&apos;m a Mobile Developer and Flutter Enthusiast
          based in India, passionate about building beautiful cross-platform
          applications.{' '}
        </span>
        <span className="text-muted-foreground">
          My focus is on solving real engineering problems and complex
          architectural studies.
        </span>
      </p>
    </motion.section>
  );
}
