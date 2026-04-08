'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % testimonials.length);
  }, []);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const testimonial = testimonials[currentIndex];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      {/* Header */}
      <div className="mb-2">
        <SectionBadge label="WHAT CLIENTS SAY" />
        <h2 className="text-4xl sm:text-5xl font-normal text-foreground mt-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Kind Words
        </h2>
      </div>
      <div className="flex items-center justify-end mb-4">

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="p-2 text-muted-foreground hover:text-foreground rounded-xl border border-border/50 hover:border-border hover:bg-surface/50 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-foreground w-6 text-center tabular-nums font-mono">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <button
            onClick={next}
            className="p-2 text-muted-foreground hover:text-foreground rounded-xl border border-border/50 hover:border-border hover:bg-surface/50 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Testimonial Card */}
      <div className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-500/8 via-transparent to-blue-500/5 backdrop-blur-xl p-8 sm:p-10 relative overflow-hidden min-h-[280px]">
        {/* Decorative animated shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large quote mark */}
          <motion.div
            className="absolute -top-6 -left-2 text-[140px] leading-none opacity-[0.03] select-none"
            style={{ fontFamily: "'Instrument Serif', serif" }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            &ldquo;
          </motion.div>

          {/* Floating sparkles */}
          {[
            { x: '80%', y: '15%', delay: 0 },
            { x: '90%', y: '60%', delay: 1.5 },
            { x: '75%', y: '85%', delay: 3 },
          ].map((s, i) => (
            <motion.svg
              key={i}
              className="absolute w-4 h-4"
              style={{ left: s.x, top: s.y }}
              viewBox="0 0 16 16"
              animate={{
                opacity: [0, 0.15, 0],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: s.delay,
                ease: 'easeInOut',
              }}
            >
              <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z" fill="var(--accent-color)" />
            </motion.svg>
          ))}

          {/* Animated circle ring */}
          <motion.svg
            className="absolute bottom-4 right-4 w-24 h-24 opacity-[0.04]"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--fg)" strokeWidth="0.5" strokeDasharray="8 4" />
            <circle cx="50" cy="5" r="3" fill="var(--accent-color)" />
          </motion.svg>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: -30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.08, type: 'spring' }}
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </motion.div>
              ))}
            </div>

            <p
              className="text-xl sm:text-2xl leading-relaxed text-foreground/90 italic mb-8"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              &ldquo;{testimonial.content}&rdquo;
            </p>

            <div className="flex items-center gap-4">
              {/* Avatar circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                {testimonial.name[0]}
              </div>
              <div>
                <p className="text-base font-bold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-violet-500/10">
          <motion.div
            key={currentIndex}
            className="h-full rounded-r-full"
            style={{ backgroundColor: 'var(--accent-color)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 6, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="h-2 rounded-full transition-all duration-300"
            style={
              index === currentIndex
                ? { width: '1.5rem', backgroundColor: 'var(--accent-color)' }
                : { width: '0.5rem', backgroundColor: 'var(--border-color)' }
            }
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </motion.section>
  );
}

function SectionBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-block text-[9px] tracking-[0.2em] uppercase border px-3 py-1 text-muted-foreground border-border"
      style={{ fontFamily: 'var(--font-jetbrains)' }}
    >
      / {label}
    </span>
  );
}
