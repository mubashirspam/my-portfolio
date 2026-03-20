'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { flutterProjects, type FlutterProject } from '@/data/flutterProjects';
import { FilterTabs } from './FilterTabs';
import { ProjectCard } from './ProjectCard';
import { CodeModal } from './CodeModal';

const PAGE_SIZE = 9;

export function FlutterPlaygroundFull() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [codeProject, setCodeProject] = useState<FlutterProject | null>(null);

  const filtered =
    activeFilter === 'all'
      ? flutterProjects
      : flutterProjects.filter((p) => p.category === activeFilter);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleFilterChange(value: string) {
    setActiveFilter(value);
    setVisibleCount(PAGE_SIZE);
  }

  function loadMore() {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }

  return (
    <>
      <FilterTabs active={activeFilter} onChange={handleFilterChange} />

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onViewCode={setCodeProject}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 text-center"
        >
          <button
            onClick={loadMore}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-wider rounded-full bg-accent-subtle text-accent border border-accent hover:bg-accent hover:text-white transition-all duration-300"
          >
            LOAD MORE
            <span className="text-xs opacity-70">
              ({visible.length} / {filtered.length})
            </span>
          </button>
        </motion.div>
      )}

      <CodeModal project={codeProject} onClose={() => setCodeProject(null)} />
    </>
  );
}
