'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, Volume2 } from 'lucide-react';
import Image from 'next/image';

const socialLinks = [
  { label: 'bluesky', href: 'https://bsky.app/profile/mubashirahmed.bsky.social', color: '#3b82f6', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/mubashir-ahmad/', color: '#0077b5', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
  { label: 'github', href: 'https://github.com/mubashirspam', color: '#8b5cf6', icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22' },
  { label: 'email', href: 'mailto:getmemubashir@gmail.com', color: '#f43f5e', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

export function ContactSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  useEffect(() => {
    const handler = () => togglePlay();
    window.addEventListener('terminal:toggle-music', handler);
    return () => window.removeEventListener('terminal:toggle-music', handler);
  }, [togglePlay]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id="contact"
      className="py-16"
    >
      <SectionBadge label="THE BEAT BEHIND THE CODE" />

      {/* Music Player */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="mt-6 rounded-2xl border border-rose-500/15 bg-gradient-to-br from-rose-500/8 to-pink-500/5 p-6 relative overflow-hidden group"
      >
        {/* Animated sound wave background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
          <svg className="absolute bottom-0 left-0 right-0 h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.rect
                key={i}
                x={80 * i + 35}
                y="30"
                width="6"
                rx="3"
                fill="#f43f5e"
                animate={isPlaying ? {
                  height: [20, 50 + i * 5, 30, 60 - i * 3, 20],
                  y: [40, 25 - i * 2, 35, 20 + i, 40],
                } : { height: 20, y: 40 }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
              />
            ))}
          </svg>
        </div>

        <audio
          ref={audioRef}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />

        <div className="flex items-center gap-4 relative z-10">
          <motion.div
            className="w-14 h-14 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0"
            animate={isPlaying ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Music className="w-6 h-6 text-rose-500" />
          </motion.div>

          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground text-sm">SoundHelix Song 1</p>
            <p className="text-xs text-muted-foreground">Electronic &bull; Coding Vibes</p>

            <div className="mt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono">{formatTime(currentTime)}</span>
                <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-rose-500"
                    style={{ width: `${progress}%` }}
                    layout
                  />
                </div>
                <span className="font-mono">{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-muted-foreground hidden sm:block" />
            <motion.button
              onClick={togglePlay}
              className="shrink-0 text-rose-500"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-10 h-10" fill="currentColor" />
              ) : (
                <Play className="w-10 h-10" fill="currentColor" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Keep in Touch */}
      <div className="mt-16 text-center relative">
        {/* Decorative shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.svg
            className="absolute top-0 left-[10%] w-12 h-12 opacity-[0.05]"
            viewBox="0 0 40 40"
            animate={{ y: [0, -8, 0], rotate: [0, 45, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <rect x="5" y="5" width="30" height="30" rx="4" fill="none" stroke="var(--fg)" strokeWidth="1" />
          </motion.svg>
          <motion.svg
            className="absolute bottom-20 right-[10%] w-10 h-10 opacity-[0.05]"
            viewBox="0 0 40 40"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <circle cx="20" cy="20" r="15" fill="none" stroke="var(--accent-color)" strokeWidth="1" strokeDasharray="3 3" />
          </motion.svg>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-normal text-foreground mb-4"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Let&apos;s Keep in Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base leading-relaxed text-muted-foreground max-w-lg mx-auto mb-10"
        >
          Whether you have questions, need advice, or just want to chat,
          don&apos;t hesitate to reach out!
        </motion.p>

        {/* Social links with animated icons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {socialLinks.map(({ label, href, color, icon }, index) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium text-foreground border transition-all duration-300"
              style={{ borderColor: `${color}30`, backgroundColor: `${color}08` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${color}60`;
                e.currentTarget.style.backgroundColor = `${color}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${color}30`;
                e.currentTarget.style.backgroundColor = `${color}08`;
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={icon} />
              </svg>
              {label}
            </motion.a>
          ))}
        </div>

        {/* Signature SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <div className="footer-shine mx-auto w-fit">
            <Image
              src="/text.svg"
              alt="Mubashir Ahmad signature"
              width={200}
              height={40}
              className="dark:invert"
            />
          </div>
        </motion.div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground mb-2">
          Copyright &copy; {new Date().getFullYear()} &mdash; Made by Mubashir
        </p>
        <p className="text-sm font-medium text-foreground">
          mubashirahmad.dev
        </p>
      </div>
    </motion.section>
  );
}

function SectionBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-block text-[9px] tracking-[0.2em] uppercase border px-3 py-1 text-muted-foreground border-border"
      style={{ fontFamily: 'var(--font-jetbrains)' }}
    >
      / {label}
    </span>
  );
}
