import { TerminalHero } from '@/components/hero';
import { BioSection } from '@/components/sections/BioSection';
import { ProjectsCarousel } from '@/components/sections/ProjectsCarousel';
import { QuoteSection } from '@/components/sections/QuoteSection';
import { RolesSection } from '@/components/sections/RolesSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <main>
      <TerminalHero />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BioSection />
        <ProjectsCarousel />
        <QuoteSection />
        <RolesSection />
        <BlogSection />
        <ContactSection />
      </div>
    </main>
  );
}
