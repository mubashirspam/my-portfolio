'use client';

import { motion } from 'framer-motion';
import { Quote, Smartphone, Palette } from 'lucide-react';

export function QuoteSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <div className="rounded-3xl border border-border/30 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 p-8 sm:p-12 mb-12">
        <Quote className="w-10 h-10 text-accent/40 mb-6" />
        <p
          className="text-2xl sm:text-3xl font-normal leading-snug"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          <span className="text-foreground">
            Greatness lies in the extra 10%. It&apos;s about pushing limits,
            embracing details, and never settling for &ldquo;good enough&rdquo;.{' '}
          </span>
          <span className="text-muted-foreground">
            Whether in code or design, my goal is to deliver work that stands out
            &mdash; because true impact comes from striving for excellence.
          </span>
        </p>
      </div>

      <SectionBadge label="EXPERTISES" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <ExpertiseCard
          number="001"
          title="Mobile Development"
          icon={<Smartphone className="w-12 h-12" />}
          statusText="Open for Collaboration"
          isAvailable
          gradient="from-violet-500/12 to-purple-500/5"
          iconColor="#8b5cf6"
          border="border-violet-500/15"
        />
        <ExpertiseCard
          number="002"
          title="UI/UX Design"
          icon={<Palette className="w-12 h-12" />}
          statusText="Currently Committed"
          isAvailable={false}
          gradient="from-rose-500/12 to-pink-500/5"
          iconColor="#f43f5e"
          border="border-rose-500/15"
        />
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

function ExpertiseCard({
  number,
  title,
  icon,
  statusText,
  isAvailable,
  gradient,
  iconColor,
  border,
}: {
  number: string;
  title: string;
  icon: React.ReactNode;
  statusText: string;
  isAvailable: boolean;
  gradient: string;
  iconColor: string;
  border: string;
}) {
  return (
    <div className={`rounded-2xl border ${border} bg-gradient-to-br ${gradient} backdrop-blur-xl p-6 relative overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-[1.01]`}>
      <div className="flex items-center justify-between mb-8 relative z-10">
        <span className="text-sm text-muted-foreground font-mono">({number})</span>
        <span className="text-lg font-bold text-foreground">{title}</span>
      </div>
      <div className="flex justify-center mb-8 relative z-10">
        <div className="p-6 rounded-2xl" style={{ backgroundColor: `${iconColor}10`, color: iconColor }}>
          {icon}
        </div>
      </div>
      <div className="flex items-center justify-between relative z-10">
        <span className="text-sm text-foreground">{statusText}</span>
        <span className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isAvailable ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={isAvailable ? { boxShadow: '0 0 8px rgba(34,197,94,0.5)' } : undefined}
          />
        </span>
      </div>
    </div>
  );
}
