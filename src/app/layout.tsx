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
    default: 'Mubashir Ahmed | Senior Flutter Engineer',
    template: '%s | Mubashir Ahmed',
  },
  description:
    'Senior Flutter Engineer with 6+ years of experience building production mobile apps. Specializing in Clean Architecture, BLoC, and scalable mobile solutions.',
  keywords: [
    'Flutter Developer',
    'Mobile Engineer',
    'Dart',
    'iOS Developer',
    'Android Developer',
    'Mobile App Development',
    'Clean Architecture',
    'BLoC Pattern',
    'Freelance Developer India',
  ],
  authors: [{ name: 'Mubashir Ahmed', url: 'https://mubashir.dev' }],
  creator: 'Mubashir Ahmed',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mubashir.dev',
    siteName: 'Mubashir Ahmed Portfolio',
    title: 'Mubashir Ahmed | Senior Flutter Engineer',
    description:
      'Senior Flutter Engineer with 6+ years building production mobile apps for millions of users.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mubashir Ahmed - Senior Flutter Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mubashir Ahmed | Senior Flutter Engineer',
    description:
      'Senior Flutter Engineer with 6+ years building production mobile apps.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mubashir Ahmed',
    jobTitle: 'Senior Flutter Engineer',
    description:
      'Mobile architect with 6+ years building production Flutter apps for millions of users.',
    url: 'https://mubashir.dev',
    email: 'getmemubashir@gmail.com',
    telephone: '+919562229979',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Wayanad',
      addressRegion: 'Kerala',
      addressCountry: 'India',
    },
    sameAs: [
      'https://linkedin.com/in/mubashir-ahmad',
      'https://github.com/mubashirspam',
    ],
    knowsAbout: [
      'Flutter',
      'Dart',
      'Mobile Development',
      'Clean Architecture',
      'BLoC Pattern',
      'React',
      'Next.js',
      'TypeScript',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
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
        <JsonLd />
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
