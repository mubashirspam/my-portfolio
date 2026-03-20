'use client';

const navLinks = [
  { label: 'Home', href: '#cinematic-hero', active: true },
  { label: 'Studio', href: '#projects' },
  { label: 'About', href: '#bio' },
  { label: 'Journal', href: '#blog' },
  { label: 'Reach Us', href: '#contact' },
];

export function CinematicHero() {
  return (
    <section id="cinematic-hero" className="cinematic-hero relative min-h-screen overflow-hidden">
      {/* Fullscreen Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      {/* Navigation */}
      <nav className="relative z-10">
        <div className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          {/* Logo */}
          <a
            href="#cinematic-hero"
            className="text-3xl tracking-tight text-[--ch-fg]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Velorah<sup className="text-xs">&reg;</sup>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm transition-colors ${
                  link.active
                    ? 'text-[--ch-fg]'
                    : 'text-[--ch-muted-fg] hover:text-[--ch-fg]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="liquid-glass rounded-full px-6 py-2.5 text-sm text-[--ch-fg] hover:scale-[1.03] transition-transform cursor-pointer"
          >
            Begin Journey
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40 py-[90px]">
        <h1
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal animate-ch-fade-rise"
          style={{ fontFamily: "'Instrument Serif', serif", color: 'var(--ch-fg)' }}
        >
          Where <em className="not-italic text-[--ch-muted-fg]">dreams</em> rise{' '}
          <em className="not-italic text-[--ch-muted-fg]">through the silence.</em>
        </h1>

        <p className="text-[--ch-muted-fg] text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-ch-fade-rise-delay">
          We&apos;re designing tools for deep thinkers, bold creators, and quiet rebels.
          Amid the chaos, we build digital spaces for sharp focus and inspired work.
        </p>

        <a
          href="#bio"
          className="liquid-glass rounded-full px-14 py-5 text-base text-[--ch-fg] mt-12 hover:scale-[1.03] transition-transform cursor-pointer animate-ch-fade-rise-delay-2"
        >
          Begin Journey
        </a>
      </div>
    </section>
  );
}
