'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: 6, suffix: '+', label: 'Years Experience' },
  { value: 20, suffix: '+', label: 'Projects Delivered' },
  { value: 600, suffix: 'K+', label: 'App Downloads' },
  { value: 15, suffix: '+', label: 'Happy Clients' },
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
    <span ref={ref} className="text-4xl sm:text-5xl font-bold text-accent tabular-nums">
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
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-border bg-surface/70 backdrop-blur-xl p-6 text-center relative overflow-hidden hover:shadow-xl hover:shadow-accent transition-all duration-300 group"
          >
            <div className="absolute inset-0 gradient-accent-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
