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
        <span
          className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider rounded-full"
          style={{
            color: 'var(--accent-color)',
            backgroundColor: 'color-mix(in srgb, var(--accent-color) 10%, transparent)',
          }}
        >
          PROJECTS
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold text-foreground w-6 text-center tabular-nums">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <button
            onClick={next}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="relative h-[400px] rounded-3xl overflow-hidden bg-surface border border-border">
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
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs font-bold tracking-wider text-white/70 uppercase mb-1">
                {project.category}
              </p>
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              <p className="text-sm text-white/70 mt-2 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center gap-3 mt-3">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs font-medium text-white/60 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-white/80 hover:text-white transition-colors"
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
