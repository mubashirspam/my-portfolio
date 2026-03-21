import { CinematicHero } from '@/components/hero/CinematicHero';
import { BioSection } from '@/components/sections/BioSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ProjectsCarousel } from '@/components/sections/ProjectsCarousel';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { QuoteSection } from '@/components/sections/QuoteSection';
import { RolesSection } from '@/components/sections/RolesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FlutterPlayground } from '@/components/FlutterPlayground';
import { FloatingTerminal } from '@/components/FloatingTerminal';
import { ParticleField } from '@/components/ParticleField';

export default function HomePage() {
  return (
    <main className="relative">
      <ParticleField />
      <CinematicHero />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="bio">
          <BioSection />
        </div>
        <div id="stats">
          <StatsSection />
        </div>
        <div id="projects">
          <ProjectsCarousel />
        </div>
        <div id="techstack">
          <TechStackSection />
        </div>
        <div id="experience">
          <ExperienceSection />
        </div>
        <div id="expertise">
          <QuoteSection />
        </div>
        <div id="roles">
          <RolesSection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <div id="flutter-playground">
          <FlutterPlayground />
        </div>
        <div id="blog">
          <BlogSection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </div>

      <FloatingTerminal />
    </main>
  );
}
