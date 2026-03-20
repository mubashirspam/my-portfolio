'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { flutterProjects, type FlutterProject } from '@/data/flutterProjects';
import { ProjectCard } from './ProjectCard';
import { CodeModal } from './CodeModal';

const PREVIEW_COUNT = 6;

export function FlutterPlayground() {
  const [codeProject, setCodeProject] = useState<FlutterProject | null>(null);

  const preview = flutterProjects.slice(0, PREVIEW_COUNT);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider text-accent bg-accent-subtle border border-accent rounded-full backdrop-blur-sm">
        FLUTTER PLAYGROUND
      </span>

      <h2 className="text-2xl sm:text-3xl font-bold mt-4" style={{ fontFamily: 'var(--font-jakarta)' }}>
        Flutter Playground
      </h2>
      <p className="text-muted-foreground mt-2 text-sm">
        30 real-world Flutter concepts — games, 3D, animations &amp; more
      </p>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <AnimatePresence mode="popLayout">
          {preview.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onViewCode={setCodeProject}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-8 text-center">
        <Link
          href="/flutter-playground"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-wider rounded-full bg-accent-subtle text-accent border border-accent hover:bg-accent hover:text-white transition-all duration-300"
        >
          VIEW ALL 30 PROJECTS
          <span className="text-lg leading-none">&rarr;</span>
        </Link>
      </div>

      <CodeModal project={codeProject} onClose={() => setCodeProject(null)} />
    </motion.section>
  );
}
