'use client';

import { motion } from 'framer-motion';
import { skills } from '@/data/experience';

const categoryIcons: Record<string, string> = {
  'Mobile Development': 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  'State Management': 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
  'Architecture': 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  'Backend & Database': 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
  'Web Technologies': 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  'Tools & Protocols': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
};

const cardAccents = [
  { gradient: 'from-violet-500/10 to-purple-500/5', bar: '#8b5cf6', border: 'border-violet-500/15', glow: 'rgba(139,92,246,0.1)' },
  { gradient: 'from-blue-500/10 to-cyan-500/5', bar: '#3b82f6', border: 'border-blue-500/15', glow: 'rgba(59,130,246,0.1)' },
  { gradient: 'from-emerald-500/10 to-green-500/5', bar: '#10b981', border: 'border-emerald-500/15', glow: 'rgba(16,185,129,0.1)' },
  { gradient: 'from-orange-500/10 to-amber-500/5', bar: '#f97316', border: 'border-orange-500/15', glow: 'rgba(249,115,22,0.1)' },
  { gradient: 'from-rose-500/10 to-pink-500/5', bar: '#f43f5e', border: 'border-rose-500/15', glow: 'rgba(244,63,94,0.1)' },
  { gradient: 'from-teal-500/10 to-cyan-500/5', bar: '#14b8a6', border: 'border-teal-500/15', glow: 'rgba(20,184,166,0.1)' },
];

export function TechStackSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16 relative"
    >
      {/* Background grid dots */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <pattern id="grid-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" className="text-foreground" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-dots)" />
        </svg>
      </div>

      <SectionBadge label="TECH STACK" />
      <h2 className="text-4xl sm:text-5xl font-normal text-foreground mt-3 mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
        Tools &amp; Technologies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
        {skills.map((skill, index) => {
          const accent = cardAccents[index % cardAccents.length];
          const iconPath = categoryIcons[skill.category] || categoryIcons['Tools & Protocols'];
          return (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`rounded-2xl border ${accent.border} bg-gradient-to-br ${accent.gradient} backdrop-blur-xl p-6 relative overflow-hidden group cursor-default`}
            >
              {/* Animated category icon */}
              <motion.div
                className="absolute top-4 right-4 opacity-[0.08]"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
              >
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke={accent.bar} strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
                </svg>
              </motion.div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  {/* Animated color bar */}
                  <motion.div
                    className="w-1 rounded-full"
                    style={{ backgroundColor: accent.bar }}
                    initial={{ height: 0 }}
                    whileInView={{ height: 24 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                  />
                  <h3 className="text-base font-bold text-foreground">
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, itemIndex) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + itemIndex * 0.05 }}
                      whileHover={{
                        scale: 1.08,
                        backgroundColor: `${accent.bar}18`,
                        borderColor: `${accent.bar}40`,
                      }}
                      className="bg-foreground/5 text-foreground text-sm px-3 py-1.5 rounded-full font-medium border border-foreground/5 transition-colors cursor-default"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ boxShadow: `inset 0 0 60px ${accent.glow}` }}
              />
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
