import type { Metadata } from 'next';
import { ProjectsPageClient } from './ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore mobile apps and web projects built by Mubashir Ahmed. Flutter, React, and full-stack applications.',
};

export default function ProjectsPage() {
  return (
    <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold font-display text-foreground mb-4">
            Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A collection of apps and products I&apos;ve built. From e-learning
            platforms to healthcare solutions.
          </p>
        </div>

        <ProjectsPageClient />
      </div>
    </main>
  );
}
