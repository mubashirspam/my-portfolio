export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    role: 'CTO',
    company: 'Geneza Solutions',
    content:
      'Mubashir is an exceptional Flutter developer who consistently delivers high-quality, production-ready code. His understanding of clean architecture and state management patterns is outstanding.',
  },
  {
    id: '2',
    name: 'Rahul Menon',
    role: 'Product Manager',
    company: 'Kevell Corp',
    content:
      'Working with Mubashir on Kevell Care was a great experience. He tackled complex IoT integrations and WebRTC implementations with ease, always ensuring the user experience remained smooth.',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    role: 'Project Lead',
    company: 'Bridgeconn',
    content:
      'Mubashir brought a test-driven development approach to our Autographa project that significantly improved code quality. His attention to detail and architectural decisions made the codebase highly maintainable.',
  },
];
