'use client';

import { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Monitor,
  Clock,
  Menu,
  X,
} from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Journal', href: '#blog' },
  { label: 'Playground', href: '#flutter-playground' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'px-4 sm:px-8 pt-3' : 'px-4 sm:px-6 pt-5'
      }`}
    >
      <nav
        className={`max-w-5xl mx-auto transition-all duration-500 rounded-full ${
          scrolled
            ? 'liquid-glass shadow-lg shadow-black/10'
            : 'bg-transparent'
        }`}
      >
        <div
          className={`flex items-center justify-between px-5 transition-all duration-500 ${
            scrolled ? 'h-11' : 'h-14'
          }`}
        >
          {/* Left: Logo with shine */}
          <a
            href="#"
            className={`font-bold tracking-tight transition-all duration-500 relative overflow-hidden inline-block logo-shine ${
              scrolled ? 'text-xl text-foreground' : 'text-2xl text-white'
            }`}
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            MA<span style={{ color: 'var(--accent-color)' }}>.</span>
          </a>

          {/* Center: Links (desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  scrolled
                    ? 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right: theme + clock + mobile menu */}
          <div className="flex items-center gap-1">
            <ThemeModeToggle scrolled={scrolled} />
            <LiveClock scrolled={scrolled} />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${
                scrolled
                  ? 'text-muted-foreground hover:text-foreground'
                  : 'text-white/60 hover:text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden px-4 pb-4 pt-2">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-foreground/5 transition-colors"
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

/* ===== Theme Mode Toggle ===== */
function ThemeModeToggle({ scrolled }: { scrolled: boolean }) {
  const { mode, setMode } = useTheme();

  const cycle = () => {
    const next = mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light';
    setMode(next);
  };

  const icon =
    mode === 'light' ? <Sun className="w-4 h-4" /> :
    mode === 'dark' ? <Moon className="w-4 h-4" /> :
    <Monitor className="w-4 h-4" />;

  return (
    <button
      onClick={cycle}
      className={`p-2 rounded-full transition-colors ${
        scrolled
          ? 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
          : 'text-white/60 hover:text-white hover:bg-white/10'
      }`}
      aria-label="Change theme"
    >
      {icon}
    </button>
  );
}

/* ===== Live Clock ===== */
function LiveClock({ scrolled }: { scrolled: boolean }) {
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
    <span
      className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full transition-colors ${
        scrolled
          ? 'text-muted-foreground bg-foreground/5'
          : 'text-white/50 bg-white/8'
      }`}
    >
      <Clock className="w-3 h-3" />
      {time}
    </span>
  );
}
