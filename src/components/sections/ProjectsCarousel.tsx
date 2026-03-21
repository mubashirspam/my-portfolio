'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/data/projects';

export function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + projects.length) % projects.length);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % projects.length);
  }, []);

  const project = projects[currentIndex];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <SectionBadge label="PROJECTS" />

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="p-2 text-muted-foreground hover:text-foreground rounded-xl border border-border/50 hover:border-border hover:bg-surface/50 transition-all"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-foreground w-6 text-center tabular-nums font-mono">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <button
            onClick={next}
            className="p-2 text-muted-foreground hover:text-foreground rounded-xl border border-border/50 hover:border-border hover:bg-surface/50 transition-all"
            aria-label="Next project"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="relative h-[420px] rounded-3xl overflow-hidden border border-border/30">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {project.coverImage ? (
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <span className="text-4xl font-bold text-muted-foreground/20">{project.title[0]}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-6 pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-1">
                {project.category}
              </p>
              <h3
                className="text-2xl sm:text-3xl font-normal text-white"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {project.title}
              </h3>
              <p className="text-sm text-white/60 mt-2 line-clamp-2 max-w-lg">
                {project.description}
              </p>
              <div className="flex items-center gap-3 mt-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs font-medium text-white/50 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
                {(project.links.live || project.links.appStore || project.links.playStore) && (
                  <a
                    href={project.links.live || project.links.appStore || project.links.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white liquid-glass rounded-full px-4 py-2 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Visit
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="h-2 rounded-full transition-all duration-300"
            style={
              index === currentIndex
                ? { width: '1.5rem', backgroundColor: 'var(--accent-color)' }
                : { width: '0.5rem', backgroundColor: 'var(--border-color)' }
            }
            aria-label={`Go to project ${index + 1}`}
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
