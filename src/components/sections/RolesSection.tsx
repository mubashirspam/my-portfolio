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

      <div className="mt-6 space-y-4">
        <RoleCard
          title="Independent Contractor"
          description="I'm available for a limited number of collaborative projects each year. If you're interested in exploring potential opportunities, feel free to reach out, and let's see how we can create something remarkable together."
          badge={<AvailabilityBadge isAvailable />}
        />
        <RoleCard
          title="Freelance Developer"
          description="Specializing in the development of cross-platform mobile applications, I leverage Flutter to build beautiful and intuitive experiences. My focus lies in crafting seamless user experiences that enhance usability and fulfill client needs."
        />
      </div>

      <div className="mt-16">
        <SectionBadge label="CLIENT FEEDBACK" />
        <div className="mt-6 rounded-2xl border border-border bg-surface/70 backdrop-blur-xl p-6 relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 gradient-accent-hover" />
          <p className="text-lg font-bold text-foreground mb-4 relative z-10">
            Sarah Johnson &mdash; Tech Startup
          </p>
          <p className="text-base leading-relaxed text-muted-foreground italic relative z-10">
            &ldquo;Mubashir did an exceptional job working with us. The
            communication was smooth, he delivered high-quality work ahead of
            time and changes/reviews were effortless for us. Highly recommend
            working with Mubashir. If we ever need support again, we would
            definitely work with Mubashir again.&rdquo;
          </p>
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

function RoleCard({
  title,
  description,
  badge,
}: {
  title: string;
  description: string;
  badge?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface/70 backdrop-blur-xl p-6 relative overflow-hidden hover:shadow-xl hover:shadow-accent transition-all duration-300 group">
      <div className="absolute inset-0 gradient-accent-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
          {title}
        </h3>
        {badge}
      </div>
      <p className="text-base leading-relaxed text-muted-foreground relative z-10">
        {description}
      </p>
    </div>
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
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isAvailable ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
      {isAvailable ? 'OPEN FOR COLLABORATION' : 'CURRENTLY COMMITTED'}
    </span>
  );
}
