'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/data/experience';

const dotColors = ['#8b5cf6', '#3b82f6', '#10b981', '#f97316', '#f43f5e'];

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
        <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-violet-500/30 via-blue-500/20 to-transparent sm:left-[9px]" />

        <div className="space-y-6">
          {experiences.map((exp, index) => {
            const dotColor = dotColors[index % dotColors.length];
            return (
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
                  className="absolute left-0 top-8 w-4 h-4 rounded-full border-[3px] sm:w-5 sm:h-5"
                  style={{
                    borderColor: dotColor,
                    backgroundColor: dotColor,
                    boxShadow: `0 0 12px ${dotColor}40`,
                  }}
                />

                {/* Card */}
                <div className="rounded-2xl border border-border/50 bg-surface/50 backdrop-blur-xl p-6 relative overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-[1.01]"
                  style={{ borderLeftColor: dotColor, borderLeftWidth: '3px' }}
                >
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {exp.title}
                      </h3>
                      <span
                        className="text-[10px] font-bold tracking-wider px-3 py-1 rounded-full w-fit"
                        style={{ backgroundColor: `${dotColor}15`, color: dotColor }}
                      >
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
                            style={{ backgroundColor: dotColor }}
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
