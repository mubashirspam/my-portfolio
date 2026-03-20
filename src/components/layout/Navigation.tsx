'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  Monitor,
  MapPin,
  Globe,
  Clock,
  Menu,
  X,
} from 'lucide-react';
import {
  useTheme,
  accentColors,
  type AccentColor,
} from '@/components/providers/ThemeProvider';

const navLinks = [
  { label: 'About', href: '#bio' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface/70 backdrop-blur-2xl border-b border-border/50 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left: Theme controls */}
          <div className="flex items-center gap-1">
            <ColorPicker />
            <ThemeModeToggle />
          </div>

          {/* Center: Section links (desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right: Status chips + mobile menu */}
          <div className="flex items-center gap-2">
            <StatusChip icon={<MapPin className="w-3.5 h-3.5" />} label="INDIA" className="hidden sm:flex" />
            <LiveClock />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden pb-3 border-t border-border/50 mt-1 pt-2">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

/* ===== Color Picker ===== */
function ColorPicker() {
  const { accent, setAccent } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Change accent color"
      >
        <Sparkles className="w-5 h-5" style={{ color: accent.value }} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 p-3 bg-surface/90 backdrop-blur-xl border border-border rounded-xl shadow-2xl z-50">
          <div className="grid grid-cols-4 gap-2">
            {accentColors.map((color) => (
              <button
                key={color.name}
                onClick={() => {
                  setAccent(color);
                  setOpen(false);
                }}
                className="relative w-7 h-7 rounded-full transition-all hover:scale-110 hover:shadow-lg"
                style={{ backgroundColor: color.value }}
                aria-label={color.name}
              >
                {accent.name === color.name && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== Theme Mode Toggle ===== */
function ThemeModeToggle() {
  const { mode, setMode } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const icon =
    mode === 'light' ? (
      <Sun className="w-5 h-5" />
    ) : mode === 'dark' ? (
      <Moon className="w-5 h-5" />
    ) : (
      <Monitor className="w-5 h-5" />
    );

  const options: { value: 'light' | 'dark' | 'system'; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
    { value: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Change theme"
      >
        {icon}
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 py-1 bg-surface/90 backdrop-blur-xl border border-border rounded-xl shadow-2xl z-50 min-w-[140px]">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setMode(opt.value);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                mode === opt.value
                  ? 'text-foreground bg-accent-subtle font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===== Status Chip ===== */
function StatusChip({
  icon,
  label,
  className = '',
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-foreground/70 bg-muted/60 backdrop-blur-sm border border-border/50 rounded-full ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}

/* ===== Live Clock ===== */
function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      // Convert to IST (UTC+5:30)
      const istTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
      );
      setTime(
        `${istTime.getHours().toString().padStart(2, '0')}:${istTime.getMinutes().toString().padStart(2, '0')}`
      );
    };
    
    update();
    // Update every second for real-time feel
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <StatusChip icon={<Clock className="w-3.5 h-3.5" />} label={time} />
  );
}
