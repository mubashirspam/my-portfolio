import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-bold font-display text-foreground mb-4">
        404
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-full transition-colors"
        style={{ backgroundColor: 'var(--accent-color)' }}
      >
        Go Home
      </Link>
    </main>
  );
}
