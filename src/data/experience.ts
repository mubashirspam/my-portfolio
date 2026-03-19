export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    title: 'Lead Flutter Developer',
    company: 'Geneza Solutions',
    location: 'Lucknow',
    period: 'Feb 2024 - Present',
    type: 'Remote Contract',
    highlights: [
      'Developed Telios Flutter applications with cross-platform functionality',
      'Implemented MVVM design pattern and GetX for state management',
      'Integrated GeoJSON for map interactions and survey data collection',
      'Built Rutu Bhonsle e-commerce app with measurement customization',
    ],
  },
  {
    title: 'Flutter Developer',
    company: 'Lascade Solutions',
    location: 'Kochi',
    period: 'Jul 2024 - Jan 2025',
    type: 'Remote Contract',
    highlights: [
      'Developed Last Minute Flights booking application',
      'Implemented dynamic filtering and real-time flight updates',
      'Built comprehensive ticket management system',
    ],
  },
  {
    title: 'Lead Flutter Mobile Developer',
    company: 'Kevell Corp',
    location: 'Madhura',
    period: 'Feb 2023 - Feb 2024',
    type: 'Full-time',
    highlights: [
      'Led development of Mango financial application with BLoC architecture',
      'Spearheaded Kevell Care healthcare app with WebRTC integration',
      'Implemented IoT health monitoring devices integration',
      'Built admin panels for comprehensive management',
    ],
  },
  {
    title: 'Flutter Developer',
    company: 'Bridgeconn / Autographa',
    location: 'Remote',
    period: '2022 - 2023',
    type: 'Contract',
    highlights: [
      'Developed Bible translation reader app with GraphQL APIs',
      'Implemented TDD with comprehensive test coverage',
      'Applied Clean Architecture patterns for scalability',
    ],
  },
  {
    title: 'Software Developer',
    company: 'Qutyme',
    location: 'Kochi',
    period: '2020 - 2022',
    type: 'Full-time',
    highlights: [
      'Built Eduport e-learning platform reaching 600K+ downloads',
      'Developed push notification systems for engagement',
      'Implemented video streaming and performance analytics',
    ],
  },
];

export const skills = [
  {
    category: 'Mobile Development',
    items: ['Flutter', 'Dart', 'SwiftUI', 'Kotlin', 'Android', 'iOS'],
  },
  {
    category: 'State Management',
    items: ['BLoC', 'Provider', 'Riverpod', 'GetX'],
  },
  {
    category: 'Architecture',
    items: ['Clean Architecture', 'MVVM', 'MVC', 'TDD'],
  },
  {
    category: 'Backend & Database',
    items: ['Firebase', 'Supabase', 'Node.js', 'Django', 'MySQL', 'GraphQL'],
  },
  {
    category: 'Web Technologies',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: 'Tools & Protocols',
    items: ['Git', 'REST APIs', 'WebRTC', 'MQTT', 'GeoJSON', 'CI/CD'],
  },
];
