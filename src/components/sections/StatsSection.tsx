'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: 6, suffix: '+', label: 'Years Experience', gradient: 'from-violet-500/15 to-purple-500/5', border: 'border-violet-500/20' },
  { value: 20, suffix: '+', label: 'Projects Delivered', gradient: 'from-blue-500/15 to-cyan-500/5', border: 'border-blue-500/20' },
  { value: 600, suffix: 'K+', label: 'App Downloads', gradient: 'from-emerald-500/15 to-green-500/5', border: 'border-emerald-500/20' },
  { value: 15, suffix: '+', label: 'Happy Clients', gradient: 'from-amber-500/15 to-orange-500/5', border: 'border-amber-500/20' },
];

function AnimatedCounter({
  target,
  suffix,
  duration = 2000,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold text-foreground tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <SectionBadge label="ACHIEVEMENTS" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.gradient} backdrop-blur-xl p-6 text-center relative overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]`}
          >
            <div className="relative z-10">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-muted-foreground mt-2 font-medium">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
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
