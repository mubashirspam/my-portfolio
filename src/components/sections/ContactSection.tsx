'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, Volume2 } from 'lucide-react';
import Image from 'next/image';

const socialLinks = [
  { label: 'bluesky', href: 'https://bsky.app/profile/mubashirahmed.bsky.social', color: '#3b82f6' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/mubashir-ahmad/', color: '#0077b5' },
  { label: 'github', href: 'https://github.com/mubashirspam', color: '#8b5cf6' },
  { label: 'email', href: 'mailto:getmemubashir@gmail.com', color: '#f43f5e' },
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
      <div className="mt-6 rounded-2xl border border-rose-500/15 bg-gradient-to-br from-rose-500/8 to-pink-500/5 p-6">
        <audio
          ref={audioRef}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0">
            <Music className="w-6 h-6 text-rose-500" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground text-sm">SoundHelix Song 1</p>
            <p className="text-xs text-muted-foreground">Electronic &bull; Coding Vibes</p>

            <div className="mt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono">{formatTime(currentTime)}</span>
                <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-100 bg-rose-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="font-mono">{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-muted-foreground hidden sm:block" />
            <button
              onClick={togglePlay}
              className="shrink-0 transition-all hover:scale-110 text-rose-500"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-10 h-10" fill="currentColor" />
              ) : (
                <Play className="w-10 h-10" fill="currentColor" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Keep in Touch */}
      <div className="mt-16 text-center">
        <h2
          className="text-3xl sm:text-4xl font-normal text-foreground mb-4"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Let&apos;s Keep in Touch
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground max-w-lg mx-auto mb-10">
          Whether you have questions, need advice, or just want to chat,
          don&apos;t hesitate to reach out!
        </p>

        {/* Social links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {socialLinks.map(({ label, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-sm font-medium text-foreground border transition-all duration-300 hover:scale-105"
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
              {label}
            </a>
          ))}
        </div>

        {/* Signature SVG */}
        <div className="mb-6">
          <Image
            src="/text.svg"
            alt="Mubashir Ahmad signature"
            width={200}
            height={40}
            className="mx-auto dark:invert"
          />
        </div>

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
    <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider text-accent bg-accent-subtle border border-accent rounded-full backdrop-blur-sm">
      {label}
    </span>
  );
}
