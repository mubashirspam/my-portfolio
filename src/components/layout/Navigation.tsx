'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  Monitor,
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
  { label: 'Projects', href: '#projects' },
  { label: 'Journal', href: '#blog' },
  { label: 'Playground', href: '#flutter-playground' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 transition-all duration-300">
      <nav
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'liquid-glass shadow-lg shadow-black/5'
            : 'liquid-glass'
        }`}
      >
        <div className="flex items-center justify-between h-14 px-5">
          {/* Left: Logo */}
          <a
            href="#"
            className="text-2xl font-bold text-foreground tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            MA<span className="text-accent">.</span>
          </a>

          {/* Center: Section links (desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-white/5 transition-all duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right: Theme controls + Clock + Mobile menu */}
          <div className="flex items-center gap-1.5">
            <ColorPicker />
            <ThemeModeToggle />
            <LiveClock />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden px-4 pb-4 border-t border-white/10 mt-1 pt-3">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-white/5 transition-colors"
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
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        aria-label="Change accent color"
      >
        <Sparkles className="w-4 h-4" style={{ color: accent.value }} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 p-3 liquid-glass rounded-2xl shadow-2xl z-50">
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
      <Sun className="w-4 h-4" />
    ) : mode === 'dark' ? (
      <Moon className="w-4 h-4" />
    ) : (
      <Monitor className="w-4 h-4" />
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
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        aria-label="Change theme"
      >
        {icon}
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 py-1 liquid-glass rounded-2xl shadow-2xl z-50 min-w-[140px]">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setMode(opt.value);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                mode === opt.value
                  ? 'text-foreground bg-white/10 font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
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

/* ===== Live Clock ===== */
function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const istTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
      );
      setTime(
        `${istTime.getHours().toString().padStart(2, '0')}:${istTime.getMinutes().toString().padStart(2, '0')}`
      );
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-foreground/70 rounded-full bg-white/5">
      <Clock className="w-3 h-3" />
      {time}
    </span>
  );
}
