'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog';

const cardAccents = [
  { top: 'from-violet-500 to-purple-500', border: 'border-violet-500/15', bg: 'from-violet-500/5 to-transparent', color: '#8b5cf6' },
  { top: 'from-blue-500 to-cyan-500', border: 'border-blue-500/15', bg: 'from-blue-500/5 to-transparent', color: '#3b82f6' },
  { top: 'from-emerald-500 to-green-500', border: 'border-emerald-500/15', bg: 'from-emerald-500/5 to-transparent', color: '#10b981' },
  { top: 'from-amber-500 to-orange-500', border: 'border-amber-500/15', bg: 'from-amber-500/5 to-transparent', color: '#f59e0b' },
];

export function BlogSection() {
  const featured = blogPosts.filter((p) => p.featured);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <SectionBadge label="LATEST ARTICLES" />
      <h2 className="text-4xl sm:text-5xl font-normal text-foreground mt-3 mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>
        From the Journal
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featured.map((post, index) => {
          const accent = cardAccents[index % cardAccents.length];
          return (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`group rounded-2xl border ${accent.border} bg-gradient-to-b ${accent.bg} backdrop-blur-xl relative overflow-hidden cursor-pointer`}
            >
              {/* Top color accent bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${accent.top}`} />

              <div className="p-6">
                {post.coverImage && (
                  <div className="relative w-full h-40 -mx-6 -mt-6 mb-4 overflow-hidden" style={{ width: 'calc(100% + 3rem)' }}>
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Gradient fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>
                )}
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold font-display text-foreground group-hover:text-accent transition-colors line-clamp-2 mb-3">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime} min read
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-foreground/70 bg-foreground/5 border border-foreground/5 px-2.5 py-1 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent group/link"
                  >
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Hover shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 text-center"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-accent hover:gap-3 transition-all"
        >
          View All Articles
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.section>
  );
}

function SectionBadge({ label }: { label: string }) {
  return (
    <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider text-accent bg-accent-subtle border border-accent rounded-full backdrop-blur-sm">
      {label}
    </span>
  );
}
