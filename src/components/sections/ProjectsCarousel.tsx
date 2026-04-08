'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';

export function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((i) => (i - 1 + projects.length) % projects.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((i) => (i + 1) % projects.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const project = projects[currentIndex];
  const liveUrl = project.links.live;

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
        <SectionBadge label="PROJECTS" />
        <h2 className="text-4xl sm:text-5xl font-normal text-foreground mt-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Featured Work
        </h2>
      </div>
      <div className="flex items-center justify-end mb-4">
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
      <div className="relative h-[420px] sm:h-[480px] rounded-3xl overflow-hidden border border-border/30 group">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={project.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -60, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {liveUrl ? (
              <div className="w-full h-full relative bg-muted">
                <iframe
                  src={liveUrl}
                  title={project.title}
                  className="absolute top-0 left-0 border-0 pointer-events-none"
                  style={{
                    width: '1440px',
                    height: '900px',
                    transform: 'scale(0.625)',
                    transformOrigin: 'top left',
                  }}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            ) : (
              <ProjectPlaceholder
                title={project.title}
                category={project.category}
                tags={project.tags}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 sm:p-8 pt-24 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-1">
                {project.category}
              </p>
              <h3
                className="text-2xl sm:text-4xl font-normal text-white"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {project.title}
              </h3>
              <p className="text-sm text-white/60 mt-2 line-clamp-2 max-w-lg">
                {project.description}
              </p>
              <div className="flex items-center gap-3 mt-4">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="text-xs font-medium text-white/50 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </motion.span>
                ))}
                {(project.links.live || project.links.appStore || project.links.playStore) && (
                  <a
                    href={project.links.live || project.links.appStore || project.links.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white liquid-glass rounded-full px-4 py-2 transition-all hover:scale-105"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Visit
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Auto-advance progress */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10 z-10">
          <motion.div
            key={currentIndex}
            className="h-full bg-white/40"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
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

/* Styled placeholder for mobile/flutter projects without live URLs */
function ProjectPlaceholder({ title, category, tags }: { title: string; category: string; tags: string[] }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative"
      style={{ background: 'linear-gradient(135deg, #1a1b2e 0%, #0f1019 50%, #1a1028 100%)' }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%">
          <pattern id="project-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#project-grid)" />
        </svg>
      </div>

      {/* Floating accent rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 rounded-full border border-violet-500/10 absolute animate-[spin_20s_linear_infinite]" />
        <div className="w-72 h-72 rounded-full border border-violet-500/5 absolute animate-[spin_30s_linear_infinite_reverse]" />
      </div>

      {/* Center content */}
      <div className="text-center relative z-10">
        <div
          className="text-7xl sm:text-8xl font-normal text-white/10 mb-4"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {title[0]}
        </div>
        <p className="text-xs font-bold tracking-widest text-violet-400/50 uppercase">{category}</p>
        <div className="flex gap-2 mt-3 justify-center">
          {tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] text-white/20 border border-white/10 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
    </div>
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
