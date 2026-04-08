'use client';

import { motion } from 'framer-motion';

export function RolesSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <SectionBadge label="CURRENT ROLES" />
      <h2 className="text-4xl sm:text-5xl font-normal text-foreground mt-3 mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
        What I Do
      </h2>

      <div className="space-y-4">
        <RoleCard
          title="Independent Contractor"
          description="I'm available for a limited number of collaborative projects each year. If you're interested in exploring potential opportunities, feel free to reach out, and let's see how we can create something remarkable together."
          badge={<AvailabilityBadge isAvailable />}
          gradient="from-emerald-500/10 to-green-500/5"
          border="border-emerald-500/15"
          color="#10b981"
          icon="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
        <RoleCard
          title="Freelance Developer"
          description="Specializing in the development of cross-platform mobile applications, I leverage Flutter to build beautiful and intuitive experiences. My focus lies in crafting seamless user experiences that enhance usability and fulfill client needs."
          gradient="from-blue-500/10 to-cyan-500/5"
          border="border-blue-500/15"
          color="#3b82f6"
          icon="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </div>

      <div className="mt-12">
        <SectionBadge label="CLIENT FEEDBACK" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 rounded-2xl border border-amber-500/15 bg-gradient-to-br from-amber-500/10 to-orange-500/5 backdrop-blur-xl p-6 relative overflow-hidden group"
        >
          {/* Decorative quote */}
          <motion.div
            className="absolute top-2 right-4 text-[80px] leading-none font-serif opacity-[0.04] pointer-events-none"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            &rdquo;
          </motion.div>

          {/* Animated wave line */}
          <motion.svg
            className="absolute bottom-0 left-0 right-0 h-12 opacity-[0.06] pointer-events-none"
            viewBox="0 0 400 40"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0 20 Q50 5 100 20 Q150 35 200 20 Q250 5 300 20 Q350 35 400 20"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </motion.svg>

          <p className="text-lg font-bold text-foreground mb-3 relative z-10">
            Sarah Johnson &mdash; Tech Startup
          </p>
          <p
            className="text-lg leading-relaxed text-muted-foreground italic relative z-10"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            &ldquo;Mubashir did an exceptional job working with us. The
            communication was smooth, he delivered high-quality work ahead of
            time and changes/reviews were effortless for us. Highly recommend
            working with Mubashir.&rdquo;
          </p>
        </motion.div>
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

function RoleCard({
  title,
  description,
  badge,
  gradient,
  border,
  color,
  icon,
}: {
  title: string;
  description: string;
  badge?: React.ReactNode;
  gradient: string;
  border: string;
  color: string;
  icon: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, x: 4 }}
      className={`rounded-2xl border ${border} bg-gradient-to-br ${gradient} backdrop-blur-xl p-6 relative overflow-hidden group cursor-default`}
    >
      {/* Background icon */}
      <motion.div
        className="absolute -bottom-4 -right-4 opacity-[0.04] pointer-events-none"
        animate={{ rotate: [0, 10, 0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="0.5">
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </motion.div>

      <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
          {title}
        </h3>
        {badge}
      </div>
      <p className="text-base leading-relaxed text-muted-foreground relative z-10">
        {description}
      </p>
    </motion.div>
  );
}

function AvailabilityBadge({ isAvailable }: { isAvailable: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
        isAvailable
          ? 'bg-green-500/10 text-green-600 dark:text-green-400'
          : 'bg-red-500/10 text-red-600 dark:text-red-400'
      }`}
    >
      <motion.span
        className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}
        animate={isAvailable ? {
          boxShadow: [
            '0 0 0px rgba(34,197,94,0.3)',
            '0 0 10px rgba(34,197,94,0.6)',
            '0 0 0px rgba(34,197,94,0.3)',
          ],
        } : undefined}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {isAvailable ? 'OPEN' : 'COMMITTED'}
    </span>
  );
}
