import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Mubashir Ahmed — Senior Flutter Engineer with 6+ years of experience building production mobile apps in Kerala, India.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
