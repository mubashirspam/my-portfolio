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
      <h2 className="text-4xl sm:text-5xl font-normal text-foreground mt-3 mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
        Where I&apos;ve Been
      </h2>

      <div className="mt-8 relative">
        {/* Timeline line with animated gradient */}
        <div className="absolute left-[9px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-violet-500/30 via-blue-500/20 to-transparent sm:left-[11px]" />

        {/* Traveling light dot */}
        <motion.div
          className="absolute left-[5px] w-3 h-3 rounded-full sm:left-[7px] z-10"
          style={{
            background: 'var(--accent-color)',
            boxShadow: '0 0 12px var(--accent-color), 0 0 24px var(--accent-color)',
          }}
          animate={{ top: ['2%', '95%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        <div className="space-y-8">
          {experiences.map((exp, index) => {
            const dotColor = dotColors[index % dotColors.length];
            return (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative pl-10 sm:pl-12"
              >
                {/* Timeline dot with pulse */}
                <div className="absolute left-0 top-8 sm:left-0">
                  <motion.div
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[3px] relative"
                    style={{
                      borderColor: dotColor,
                      backgroundColor: dotColor,
                      boxShadow: `0 0 12px ${dotColor}40`,
                    }}
                    whileInView={{
                      boxShadow: [
                        `0 0 0px ${dotColor}00`,
                        `0 0 20px ${dotColor}60`,
                        `0 0 0px ${dotColor}00`,
                      ],
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: index * 0.2 }}
                  />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.01, x: 4 }}
                  className="rounded-2xl border border-border/50 bg-surface/50 backdrop-blur-xl p-6 relative overflow-hidden group cursor-default"
                  style={{ borderLeftColor: dotColor, borderLeftWidth: '3px' }}
                >
                  {/* Year badge floating */}
                  <motion.div
                    className="absolute top-4 right-4 text-[40px] font-bold opacity-[0.04] tabular-nums pointer-events-none"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {exp.period.split(' ').pop()}
                  </motion.div>

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
                    <p className="text-xs text-muted-foreground/70 mb-4 font-mono">
                      {exp.period}
                    </p>
                    <ul className="space-y-2.5">
                      {exp.highlights.map((highlight, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <svg className="mt-1 w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="3" fill={dotColor} opacity="0.3" />
                            <circle cx="8" cy="8" r="1.5" fill={dotColor} />
                          </svg>
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </motion.div>
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
    <span
      className="inline-block text-[9px] tracking-[0.2em] uppercase border px-3 py-1 text-muted-foreground border-border"
      style={{ fontFamily: 'var(--font-jetbrains)' }}
    >
      / {label}
    </span>
  );
}
