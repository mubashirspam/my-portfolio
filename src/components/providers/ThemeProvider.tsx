'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

export interface AccentColor {
  name: string;
  value: string;
}

export const accentColors: AccentColor[] = [
  { name: 'purple', value: '#7C3AED' },
  { name: 'blue', value: '#2563EB' },
  { name: 'green', value: '#16A34A' },
  { name: 'orange', value: '#EA580C' },
  { name: 'red', value: '#DC2626' },
  { name: 'teal', value: '#0D9488' },
  { name: 'indigo', value: '#4F46E5' },
  { name: 'pink', value: '#DB2777' },
];

interface ThemeContextValue {
  mode: ThemeMode;
  accent: AccentColor;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
  setAccent: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [accent, setAccentState] = useState<AccentColor>(accentColors[0]);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const savedMode =
      (localStorage.getItem('theme-mode') as ThemeMode) || 'system';
    const savedAccent = localStorage.getItem('theme-accent');
    const found = accentColors.find((c) => c.name === savedAccent);

    setModeState(savedMode);
    if (found) setAccentState(found);
    setMounted(true);
  }, []);

  // Resolve dark mode
  useEffect(() => {
    if (!mounted) return;

    const resolve = () => {
      if (mode === 'dark') return true;
      if (mode === 'light') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    const dark = resolve();
    setIsDark(dark);

    const root = document.documentElement;
    root.classList.toggle('dark', dark);

    // Listen for system theme changes if in system mode
    if (mode === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        setIsDark(e.matches);
        root.classList.toggle('dark', e.matches);
      };
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [mode, mounted]);

  // Apply accent color CSS variable
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.style.setProperty('--accent-color', accent.value);
  }, [accent, mounted]);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    localStorage.setItem('theme-mode', m);
  }, []);

  const setAccent = useCallback((c: AccentColor) => {
    setAccentState(c);
    localStorage.setItem('theme-accent', c.name);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, accent, isDark, setMode, setAccent }}>
      <div style={mounted ? undefined : { visibility: 'hidden' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
