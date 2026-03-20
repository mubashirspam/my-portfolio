'use client';

import { motion } from 'framer-motion';
import { filterTabs } from '@/data/flutterProjects';

interface FilterTabsProps {
  active: string;
  onChange: (value: string) => void;
}

export function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {filterTabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200"
          style={{
            color: active === tab.value ? 'var(--accent-color)' : 'var(--muted-fg)',
          }}
        >
          {active === tab.value && (
            <motion.div
              layoutId="fp-active-tab"
              className="absolute inset-0 rounded-full bg-accent-subtle border border-accent"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
