import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { Navigation } from '@/components/layout/Navigation';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mubashir.dev'),
  title: {
    default: 'Mubashir Ahmed | Flutter Developer & Mobile App Expert — Hire for App, Web & AI Solutions',
    template: '%s | Mubashir Ahmed — Flutter & Mobile Developer',
  },
  description:
    'Hire Mubashir Ahmed — Senior Flutter Developer with 6+ years building production mobile apps, cross-platform solutions, and modern web applications. Specializing in Flutter, React, Next.js, AI integration, Clean Architecture, and scalable solutions for startups and enterprises worldwide.',
  keywords: [
    'Flutter Developer', 'Flutter Expert', 'Dart Developer', 'Mobile App Developer',
    'Senior Flutter Engineer', 'Cross-Platform Developer',
    'iOS App Developer', 'Android App Developer', 'Mobile Application Development',
    'React Developer', 'Next.js Developer', 'TypeScript Developer',
    'Full Stack Developer', 'Web Application Developer',
    'AI App Development', 'AI Integration Developer', 'Machine Learning Mobile Apps',
    'ChatGPT Integration', 'AI-Powered Applications', 'LLM Integration',
    'Clean Architecture', 'BLoC Pattern', 'MVVM Architecture', 'TDD Developer',
    'Hire Flutter Developer', 'Freelance Mobile Developer', 'Remote App Developer',
    'App Development Services', 'Mobile App Consultant',
    'Custom Mobile App Development', 'Enterprise App Development',
    'Startup App Development', 'MVP Development',
    'Firebase Developer', 'Supabase', 'GraphQL', 'REST API', 'WebRTC',
    'E-commerce App Development', 'Healthcare App Development',
    'Fintech App Development', 'EdTech App Development',
    'Freelance Developer India', 'Remote Developer for Hire',
    'App Developer for US Startups', 'Flutter Developer for Hire Worldwide',
    'Mubashir Ahmed', 'mubashir.dev',
  ],
  authors: [{ name: 'Mubashir Ahmed', url: 'https://mubashir.dev' }],
  creator: 'Mubashir Ahmed',
  publisher: 'Mubashir Ahmed',
  category: 'Technology',
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: 'https://mubashir.dev',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mubashir.dev',
    siteName: 'Mubashir Ahmed — Flutter & Mobile App Developer',
    title: 'Mubashir Ahmed | Hire Expert Flutter Developer for App & Web Projects',
    description:
      'Looking for a skilled Flutter developer? Mubashir Ahmed builds high-performance mobile apps, web applications, and AI-powered solutions. 6+ years experience, 20+ projects, 600K+ downloads. Available worldwide.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mubashir Ahmed — Senior Flutter Developer & Mobile App Expert',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mubashir Ahmed | Flutter Developer & Mobile App Expert',
    description:
      'Senior Flutter Developer building production mobile apps & web solutions for clients worldwide. 6+ years, 20+ projects, 600K+ downloads.',
    images: ['/og-image.png'],
    creator: '@mubashirahmed',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafbff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0b14' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/* ===== Structured Data (JSON-LD) ===== */

function JsonLdPerson() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://mubashir.dev/#person',
    name: 'Mubashir Ahmed',
    givenName: 'Mubashir',
    familyName: 'Ahmed',
    jobTitle: 'Senior Flutter Developer & Mobile App Expert',
    description:
      'Senior Flutter Developer with 6+ years specializing in cross-platform mobile apps, web development, and AI-powered solutions. Available for freelance and contract work worldwide.',
    url: 'https://mubashir.dev',
    email: 'getmemubashir@gmail.com',
    telephone: '+919562229979',
    image: 'https://mubashir.dev/og-image.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Wayanad',
      addressRegion: 'Kerala',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://linkedin.com/in/mubashir-ahmad',
      'https://github.com/mubashirspam',
      'https://bsky.app/profile/mubashirahmed.bsky.social',
      'https://topmate.io/mubashir_ahammed',
    ],
    knowsAbout: [
      'Flutter', 'Dart', 'Mobile App Development', 'Cross-Platform Development',
      'iOS Development', 'Android Development', 'React', 'Next.js', 'TypeScript',
      'Clean Architecture', 'BLoC Pattern', 'Firebase', 'Supabase', 'GraphQL',
      'AI Integration', 'Machine Learning', 'UI/UX Design', 'WebRTC', 'IoT',
    ],
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Flutter App Development', description: 'Custom cross-platform mobile app development using Flutter & Dart' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Application Development', description: 'Modern web applications using React, Next.js, and TypeScript' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI-Powered App Development', description: 'Integration of AI, ML, and LLM capabilities into mobile and web apps' } },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

