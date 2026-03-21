'use client';

import { motion } from 'framer-motion';
import { Smartphone, Palette } from 'lucide-react';

export function QuoteSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      {/* Quote Card */}
      <div className="rounded-3xl border border-border/30 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 p-8 sm:p-12 mb-12 relative overflow-hidden">
        {/* Animated floating shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Triangle */}
          <motion.svg
            className="absolute top-6 right-12 w-16 h-16 opacity-[0.06]"
            viewBox="0 0 60 60"
            animate={{ rotate: 360, y: [0, -10, 0] }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <polygon points="30,5 55,50 5,50" fill="none" stroke="var(--accent-color)" strokeWidth="1.5" />
          </motion.svg>

          {/* Circle */}
          <motion.svg
            className="absolute bottom-8 right-20 w-20 h-20 opacity-[0.05]"
            viewBox="0 0 80 80"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="40" cy="40" r="35" fill="none" stroke="var(--fg)" strokeWidth="1" strokeDasharray="4 4" />
          </motion.svg>

          {/* Diamond */}
          <motion.svg
            className="absolute top-1/2 left-[85%] w-10 h-10 opacity-[0.06]"
            viewBox="0 0 40 40"
            animate={{ rotate: [0, 90, 180, 270, 360], y: [0, -6, 0, 6, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          >
            <rect x="8" y="8" width="24" height="24" rx="2" fill="none" stroke="var(--accent-color)" strokeWidth="1.5" transform="rotate(45 20 20)" />
          </motion.svg>

          {/* Dots cluster */}
          <motion.svg
            className="absolute bottom-12 left-8 w-24 h-24 opacity-[0.04]"
            viewBox="0 0 100 100"
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {[20, 40, 60, 80].map((x) =>
              [20, 40, 60, 80].map((y) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="var(--fg)" />
              ))
            )}
          </motion.svg>
        </div>

        {/* Animated quote mark */}
        <motion.svg
          className="w-14 h-14 mb-6"
          viewBox="0 0 56 56"
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <circle cx="28" cy="28" r="27" fill="none" stroke="var(--accent-color)" strokeWidth="0.5" opacity="0.3" />
          <text x="28" y="38" textAnchor="middle" fontSize="32" fill="var(--accent-color)" opacity="0.4" fontFamily="'Instrument Serif', serif">&ldquo;</text>
        </motion.svg>

        <p
          className="text-2xl sm:text-3xl font-normal leading-snug relative z-10"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          <motion.span
            className="text-foreground"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Greatness lies in the extra 10%. It&apos;s about pushing limits,
            embracing details, and never settling for &ldquo;good enough&rdquo;.{' '}
          </motion.span>
          <motion.span
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Whether in code or design, my goal is to deliver work that stands out
            &mdash; because true impact comes from striving for excellence.
          </motion.span>
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
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className={`rounded-2xl border ${border} bg-gradient-to-br ${gradient} backdrop-blur-xl p-6 relative overflow-hidden group cursor-default`}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <pattern id={`hex-${number}`} x="0" y="0" width="30" height="26" patternUnits="userSpaceOnUse">
            <path d="M15 0 L30 7.5 L30 18.5 L15 26 L0 18.5 L0 7.5 Z" fill="none" stroke="currentColor" className="text-foreground" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#hex-${number})`} />
        </svg>
      </div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <span className="text-sm text-muted-foreground font-mono">({number})</span>
        <span className="text-lg font-bold text-foreground">{title}</span>
      </div>

      <div className="flex justify-center mb-8 relative z-10">
        <motion.div
          className="p-6 rounded-2xl"
          style={{ backgroundColor: `${iconColor}10`, color: iconColor }}
          whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          {icon}
        </motion.div>
      </div>

      <div className="flex items-center justify-between relative z-10">
        <span className="text-sm text-foreground">{statusText}</span>
        <span className="flex items-center gap-1.5">
          <motion.span
            className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}
            animate={isAvailable ? {
              boxShadow: [
                '0 0 0px rgba(34,197,94,0.3)',
                '0 0 12px rgba(34,197,94,0.6)',
                '0 0 0px rgba(34,197,94,0.3)',
              ],
            } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </span>
      </div>
    </motion.div>
  );
}
