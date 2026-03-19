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
      <Quote className="w-12 h-12 text-muted-foreground/50 mb-6" />
      <p className="text-xl sm:text-2xl font-medium leading-relaxed mb-16">
        <span className="text-foreground">
          Greatness lies in the extra 10%. It&apos;s about pushing limits,
          embracing details, and never settling for &ldquo;good enough&rdquo;. I
          believe the difference comes from grit, purpose, and the drive to go
          the extra mile.{' '}
        </span>
        <span className="text-muted-foreground">
          Whether in code or design, my goal is to deliver work that stands out
          &mdash; because true impact comes from striving for excellence.
        </span>
      </p>

      <SectionBadge label="EXPERTISES" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <ExpertiseCard
          number="001"
          title="Mobile Development"
          icon={<Smartphone className="w-16 h-16 text-muted-foreground/60" />}
          statusText="Open for Collaboration"
          isAvailable
        />
        <ExpertiseCard
          number="002"
          title="UI/UX Design"
          icon={<Palette className="w-16 h-16 text-muted-foreground/60" />}
          statusText="Currently Committed"
          isAvailable={false}
        />
      </div>
    </motion.section>
  );
}

function SectionBadge({ label }: { label: string }) {
  return (
    <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50 rounded-full backdrop-blur-sm">
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
}: {
  number: string;
  title: string;
  icon: React.ReactNode;
  statusText: string;
  isAvailable: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface/70 backdrop-blur-xl p-6 relative overflow-hidden hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="flex items-center justify-between mb-10 relative z-10">
        <span className="text-sm text-muted-foreground">({number})</span>
        <span className="text-lg font-bold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{title}</span>
      </div>
      <div className="flex justify-center mb-10 relative z-10">
        <div className="p-8 bg-muted/50 backdrop-blur-sm rounded-2xl group-hover:bg-purple-100 dark:group-hover:bg-purple-900/20 transition-colors">{icon}</div>
      </div>
      <div className="flex items-center justify-between relative z-10">
        <span className="text-sm text-foreground">{statusText}</span>
        <span
          className={`w-2 h-2 rounded-full ${
            isAvailable ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
      </div>
    </div>
  );
}
