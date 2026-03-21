'use client';

import { motion } from 'framer-motion';
import { skills } from '@/data/experience';

const cardAccents = [
  { gradient: 'from-violet-500/10 to-purple-500/5', bar: '#8b5cf6', border: 'border-violet-500/15' },
  { gradient: 'from-blue-500/10 to-cyan-500/5', bar: '#3b82f6', border: 'border-blue-500/15' },
  { gradient: 'from-emerald-500/10 to-green-500/5', bar: '#10b981', border: 'border-emerald-500/15' },
  { gradient: 'from-orange-500/10 to-amber-500/5', bar: '#f97316', border: 'border-orange-500/15' },
  { gradient: 'from-rose-500/10 to-pink-500/5', bar: '#f43f5e', border: 'border-rose-500/15' },
  { gradient: 'from-teal-500/10 to-cyan-500/5', bar: '#14b8a6', border: 'border-teal-500/15' },
];

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
        {skills.map((skill, index) => {
          const accent = cardAccents[index % cardAccents.length];
          return (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`rounded-2xl border ${accent.border} bg-gradient-to-br ${accent.gradient} backdrop-blur-xl p-6 relative overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-[1.01]`}
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-1 h-6 rounded-full"
                    style={{ backgroundColor: accent.bar }}
                  />
                  <h3 className="text-base font-bold text-foreground">
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="bg-foreground/5 text-foreground text-sm px-3 py-1.5 rounded-full font-medium border border-foreground/5 hover:border-foreground/15 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
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
