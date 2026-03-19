export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  tags: string[];
  category: 'flutter' | 'web' | 'fullstack';
  links: {
    live?: string;
    github?: string;
    appStore?: string;
    playStore?: string;
  };
  featured: boolean;
  stats?: string;
}

export const projects: Project[] = [
  {
    id: 'raasta-realty',
    title: 'Raasta Realty',
    description:
      'Modern real estate platform with property listings, virtual tours, and seamless booking experience. Built with Next.js and responsive design.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    category: 'web',
    featured: true,
    stats: 'Real Estate',
    image: 'https://raastarealty.com/og-image.jpg',
    links: {
      live: 'https://raastarealty.com/',
    },
  },
  {
    id: 'bishertalks',
    title: 'Bishertalks',
    description:
      'Community-driven platform for conversations and discussions. Features real-time messaging, user profiles, and engagement analytics.',
    tags: ['Next.js', 'WebSocket', 'PostgreSQL', 'React'],
    category: 'web',
    featured: true,
    stats: 'Community',
    image: 'https://www.bishertalks.com/og-image.jpg',
    links: {
      live: 'https://www.bishertalks.com/',
    },
  },
  {
    id: 'marketing-nizam',
    title: 'Marketing Nizam',
    description:
      'Digital marketing agency website with portfolio showcase, service listings, and client testimonials. Optimized for conversions.',
    tags: ['Next.js', 'SEO', 'Analytics', 'Responsive Design'],
    category: 'web',
    featured: true,
    stats: 'Marketing',
    image: 'https://www.marketingnizam.com/og-image.jpg',
    links: {
      live: 'https://www.marketingnizam.com/',
    },
  },
  {
    id: 'eduport',
    title: 'Eduport',
    description:
      'E-learning platform with 600K+ downloads, 115M+ learning hours. Features mock tests, video classes, and performance analysis for students.',
    tags: ['Flutter', 'BLoC', 'Django', 'Push Notifications'],
    category: 'flutter',
    featured: false,
    stats: '600K+ Downloads',
    links: {
      appStore:
        'https://apps.apple.com/in/app/eduport-sslc-11-12-science/id6443499408',
    },
  },
  {
    id: 'telios',
    title: 'Telios Survey',
    description:
      'GeoJSON mapping & survey collection for village data. Cross-platform with offline-first architecture and clean code patterns.',
    tags: ['Flutter', 'Web', 'Clean Architecture', 'BLoC', 'GeoJSON'],
    category: 'flutter',
    featured: false,
    stats: 'Offline-First',
    links: {},
  },
  {
    id: 'autographa',
    title: 'Autographa',
    description:
      'Bible translation reader app with GraphQL APIs, test-driven development, and clean architecture patterns.',
    tags: ['Flutter', 'GraphQL', 'TDD', 'Clean Architecture'],
    category: 'flutter',
    featured: false,
    stats: 'TDD Built',
    links: {},
  },
  {
    id: 'last-minute-flights',
    title: 'Last Minute Flights',
    description:
      'Flight booking app with SkyScanner API integration, dynamic filtering, real-time updates, and comprehensive ticket management.',
    tags: ['Flutter', 'GetX', 'i18n', 'SkyScanner API'],
    category: 'flutter',
    featured: false,
    stats: 'Travel Solution',
    links: {
      playStore:
        'https://play.google.com/store/apps/details?id=com.lastairfare.lastminuteflights',
    },
  },
  {
    id: 'the1andonly',
    title: 'The1andOnly',
    description:
      'E-commerce & publishing platform with Stripe payments, WordPress backend, and multimedia processing capabilities.',
    tags: ['Flutter', 'Stripe', 'ZEGOCLOUD', 'WordPress'],
    category: 'flutter',
    featured: false,
    stats: 'Multi-platform',
    links: {
      appStore: 'https://apps.apple.com/in/app/the1andonly/id6744329968',
    },
  },
  {
    id: 'kevell-care',
    title: 'Kevell Care',
    description:
      'Remote patient monitoring via IoT devices with real-time video chat, health monitoring dashboards, and appointment management.',
    tags: ['Flutter', 'MQTT', 'WebRTC', 'BLoC', 'IoT'],
    category: 'flutter',
    featured: false,
    stats: 'Healthcare Innovation',
    links: {},
  },
];

export const categories = [
  { label: 'All', value: 'all' },
  { label: 'Flutter', value: 'flutter' },
  { label: 'Web', value: 'web' },
  { label: 'Full Stack', value: 'fullstack' },
] as const;
