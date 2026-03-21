import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const postUrl = `https://mubashir.dev/blog/${post.id}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: postUrl },
    keywords: [...post.tags, 'Mubashir Ahmed', 'Flutter Developer', 'Mobile Development', 'Software Engineering'],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: 'article',
      publishedTime: post.date,
      authors: ['Mubashir Ahmed'],
      tags: post.tags,
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : [{ url: '/og-image.png', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : ['/og-image.png'],
      creator: '@mubashirahmed',
    },
  };
}

function ArticleJsonLd({ post }: { post: { id: string; title: string; excerpt: string; date: string; coverImage?: string; tags: string[] } }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      '@id': 'https://mubashir.dev/#person',
      name: 'Mubashir Ahmed',
      url: 'https://mubashir.dev',
    },
    publisher: {
      '@type': 'Person',
      '@id': 'https://mubashir.dev/#person',
      name: 'Mubashir Ahmed',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://mubashir.dev/blog/${post.id}`,
    },
    image: post.coverImage || 'https://mubashir.dev/og-image.png',
    keywords: post.tags.join(', '),
    url: `https://mubashir.dev/blog/${post.id}`,
    inLanguage: 'en-US',
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ArticleJsonLd post={post} />
      <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
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

          <h1 className="text-4xl sm:text-5xl font-bold font-display text-foreground mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-accent bg-accent-subtle border border-accent px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {post.coverImage && (
            <div className="relative w-full aspect-[2/1] mt-8 rounded-2xl overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: post.content
                .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
                  return `<pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto"><code class="language-${lang || 'text'}">${code.trim()}</code></pre>`;
                })
                .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>')
                .replace(/### (.*)/g, '<h3 class="text-xl font-bold text-foreground mt-6 mb-3">$1</h3>')
                .replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-foreground mt-8 mb-4">$1</h2>')
                .replace(/# (.*)/g, '<h1 class="text-3xl font-bold text-foreground mt-8 mb-4">$1</h1>')
                .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                .replace(/\*([^*]+)\*/g, '<em>$1</em>')
                .replace(/- (.*)/g, '<li class="text-muted-foreground">$1</li>')
                .replace(/(\d+\. (.*)\n)+/g, (match) => {
                  const items = match.split('\n').filter(Boolean).map(line => line.replace(/^\d+\.\s/, ''));
                  return `<ol class="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">${items.map(item => `<li>${item}</li>`).join('')}</ol>`;
                })
                .replace(/(<li.*<\/li>\n)+/g, '<ul class="list-disc list-inside space-y-2 mb-4 text-muted-foreground">$&</ul>')
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
                .replace(/> (.*)/g, '<blockquote class="border-l-4 pl-4 italic text-muted-foreground my-4" style="border-color: var(--accent-color)">$1</blockquote>')
                .replace(/\n\n/g, '</p><p class="text-base text-muted-foreground leading-relaxed mb-4">')
                .replace(/^(.*)/, '<p class="text-base text-muted-foreground leading-relaxed mb-4">$1</p>')
            }}
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Articles
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Get in Touch →
            </Link>
          </div>
        </footer>
      </article>
    </main>
    </>
  );
}