function JsonLdWebSite() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://mubashir.dev/#website',
    name: 'Mubashir Ahmed — Flutter Developer & Mobile App Expert',
    url: 'https://mubashir.dev',
    description: 'Portfolio of Mubashir Ahmed — senior Flutter developer specializing in mobile apps, web development, and AI solutions.',
    publisher: { '@id': 'https://mubashir.dev/#person' },
    inLanguage: 'en-US',
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

function JsonLdProfessionalService() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://mubashir.dev/#service',
    name: 'Mubashir Ahmed — App & Web Development Services',
    description: 'Professional mobile app development, web development, and AI integration services. Specializing in Flutter, React, Next.js. Serving clients worldwide.',
    url: 'https://mubashir.dev',
    telephone: '+919562229979',
    email: 'getmemubashir@gmail.com',
    priceRange: '$$',
    address: { '@type': 'PostalAddress', addressLocality: 'Wayanad', addressRegion: 'Kerala', addressCountry: 'IN' },
    geo: { '@type': 'GeoCoordinates', latitude: '11.6854', longitude: '76.1320' },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'India' },
    ],
    serviceType: [
      'Mobile App Development', 'Flutter App Development', 'iOS App Development',
      'Android App Development', 'Web Application Development', 'AI Integration Services',
      'UI/UX Design', 'MVP Development', 'App Consulting',
    ],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '15', bestRating: '5' },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

function JsonLdFAQ() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What services does Mubashir Ahmed offer?',
        acceptedAnswer: { '@type': 'Answer', text: 'Mubashir offers Flutter mobile app development, cross-platform app development (iOS & Android), web application development using React and Next.js, AI-powered app development, UI/UX design, and technical consulting for startups and enterprises.' },
      },
      {
        '@type': 'Question',
        name: 'How much experience does Mubashir Ahmed have?',
        acceptedAnswer: { '@type': 'Answer', text: 'Mubashir has 6+ years of professional experience, having delivered 20+ production projects with 600K+ combined app downloads across healthcare, fintech, e-commerce, and edtech industries.' },
      },
      {
        '@type': 'Question',
        name: 'Does Mubashir work with international clients?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes, Mubashir works with clients worldwide including the US, UK, Europe, Middle East, and Asia. He is available for remote freelance and contract work.' },
      },
      {
        '@type': 'Question',
        name: 'Can Mubashir build AI-powered mobile applications?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes, Mubashir specializes in integrating AI capabilities including LLM/ChatGPT integration, machine learning models, and intelligent features into mobile and web applications.' },
      },
      {
        '@type': 'Question',
        name: 'How to hire Mubashir Ahmed?',
        acceptedAnswer: { '@type': 'Answer', text: 'Book a discovery call at topmate.io/mubashir_ahammed, email getmemubashir@gmail.com, or connect via LinkedIn. Available for freelance, contract, and long-term collaborations.' },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLdPerson />
        <JsonLdWebSite />
        <JsonLdProfessionalService />
        <JsonLdFAQ />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />

        <meta name="geo.region" content="IN-KL" />
        <meta name="geo.placename" content="Wayanad, Kerala" />
        <meta name="geo.position" content="11.6854;76.1320" />
        <meta name="ICBM" content="11.6854, 76.1320" />
        <meta httpEquiv="content-language" content="en" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Mubashir Ahmed" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-md"
          >
            Skip to main content
          </a>

          <Navigation />
          <div id="main-content">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
