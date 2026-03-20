import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FlutterPlaygroundFull } from '@/components/FlutterPlayground/FlutterPlaygroundFull';

export const metadata: Metadata = {
  title: 'Flutter Playground - Mubashir Ahmed',
  description:
    '30 real-world Flutter concepts — games, 3D, animations & more. Interactive demos with Flutter/Dart source code.',
};

export default function FlutterPlaygroundPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <span className="block mb-3">
            <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider text-accent bg-accent-subtle border border-accent rounded-full backdrop-blur-sm">
              FLUTTER PLAYGROUND
            </span>
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold font-display text-foreground mb-4">
            Flutter Playground
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            30 real-world Flutter concepts — games, 3D, animations &amp; more.
            Each card has a live animated preview and Flutter/Dart source code.
          </p>
        </div>

        <FlutterPlaygroundFull />
      </div>
    </main>
  );
}
