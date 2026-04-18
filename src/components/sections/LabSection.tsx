'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Beaker } from 'lucide-react';
import {
  labProjects,
  type LabProject,
  type LabCategory,
  LAB_CATEGORY_COLOR,
  LAB_CATEGORY_LABEL,
} from '@/data/labProjects';

// ─── Abstract card art per category ─────────────────────────────────────────

function LabCardArt({ category, color }: { category: LabCategory; color: string }) {
  const c = color;

  if (category === 'flutter') {
    // Orbiting dots — evokes Flutter's animation engine
    return (
      <svg viewBox="0 0 320 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`rg-fl-${c}`} cx="50%" cy="50%">
            <stop offset="0%" stopColor={c} stopOpacity="0.12" />
            <stop offset="100%" stopColor={c} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="160" fill={`url(#rg-fl-${c})`} />
        <circle cx="160" cy="80" r="50" stroke={c} strokeOpacity="0.15" strokeWidth="0.8" fill="none" />
        <circle cx="160" cy="80" r="30" stroke={c} strokeOpacity="0.2" strokeWidth="0.8" fill="none" />
        <circle cx="160" cy="80" r="8" fill={c} fillOpacity="0.25" />
        {/* Orbiting dots */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = 160 + 50 * Math.cos(rad);
          const y = 80 + 50 * Math.sin(rad);
          return <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 3 : 2} fill={c} fillOpacity={i % 2 === 0 ? 0.6 : 0.3} />;
        })}
        {[30, 90, 150, 210, 270, 330].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = 160 + 30 * Math.cos(rad);
          const y = 80 + 30 * Math.sin(rad);
          return <circle key={i} cx={x} cy={y} r="2" fill={c} fillOpacity="0.4" />;
        })}
      </svg>
    );
  }

  if (category === '3d') {
    // Perspective wireframe cube
    const pts = {
      // back face
      b: [
        [105, 55], [215, 55], [215, 115], [105, 115],
      ] as [number, number][],
      // front face (offset)
      f: [
        [85, 75], [195, 75], [195, 135], [85, 135],
      ] as [number, number][],
    };
    const edges: [[number, number], [number, number]][] = [
      [pts.f[0], pts.b[0]], [pts.f[1], pts.b[1]],
      [pts.f[2], pts.b[2]], [pts.f[3], pts.b[3]],
    ];
    const poly = (arr: [number, number][]) => arr.map(([x, y]) => `${x},${y}`).join(' ');
    return (
      <svg viewBox="0 0 320 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <rect width="320" height="200" fill={c} fillOpacity="0.04" />
        <polygon points={poly(pts.b)} fill={c} fillOpacity="0.06" stroke={c} strokeOpacity="0.25" strokeWidth="0.8" />
        <polygon points={poly(pts.f)} fill={c} fillOpacity="0.1" stroke={c} strokeOpacity="0.4" strokeWidth="0.8" />
        {edges.map(([a, b], i) => (
          <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c} strokeOpacity="0.3" strokeWidth="0.8" />
        ))}
        {/* Grid dots */}
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={i} cx={50 + (i % 4) * 80} cy={25 + Math.floor(i / 4) * 60} r="1.2" fill={c} fillOpacity="0.2" />
        ))}
      </svg>
    );
  }

  if (category === 'canvas') {
    // Sine / cosine wave lines — generative art feel
    const points1 = Array.from({ length: 80 }, (_, i) => {
      const x = (i / 79) * 320;
      const y = 80 + 28 * Math.sin((i / 79) * Math.PI * 4);
      return `${x},${y}`;
    }).join(' ');
    const points2 = Array.from({ length: 80 }, (_, i) => {
      const x = (i / 79) * 320;
      const y = 80 + 18 * Math.sin((i / 79) * Math.PI * 4 + 1.2);
      return `${x},${y}`;
    }).join(' ');
    return (
      <svg viewBox="0 0 320 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <rect width="320" height="160" fill={c} fillOpacity="0.04" />
        <polyline points={points2} fill="none" stroke={c} strokeOpacity="0.2" strokeWidth="1.5" />
        <polyline points={points1} fill="none" stroke={c} strokeOpacity="0.5" strokeWidth="1.5" />
        {/* Dots on the wave */}
        {[0, 16, 32, 48, 64, 79].map((i) => {
          const x = (i / 79) * 320;
          const y = 80 + 28 * Math.sin((i / 79) * Math.PI * 4);
          return <circle key={i} cx={x} cy={y} r="3" fill={c} fillOpacity="0.6" />;
        })}
      </svg>
    );
  }

  if (category === 'web') {
    // Browser-like grid with accent nodes
    return (
      <svg viewBox="0 0 320 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`grid-web`} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke={c} strokeOpacity="0.1" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="320" height="160" fill={`url(#grid-web)`} />
        {/* Accent nodes */}
        {[[64, 48], [160, 80], [256, 48], [128, 128], [224, 128]] .map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill={c} fillOpacity="0.15" />
            <circle cx={x} cy={y} r="2.5" fill={c} fillOpacity="0.6" />
          </g>
        ))}
        {/* Connecting lines */}
        <line x1="64" y1="48" x2="160" y2="80" stroke={c} strokeOpacity="0.2" strokeWidth="0.8" />
        <line x1="160" y1="80" x2="256" y2="48" stroke={c} strokeOpacity="0.2" strokeWidth="0.8" />
        <line x1="160" y1="80" x2="128" y2="128" stroke={c} strokeOpacity="0.2" strokeWidth="0.8" />
        <line x1="160" y1="80" x2="224" y2="128" stroke={c} strokeOpacity="0.2" strokeWidth="0.8" />
      </svg>
    );
  }

  if (category === 'tool') {
    // Terminal / code brackets feel
    return (
      <svg viewBox="0 0 320 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <rect width="320" height="160" fill={c} fillOpacity="0.04" />
        {/* Brackets */}
        <text x="52" y="100" fontSize="72" fontFamily="monospace" fill={c} fillOpacity="0.12" fontWeight="bold">{'{'}</text>
        <text x="230" y="100" fontSize="72" fontFamily="monospace" fill={c} fillOpacity="0.12" fontWeight="bold">{'}'}</text>
        {/* Code lines */}
        {[50, 66, 82, 98].map((y, i) => (
          <rect key={i} x="118" y={y} width={[80, 60, 70, 45][i]} height="5" rx="2" fill={c} fillOpacity={[0.35, 0.2, 0.25, 0.15][i]} />
        ))}
        {/* Cursor blink */}
        <rect x="118" y="114" width="8" height="5" rx="1" fill={c} fillOpacity="0.5" />
      </svg>
    );
  }

  if (category === 'game') {
    // Pixel grid — 8×8 game board aesthetic
    const pixels = [
      [3,1],[4,1],
      [2,2],[3,2],[4,2],[5,2],
      [1,3],[2,3],[3,3],[4,3],[5,3],[6,3],
      [1,4],[2,4],[5,4],[6,4],
      [2,5],[3,5],[4,5],[5,5],
      [3,6],[4,6],
    ];
    const px = 20, py = 24, sz = 14, gap = 2;
    return (
      <svg viewBox="0 0 320 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <rect width="320" height="160" fill={c} fillOpacity="0.04" />
        {Array.from({ length: 8 }, (_, row) =>
          Array.from({ length: 8 }, (_, col) => {
            const filled = pixels.some(([r, c2]) => r === col && c2 === row);
            return (
              <rect
                key={`${row}-${col}`}
                x={px + col * (sz + gap) + 56}
                y={py + row * (sz + gap)}
                width={sz} height={sz} rx="1"
                fill={c}
                fillOpacity={filled ? 0.55 : 0.06}
              />
            );
          })
        )}
      </svg>
    );
  }

  return null;
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: LabProject['status'] }) {
  const styles = {
    live:     'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    wip:      'bg-amber-500/10 text-amber-400 border-amber-500/30',
    archived: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30',
  };
  const labels = { live: '● LIVE', wip: '◐ WIP', archived: '○ ARCHIVED' };
  return (
    <span className={`text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

// ─── Individual card ──────────────────────────────────────────────────────────

function LabCard({ project, index, featured }: { project: LabProject; index: number; featured: boolean }) {
  const color = LAB_CATEGORY_COLOR[project.category];
  const isInternal = project.liveUrl?.startsWith('/');

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={[
        'group relative flex flex-col rounded-2xl overflow-hidden',
        'border border-border/40 bg-surface/30 backdrop-blur-sm',
        'transition-all duration-300',
        'hover:border-opacity-60 hover:-translate-y-0.5 hover:shadow-lg',
        featured ? 'sm:col-span-2' : '',
      ].join(' ')}
      style={{ '--cat': color } as React.CSSProperties}
    >
      {/* Art area */}
      <div
        className={['relative overflow-hidden', featured ? 'h-44 sm:h-52' : 'h-36'].join(' ')}
        style={{ background: `linear-gradient(135deg, #0f1019 0%, #15121f 100%)` }}
      >
        <LabCardArt category={project.category} color={color} />

        {/* Category pill — top left */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-[9px] font-bold tracking-[0.15em] px-2.5 py-1 rounded-full border"
            style={{ color, borderColor: `${color}40`, background: `${color}12` }}
          >
            {LAB_CATEGORY_LABEL[project.category]}
          </span>
        </div>

        {/* Status — top right */}
        <div className="absolute top-3 right-3 z-10">
          <StatusBadge status={project.status} />
        </div>

        {/* Subtle bottom gradient so content blends into art */}
        <div
          className="absolute inset-x-0 bottom-0 h-8 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #0f1019, transparent)' }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 pt-3.5">
        <h3
          className="font-bold text-[13px] text-foreground leading-snug"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          {project.title}
        </h3>
        <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-muted-foreground/70 border border-border/40 px-1.5 py-0.5 rounded-sm"
              style={{ fontFamily: 'var(--font-jetbrains)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 mt-auto pt-3.5 border-t border-border/20">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              Source
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground/30 cursor-default select-none">
              <Github className="w-3.5 h-3.5" />
              Source
            </span>
          )}

          {project.liveUrl ? (
            isInternal ? (
              <Link
                href={project.liveUrl}
                className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold transition-all hover:opacity-80"
                style={{ color }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Launch
              </Link>
            ) : (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold transition-all hover:opacity-80"
                style={{ color }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Launch
              </a>
            )
          ) : (
            <span className="ml-auto text-[11px] text-muted-foreground/30 select-none">
              Coming soon
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function LabSection() {
  // First project with featured=true is the wide hero card
  const featuredId = labProjects.find((p) => p.featured)?.id;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      {/* Header */}
      <div className="mb-10">
        <span
          className="inline-flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase border px-3 py-1 text-muted-foreground border-border"
          style={{ fontFamily: 'var(--font-jetbrains)' }}
        >
          <Beaker className="w-3 h-3" />
          / LAB
        </span>

        <h2
          className="text-4xl sm:text-5xl font-normal text-foreground mt-3"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Experiments &amp; Side Projects
        </h2>
        <p className="text-muted-foreground mt-2 text-sm max-w-md">
          Personal experiments, weekend hacks, and things I built just to see if
          they could be built.
        </p>

        {/* Category legend */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5">
          {(Object.entries(LAB_CATEGORY_LABEL) as [keyof typeof LAB_CATEGORY_LABEL, string][]).map(
            ([cat, label]) => (
              <span key={cat} className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: LAB_CATEGORY_COLOR[cat] }}
                />
                {label}
              </span>
            )
          )}
        </div>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {labProjects.map((project, i) => (
          <LabCard
            key={project.id}
            project={project}
            index={i}
            featured={project.id === featuredId}
          />
        ))}
      </div>
    </motion.section>
  );
}
