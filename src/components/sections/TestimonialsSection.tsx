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
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold text-foreground w-6 text-center tabular-nums">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <button
            onClick={next}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Testimonial Card */}
      <div className="rounded-2xl border border-border bg-surface/70 backdrop-blur-xl p-8 relative overflow-hidden min-h-[280px]">
        <div className="absolute inset-0 gradient-accent-hover" />

        <AnimatePresence mode="wait">
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <Quote className="w-10 h-10 text-accent/40 mb-4" />

            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-accent text-accent"
                />
              ))}
            </div>

            <p className="text-lg sm:text-xl leading-relaxed text-foreground/90 italic mb-6">
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
