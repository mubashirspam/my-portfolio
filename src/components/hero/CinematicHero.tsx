'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';

function LocalTime({ isDark }: { isDark: boolean }) {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Asia/Kolkata',
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  return (
    <div className="text-right" style={{ fontFamily: 'var(--font-jetbrains)' }}>
      <div
        className="text-[9px] tracking-[0.15em] uppercase"
        style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.45)' }}
      >
        LOCAL TIME
      </div>
      <div
        className="text-[11px] mt-0.5"
        style={{ color: isDark ? 'rgba(255,255,255,0.70)' : 'rgba(0,0,0,0.75)' }}
      >
        KER {time}
      </div>
    </div>
  );
}

const coreThreads = [
  { n: '01', label: 'MOBILE (FLUTTER / DART)' },
  { n: '02', label: 'ARCHITECTURE' },
  { n: '03', label: 'UI & UX' },
  { n: '04', label: 'SYSTEMS & TOOLS' },
];

const socialLinks = [
  { label: 'LINKEDIN', href: 'https://linkedin.com/in/mubashir-ahmad' },
  { label: 'GITHUB', href: 'https://github.com/mubashirspam' },
  { label: 'TOPMATE', href: 'https://topmate.io/mubashir_ahammed' },
];

export function CinematicHero() {
  const { isDark, setMode } = useTheme();
  const toggleTheme = () => setMode(isDark ? 'light' : 'dark');

  const bg = 'var(--bg)';
  const txt = (o: number) => isDark ? `rgba(255,255,255,${o})` : `rgba(0,0,0,${o})`;
  const bdr = (o: number) => isDark ? `rgba(255,255,255,${o})` : `rgba(0,0,0,${o})`;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: '100svh',
        background: bg,
        transition: 'background 0.45s ease',
      }}
    >
      {/* ═══════════════════════════════════════
          DESKTOP LAYOUT  (md and above)
      ═══════════════════════════════════════ */}
      <div className="hidden md:block absolute inset-0" style={{ zIndex: 0 }}>

        {/* ── 4-Column Grid Background ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          {/* Vertical column dividers */}
          {[25, 50, 75].map((x) => (
            <div
              key={x}
              className="absolute inset-y-0"
              style={{ left: `${x}%`, width: '1px', background: bdr(0.06) }}
            />
          ))}
          {/* Horizontal row dividers */}
          {[20, 40, 60, 80].map((y) => (
            <div
              key={y}
              className="absolute inset-x-0"
              style={{ top: `${y}%`, height: '1px', background: bdr(0.06) }}
            />
          ))}
          {/* "+" at every column × row intersection */}
          {[0, 25, 50, 75, 100].flatMap((x) =>
            [20, 40, 60, 80].map((y) => (
              <div
                key={`${x}-${y}`}
                className="absolute select-none"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  color: bdr(0.18),
                  fontSize: '13px',
                  lineHeight: 1,
                  fontFamily: 'monospace',
                }}
              >
                +
              </div>
            ))
          )}
        </div>

        {/* ── SVG Connector Lines ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ zIndex: 5 }}
        >
          {/* Top annotation line: video top-center → annotation */}
          <path
            d="M 50 22 L 50 19 L 63 19"
            fill="none"
            stroke={bdr(0.22)}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          {/* Left annotation line: video left-center → annotation */}
          <path
            d="M 24 50 L 18 50"
            fill="none"
            stroke={bdr(0.22)}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          {/* Bottom annotation line: video bottom-center → annotation */}
          <path
            d="M 50 76 L 50 80 L 63 80"
            fill="none"
            stroke={bdr(0.22)}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* ── Corner square markers (on video edges) ── */}
        <div className="absolute" style={{ top: 'calc(22% - 3px)', left: 'calc(50% - 3px)', width: 6, height: 6, background: bdr(0.7), zIndex: 8 }} />
        <div className="absolute" style={{ top: 'calc(50% - 3px)', left: 'calc(24% - 3px)', width: 6, height: 6, background: bdr(0.7), zIndex: 8 }} />
        <div className="absolute" style={{ top: 'calc(76% - 3px)', left: 'calc(50% - 3px)', width: 6, height: 6, background: bdr(0.7), zIndex: 8 }} />
        <div className="absolute" style={{ top: 'calc(50% - 3px)', right: 'calc(24% - 3px)', width: 6, height: 6, background: bdr(0.7), zIndex: 8 }} />

        {/* ── Central Video — truly centered, large ── */}
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(420px, 52vw, 740px)',
            zIndex: 10,
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full block object-cover"
          >
            <source src="/output.webm" type="video/webm" />
          </video>
        </div>

        {/* ── Top meta bar (below navbar) ── */}
        <div
          className="absolute left-0 right-0 flex items-center justify-between px-7"
          style={{ top: '82px', zIndex: 20 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[9px] tracking-[0.25em] uppercase"
            style={{ fontFamily: 'var(--font-jetbrains)', color: txt(0.45) }}
          >
            MUBASHIR AHMED
          </motion.span>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={toggleTheme}
            className="border px-4 py-1.5 text-[9px] tracking-[0.2em] uppercase transition-colors cursor-pointer"
            style={{
              fontFamily: 'var(--font-jetbrains)',
              borderColor: bdr(0.38),
              color: txt(0.75),
              background: 'transparent',
            }}
          >
            [ CHANGE REALITY ]
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <LocalTime isDark={isDark} />
          </motion.div>
        </div>

        {/* ── Large Headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12 }}
          className="absolute font-black uppercase leading-none"
          style={{
            top: 'clamp(108px, 17vh, 155px)',
            left: 'clamp(16px, 3vw, 44px)',
            maxWidth: '32%',
            fontFamily: 'var(--font-jakarta)',
            fontSize: 'clamp(46px, 7.2vw, 108px)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            color: txt(1),
            zIndex: 20,
          }}
        >
          FLUTTER,<br />BY DESIGN.
        </motion.h1>

        {/* ── Annotation: top-right of video ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="absolute uppercase leading-relaxed"
          style={{
            top: '20%',
            left: '63%',
            maxWidth: '180px',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '9px',
            letterSpacing: '0.1em',
            color: txt(0.45),
            zIndex: 20,
          }}
        >
          WHERE IMAGINATION<br />MEETS CLEAN CODE<br />AND THOUGHTFUL CRAFT
        </motion.div>

        {/* ── Annotation: left of video ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
          className="absolute uppercase leading-relaxed"
          style={{
            top: '46%',
            left: '4%',
            maxWidth: '155px',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '9px',
            letterSpacing: '0.1em',
            color: txt(0.45),
            zIndex: 20,
          }}
        >
          FROM KERALA,<br />CREATIVITY DRAWS<br />ITS STRENGTH.
        </motion.div>

        {/* ── Annotation: bottom-right of video ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}
          className="absolute uppercase leading-relaxed"
          style={{
            bottom: '18%',
            left: '63%',
            maxWidth: '142px',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '9px',
            letterSpacing: '0.1em',
            color: txt(0.45),
            zIndex: 20,
          }}
        >
          FOUNDATION<br />DESIGNED FOR<br />GROWTH
        </motion.div>

        {/* ── Etymology / Years card (right) ── */}
        <motion.div
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.65 }}
          className="absolute p-4"
          style={{
            top: '30%',
            right: '2.5%',
            width: '210px',
            fontFamily: 'var(--font-jetbrains)',
            zIndex: 20,
            border: `1px solid ${bdr(0.18)}`,
          }}
        >
          <div className="flex justify-between items-center mb-3">
            <span
              className="text-[10px] tracking-[0.15em] uppercase"
              style={{ color: txt(1) }}
            >
              MUBASHIR
            </span>
            <span className="text-[10px]" style={{ color: txt(0.3) }}>/6+</span>
          </div>
          <div
            className="text-[9px] leading-loose uppercase tracking-wider"
            style={{ color: txt(0.42) }}
          >
            MU (GIFTED)<br />
            + BASHIR (HERALD)<br />
            <span style={{ color: txt(0.25) }}>→ BEARER OF GOOD CRAFT</span>
          </div>
        </motion.div>

        {/* ── Core Threads — bottom left ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-7 left-7"
          style={{ fontFamily: 'var(--font-jetbrains)', zIndex: 20 }}
        >
          <div
            className="text-[9px] tracking-[0.2em] uppercase mb-4"
            style={{ color: txt(0.3) }}
          >
            [ CORE THREADS OF MY WORK ]
          </div>
          <div className="space-y-3">
            {coreThreads.map(({ n, label }) => (
              <div key={n} className="flex items-center gap-3">
                <div
                  className="shrink-0 border flex items-center justify-center"
                  style={{
                    width: 28,
                    height: 28,
                    borderColor: bdr(0.2),
                  }}
                >
                  <div
                    className="grid"
                    style={{ gridTemplateColumns: 'repeat(3,1fr)', gap: '2px' }}
                  >
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        style={{ width: 3, height: 3, background: txt(0.3) }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div
                    className="text-[8px] tracking-wider"
                    style={{ color: txt(0.22) }}
                  >
                    {n} ////////////////
                  </div>
                  <div
                    className="text-[10px] uppercase tracking-wider mt-0.5"
                    style={{ color: txt(0.6) }}
                  >
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── About Card — bottom right ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68 }}
          className="absolute bottom-7 right-5 p-4"
          style={{
            width: 235,
            fontFamily: 'var(--font-jetbrains)',
            zIndex: 20,
            border: `1px solid ${bdr(0.18)}`,
          }}
        >
          <div className="flex justify-between items-start mb-3">
            <span
              className="text-[9px] uppercase tracking-[0.12em]"
              style={{ color: txt(0.5) }}
            >
              NOT AN AGENCY — JUST ME
            </span>
            <span style={{ color: txt(0.22), fontSize: 10 }}>✕</span>
          </div>
          <p
            className="text-[9px] leading-relaxed mb-4"
            style={{ color: txt(0.4) }}
          >
            I'm Mubashir Ahmed — I build cross-platform apps,
            mentor devs, and write about clean architecture.
            This site is a window into my craft.
          </p>
          <div className="flex gap-2 flex-wrap">
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="border px-2 py-1 text-[8px] tracking-wider uppercase transition-colors"
                style={{ borderColor: bdr(0.22), color: txt(0.58) }}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ═══════════════════════════════════════
          MOBILE LAYOUT  (below md)
      ═══════════════════════════════════════ */}
      <div
        className="md:hidden flex flex-col"
        style={{ minHeight: '100svh', fontFamily: 'var(--font-jetbrains)' }}
      >
        {/* Mobile top meta */}
        <div className="pt-20 px-5 flex justify-between items-start">
          <span
            className="text-[9px] tracking-[0.22em] uppercase"
            style={{ color: txt(0.38) }}
          >
            MUBASHIR AHMED
          </span>
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={toggleTheme}
              className="border px-3 py-1 text-[8px] tracking-[0.15em] uppercase transition-colors"
              style={{ borderColor: bdr(0.35), color: txt(0.65), background: 'transparent' }}
            >
              [ CHANGE REALITY ]
            </button>
            <LocalTime isDark={isDark} />
          </div>
        </div>

        {/* Mobile headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="px-5 mt-6 font-black uppercase leading-none"
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: 'clamp(44px, 14vw, 68px)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            color: txt(1),
          }}
        >
          FLUTTER,<br />BY DESIGN.
        </motion.h1>

        {/* Mobile video */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 px-4"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full block object-cover"
          >
            <source src="/output.webm" type="video/webm" />
          </video>
        </motion.div>

        {/* Mobile about card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mx-5 mt-7 p-4"
          style={{ border: `1px solid ${bdr(0.18)}` }}
        >
          <div
            className="text-[9px] uppercase tracking-[0.12em] mb-2"
            style={{ color: txt(0.48) }}
          >
            NOT AN AGENCY — JUST ME
          </div>
          <p
            className="text-[9px] leading-relaxed mb-3"
            style={{ color: txt(0.4) }}
          >
            I build cross-platform apps, mentor devs, and write
            about clean architecture. This site is a window into my craft.
          </p>
          <div className="flex gap-2 flex-wrap">
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="border px-2 py-1 text-[8px] tracking-wider uppercase transition-colors"
                style={{ borderColor: bdr(0.22), color: txt(0.58) }}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Mobile CTA */}
        <div className="mx-5 mt-6 pb-10">
          <a
            href="#projects"
            className="block w-full border text-center py-3 text-[10px] tracking-[0.22em] uppercase transition-colors"
            style={{ borderColor: bdr(0.28), color: txt(0.72) }}
          >
            [ EXPLORE WORK ]
          </a>
        </div>
      </div>
    </section>
  );
}
