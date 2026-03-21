'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % testimonials.length);
  }, []);

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
      <div className="flex items-center justify-between mb-6">
        <SectionBadge label="WHAT CLIENTS SAY" />

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
      <div className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-500/8 via-transparent to-blue-500/5 backdrop-blur-xl p-8 relative overflow-hidden min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <Quote className="w-8 h-8 text-violet-500/30 mb-4" />

            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            <p
              className="text-lg sm:text-xl leading-relaxed text-foreground/90 italic mb-6"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              &ldquo;{testimonial.content}&rdquo;
            </p>

            <div>
              <p className="text-base font-bold text-foreground">
                {testimonial.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
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
    <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider text-accent bg-accent-subtle border border-accent rounded-full backdrop-blur-sm">
      {label}
    </span>
  );
}
