'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    value: 6, suffix: '+', label: 'Years Experience',
    gradient: 'from-violet-500/15 to-purple-500/5', border: 'border-violet-500/20',
    color: '#8b5cf6', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    value: 20, suffix: '+', label: 'Projects Delivered',
    gradient: 'from-blue-500/15 to-cyan-500/5', border: 'border-blue-500/20',
    color: '#3b82f6', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  },
  {
    value: 600, suffix: 'K+', label: 'App Downloads',
    gradient: 'from-emerald-500/15 to-green-500/5', border: 'border-emerald-500/20',
    color: '#10b981', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
  },
  {
    value: 15, suffix: '+', label: 'Happy Clients',
    gradient: 'from-amber-500/15 to-orange-500/5', border: 'border-amber-500/20',
    color: '#f59e0b', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
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
    if (ref.current) observer.observe(ref.current);
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
      {count}{suffix}
    </span>
  );
}

function AnimatedRing({ value, max, color }: { value: number; max: number; color: string }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;

  return (
    <svg className="absolute top-3 right-3 w-20 h-20 opacity-15 -rotate-90" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="2" opacity="0.3" />
      <motion.circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: circumference - progress }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
      />
    </svg>
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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.04, y: -4 }}
            className={`rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.gradient} backdrop-blur-xl p-6 text-center relative overflow-hidden group cursor-default`}
          >
            {/* Animated ring */}
            <AnimatedRing value={stat.value} max={stat.value * 1.3} color={stat.color} />

            {/* Floating icon */}
            <motion.div
              className="absolute -bottom-2 -left-2 opacity-[0.06]"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            >
              <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
              </svg>
            </motion.div>

            <div className="relative z-10">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-muted-foreground mt-2 font-medium">
                {stat.label}
              </p>
            </div>

            {/* Hover shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
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
