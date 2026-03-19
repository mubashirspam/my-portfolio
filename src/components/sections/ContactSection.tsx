'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, Volume2 } from 'lucide-react';
import Image from 'next/image';

const socialLinks = [
  { label: 'bluesky', href: 'https://bsky.app/profile/mubashirahmed.bsky.social' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/mubashir-ahmad/' },
  { label: 'github', href: 'https://github.com/mubashirspam' },
  { label: 'email', href: 'mailto:getmemubashir@gmail.com' },
];

export function ContactSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

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
      <div className="mt-6 rounded-2xl border border-border bg-gradient-to-r from-[color-mix(in_srgb,var(--accent-color)_8%,var(--bg))] to-[color-mix(in_srgb,var(--accent-color)_3%,var(--bg))] p-6">
        <audio
          ref={audioRef}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <Music className="w-8 h-8" style={{ color: 'var(--accent-color)' }} />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground">SoundHelix Song 1</p>
            <p className="text-sm text-muted-foreground">Electronic • Coding Vibes</p>
            
            {/* Progress Bar */}
            <div className="mt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-100"
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: 'var(--accent-color)'
                    }}
                  />
                </div>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-muted-foreground" />
            <button
              onClick={togglePlay}
              className="shrink-0 transition-all hover:scale-110"
              style={{ color: 'var(--accent-color)' }}
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
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Let&apos;s Keep in Touch
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground max-w-lg mx-auto mb-10">
          Stay updated on my latest projects, insights, and offerings. Whether
          you have questions, need advice, or just want to chat, don&apos;t
          hesitate to reach out!
        </p>

        {/* Social links */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-16">
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
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
    <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider text-foreground border border-border rounded-full">
      {label}
    </span>
  );
}
