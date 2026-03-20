'use client';

import { motion } from 'framer-motion';
import { previewComponents } from './previews';
import type { FlutterProject } from '@/data/flutterProjects';

const categoryLabels: Record<string, string> = {
  games: 'Game',
  '3d-animation': '3D & Anim',
  'ui-effects': 'UI Effect',
  tools: 'Tool',
};

interface ProjectCardProps {
  project: FlutterProject;
  index: number;
  onViewCode: (project: FlutterProject) => void;
}

export function ProjectCard({ project, index, onViewCode }: ProjectCardProps) {
  const Preview = previewComponents[project.id];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={`group relative rounded-2xl border border-border bg-surface/70 backdrop-blur-xl overflow-hidden hover:shadow-xl hover:shadow-accent transition-all duration-300 hover:scale-[1.02] ${
        project.wide ? 'sm:col-span-2' : ''
      }`}
    >
      {/* Shimmer border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 30%, rgba(124,58,237,0.15) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
          animation: 'fp-shimmer-border 2s linear infinite',
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-accent-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Live Preview */}
        <div className="h-40 w-full bg-muted/30">
          {Preview && <Preview />}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider text-accent bg-accent-subtle border border-accent rounded-full">
              {categoryLabels[project.category]}
            </span>
          </div>

          <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors mb-1">
            {project.title}
          </h3>

          <p className="text-xs text-muted-foreground line-clamp-1">
            {project.description}
          </p>

          <button
            onClick={() => onViewCode(project)}
            className="mt-3 px-3 py-1.5 text-[10px] font-bold tracking-wider rounded-lg bg-accent-subtle text-accent border border-accent hover:bg-accent hover:text-white transition-all duration-200"
          >
            VIEW CODE
          </button>
        </div>
      </div>
    </motion.div>
  );
}
