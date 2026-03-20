'use client';

import { motion } from 'framer-motion';
import { skills } from '@/data/experience';

export function TechStackSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <SectionBadge label="TECH STACK" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="rounded-2xl border border-border bg-surface/50 backdrop-blur-xl p-6 relative overflow-hidden hover:shadow-xl hover:shadow-accent transition-all duration-300 group"
          >
            <div className="absolute inset-0 gradient-accent-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-1 h-6 rounded-full"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                />
                <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors">
                  {skill.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="bg-muted text-foreground text-sm px-3 py-1.5 rounded-full font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
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
