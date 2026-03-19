'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { InteractiveTerminal } from './InteractiveTerminal';

export function TerminalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#7C3AED_0%,transparent_50%)] opacity-[0.04] dark:bg-[radial-gradient(circle_at_30%_20%,#7C3AED_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,#7C3AED_0%,transparent_50%)] opacity-[0.04] dark:bg-[radial-gradient(circle_at_70%_80%,#7C3AED_0%,transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: "linear-gradient(rgba(148, 163, 184, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.3) 1px, transparent 1px)",
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          <span
            className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
          >
            Available for freelance projects
          </span>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
          className="w-full"
        >
          <InteractiveTerminal />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.6,
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <a
            href="/projects"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 bg-purple-600 hover:bg-purple-700"
          >
            <span className="relative z-10">View My Work</span>
          </a>
          <a
            href="https://topmate.io/mubashir_ahammed"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-foreground bg-surface border-2 border-border rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Book a Call
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.8,
          }}
          className="flex items-center justify-center gap-5 mt-8"
        >
          {[
            {
              icon: Github,
              href: 'https://github.com/mubashirspam',
              label: 'GitHub',
            },
            {
              icon: Linkedin,
              href: 'https://linkedin.com/in/mubashir-ahmad',
              label: 'LinkedIn',
            },
            {
              icon: Mail,
              href: 'mailto:getmemubashir@gmail.com',
              label: 'Email',
            },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#projects"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="text-xs font-medium tracking-wider uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
