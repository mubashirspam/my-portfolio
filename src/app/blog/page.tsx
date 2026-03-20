import { Metadata } from 'next';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog - Mubashir Ahmed',
  description: 'Articles about Flutter, React, and web development',
};

export default function BlogPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-foreground mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Thoughts on software development, architecture, and best practices
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl border border-border bg-surface/70 backdrop-blur-xl p-8 relative overflow-hidden hover:shadow-xl hover:shadow-accent transition-all duration-300"
            >
              <div className="absolute inset-0 gradient-accent-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {post.coverImage && (
                <div className="relative w-full aspect-[2.5/1] -m-8 mb-0 overflow-hidden rounded-t-2xl" style={{ width: 'calc(100% + 4rem)' }}>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                </div>
              )}

              <div className="relative z-10 pt-6">
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readTime} min read
                  </div>
                </div>

                <Link href={`/blog/${post.id}`}>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground group-hover:text-accent transition-colors mb-3">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-base text-muted-foreground mb-6">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-foreground/70 bg-muted/50 backdrop-blur-sm border border-border px-3 py-1.5 rounded-lg hover:bg-accent-subtle hover:text-accent transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent transition-colors"
                >
                  Read Full Article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
