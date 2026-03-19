'use client';

import { motion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap, Download } from 'lucide-react';
import { experiences, skills } from '@/data/experience';

export function AboutPageClient() {
  return (
    <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex flex-col sm:flex-row items-start gap-8">
            {/* Avatar placeholder */}
            <div className="w-28 h-28 rounded-2xl bg-muted flex items-center justify-center shrink-0">
              <span className="text-3xl font-bold font-display text-muted-foreground">
                MA
              </span>
            </div>

            <div>
              <h1 className="text-4xl font-bold font-display text-foreground mb-2">
                Mubashir Ahmed
              </h1>
              <p className="text-lg text-muted-foreground mb-3">
                Senior Flutter Engineer & Mobile Architect
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  Wayanad, Kerala, India
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  6+ years experience
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  B.Tech, GEC Wayanad
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* About text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold font-display text-foreground mb-4">
            About Me
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a Senior Flutter Engineer with over 6 years of experience
              building production-grade mobile applications. I specialize in
              Clean Architecture, BLoC pattern, and creating scalable mobile
              solutions that serve millions of users.
            </p>
            <p>
              Throughout my career, I&apos;ve worked on diverse projects ranging from
              e-learning platforms with 600K+ downloads to healthcare
              applications with real-time IoT integration. I&apos;m passionate about
              writing clean, testable code and implementing robust architectural
              patterns.
            </p>
            <p>
              When I&apos;m not coding, I enjoy exploring new technologies,
              contributing to open-source projects, and mentoring junior
              developers. I&apos;m currently available for freelance projects and
              remote opportunities.
            </p>
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold font-display text-foreground mb-8">
            Experience
          </h2>
          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 pb-10 last:pb-0">
                {/* Timeline line */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-[11px] top-3 bottom-0 w-px bg-border" />
                )}
                {/* Dot */}
                <div className="absolute left-0 top-2 w-[23px] h-[23px] rounded-full border-2 border-border bg-background" />

                <div className="bg-surface/50 rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {exp.title}
                    </h3>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {exp.company}, {exp.location}
                    <span className="opacity-60"> · {exp.type}</span>
                  </p>
                  <ul className="space-y-1.5">
                    {exp.highlights.map((highlight, hIndex) => (
                      <li
                        key={hIndex}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold font-display text-foreground mb-8">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((group) => (
              <div
                key={group.category}
                className="bg-surface/50 rounded-xl border border-border p-6"
              >
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm text-muted-foreground bg-muted border border-border px-3 py-1.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Download Resume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white rounded-full transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--accent-color)' }}
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </motion.div>
      </div>
    </main>
  );
}
