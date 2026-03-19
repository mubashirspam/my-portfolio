import type { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Mubashir Ahmed for Flutter development, mobile app projects, or freelance opportunities.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
