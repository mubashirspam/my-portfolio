export type LabCategory = 'flutter' | 'web' | '3d' | 'canvas' | 'tool' | 'game';
export type LabStatus = 'live' | 'wip' | 'archived';

export interface LabProject {
  id: string;
  title: string;
  category: LabCategory;
  description: string;
  tags: string[];
  status: LabStatus;
  /**
   * featured = true → card spans 2 columns (hero card)
   * Only the first featured card is rendered wide; the rest are normal.
   */
  featured?: boolean;
  /**
   * Live URL — either an internal Next.js route (e.g. "/flutter-playground")
   * or a full external URL (e.g. "https://your-experiment.vercel.app").
   * Used for the "Launch →" button.
   */
  liveUrl?: string;
  /** GitHub repository URL */
  githubUrl?: string;
}

// ─── Category meta ────────────────────────────────────────────────────────────

export const LAB_CATEGORY_COLOR: Record<LabCategory, string> = {
  flutter: '#60a5fa',   // blue
  web:     '#22d3ee',   // cyan
  '3d':    '#a78bfa',   // violet
  canvas:  '#fb923c',   // orange
  tool:    '#4ade80',   // green
  game:    '#f472b6',   // pink
};

export const LAB_CATEGORY_LABEL: Record<LabCategory, string> = {
  flutter: 'FLUTTER',
  web:     'WEB',
  '3d':    '3D / WebGL',
  canvas:  'CANVAS',
  tool:    'TOOL',
  game:    'GAME',
};

// ─── Projects ─────────────────────────────────────────────────────────────────
// Add your real liveUrl / githubUrl when available.

export const labProjects: LabProject[] = [
  {
    id: 'flutter-playground',
    title: 'Flutter Playground',
    category: 'flutter',
    description:
      '30+ interactive Flutter concepts running live in the browser — games, 3D effects, physics simulations, and UI micro-animations, all powered by DartPad.',
    tags: ['Flutter', 'Dart', 'DartPad', 'WebGL'],
    status: 'live',
    featured: true,
    liveUrl: '/flutter-playground',
    // githubUrl: 'https://github.com/your-username/flutter-playground',
  },
  {
    id: 'webgl-fluid',
    title: 'WebGL Fluid Sim',
    category: '3d',
    description:
      'GPU-accelerated fluid simulation using WebGL shaders. Touch to disturb the flow.',
    tags: ['WebGL', 'GLSL', 'Shaders'],
    status: 'wip',
    // liveUrl: 'https://fluid.your-domain.com',
    // githubUrl: 'https://github.com/your-username/webgl-fluid',
  },
  {
    id: 'css-lab',
    title: 'CSS Lab',
    category: 'web',
    description:
      'A growing collection of CSS micro-interactions, clip-path tricks, blend modes, and scroll-driven animations.',
    tags: ['CSS', 'HTML', 'Scroll API'],
    status: 'live',
    // liveUrl: '/css-lab',
    // githubUrl: 'https://github.com/your-username/css-lab',
  },
  {
    id: 'threejs-room',
    title: 'Three.js Room',
    category: '3d',
    description:
      'A navigable 3D room built with Three.js. Lights, shadows, post-processing, and interactive object inspection.',
    tags: ['Three.js', 'GLTF', 'WebGL', 'TypeScript'],
    status: 'wip',
    // liveUrl: 'https://room.your-domain.com',
    // githubUrl: 'https://github.com/your-username/threejs-room',
  },
  {
    id: 'generative-art',
    title: 'Generative Canvas',
    category: 'canvas',
    description:
      'Procedurally-generated art using Canvas 2D — flow fields, reaction-diffusion, and noise-based landscapes.',
    tags: ['Canvas 2D', 'Perlin Noise', 'P5.js'],
    status: 'wip',
    // liveUrl: '/generative',
    // githubUrl: 'https://github.com/your-username/generative-canvas',
  },
  {
    id: 'react-bits',
    title: 'React Bits',
    category: 'web',
    description:
      'Experimental React components: compound patterns, portals, concurrent features, and unusual layout primitives.',
    tags: ['React', 'TypeScript', 'Framer Motion'],
    status: 'wip',
    // liveUrl: 'https://react-bits.your-domain.com',
    // githubUrl: 'https://github.com/your-username/react-bits',
  },
  {
    id: 'devtools',
    title: 'Dev Tools',
    category: 'tool',
    description:
      'Small utilities I actually use: regex tester, color converter, JWT decoder, and a local font previewer.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    status: 'wip',
    // liveUrl: '/tools',
    // githubUrl: 'https://github.com/your-username/devtools',
  },
];
