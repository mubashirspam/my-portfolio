'use client';

import { motion } from 'framer-motion';
import { skills } from '@/data/experience';

export function SkillsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((group, groupIndex) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
          className="bg-surface/80 backdrop-blur-xl rounded-2xl border border-border p-6 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h3 className="text-sm font-semibold text-foreground mb-3 relative z-10 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {group.category}
          </h3>
          <div className="flex flex-wrap gap-2 relative z-10">
            {group.items.map((skill) => (
              <span
                key={skill}
                className="text-sm text-foreground/80 bg-muted/50 backdrop-blur-sm border border-border px-3 py-1.5 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 hover:border-purple-500/30 transition-all duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
