'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/data/projects';

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featured.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative bg-surface/80 backdrop-blur-xl rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-500"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Image */}
          <div className="aspect-video bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 dark:from-purple-500/20 dark:via-blue-500/20 dark:to-pink-500/20 flex items-center justify-center relative overflow-hidden">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                }}
              />
            ) : null}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_50%)]" />
            {!project.image && <Smartphone className="w-12 h-12 text-purple-400/50 dark:text-purple-300/30 relative z-10" />}
          </div>

          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold font-display text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {project.title}
              </h3>
              {project.stats && (
                <span className="text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 px-2.5 py-1 rounded-full">
                  {project.stats}
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-foreground/70 bg-muted/50 backdrop-blur-sm border border-border px-2.5 py-1 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
                  aria-label={`${project.title} GitHub`}
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
                  aria-label={`${project.title} live site`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {(project.links.appStore || project.links.playStore) && (
                <a
                  href={project.links.appStore || project.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
                  aria-label={`${project.title} app store`}
                >
                  <Smartphone className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
