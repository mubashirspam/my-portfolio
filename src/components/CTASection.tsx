'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-surface/60 backdrop-blur-xl rounded-3xl border border-border p-12 sm:p-16 text-center overflow-hidden shadow-2xl"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 dark:from-purple-500/20 dark:via-blue-500/20 dark:to-pink-500/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.15),transparent_50%)]" />
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-4">
              Let&apos;s build something great together
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Looking for a Flutter engineer to bring your app idea to life? I&apos;m
              available for freelance projects and full-time opportunities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-3.5 text-base font-semibold text-foreground bg-surface/80 backdrop-blur-sm border-2 border-border rounded-full hover:border-purple-500/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Learn More About Me
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
