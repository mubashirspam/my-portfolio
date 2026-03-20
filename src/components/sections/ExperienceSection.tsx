'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/data/experience';

export function ExperienceSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <SectionBadge label="EXPERIENCE" />

      <div className="mt-6 relative">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-border sm:left-[9px]" />

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative pl-8 sm:pl-10"
            >
              {/* Timeline dot */}
              <div
                className="absolute left-0 top-8 w-4 h-4 rounded-full border-[3px] bg-background sm:w-5 sm:h-5"
                style={{
                  borderColor: 'var(--accent-color)',
                  backgroundColor: 'var(--accent-color)',
                }}
              />

              {/* Card */}
              <div className="rounded-2xl border border-border bg-surface/50 backdrop-blur-xl p-6 relative overflow-hidden hover:shadow-xl hover:shadow-accent transition-all duration-300 group">
                <div className="absolute inset-0 gradient-accent-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {exp.title}
                    </h3>
                    <span className="text-xs font-bold tracking-wider text-accent bg-accent-subtle border border-accent px-3 py-1 rounded-full w-fit">
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {exp.company} &middot; {exp.location}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mb-4">
                    {exp.period}
                  </p>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: 'var(--accent-color)' }}
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
