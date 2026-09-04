import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { useCollection, assetBase } from '../../lib/content';
import { MarkdownRenderer } from '../../components/markdown/MarkdownRenderer';

const formatDate = (date?: string) => {
  if (!date) return '';
  const parsed = new Date(date);
  return isNaN(parsed.getTime())
    ? date
    : parsed.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { entries, loading } = useCollection('blog');
  const post = entries.find((entry) => entry.slug === slug);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20 min-h-screen text-center" dir="ltr">
        {loading ? (
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-ink-soft/60 animate-pulse py-20">
            Loading post…
          </p>
        ) : (
          <>
            <p className="marker text-2xl text-clay">This page seems to have fallen off the desk.</p>
            <Link
              to="/blog"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-soft hover:text-clay transition-colors"
            >
              <ArrowLeft size={12} /> All posts
            </Link>
          </>
        )}
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-5 sm:px-6 pt-28 sm:pt-32 pb-20 min-h-screen" dir="ltr">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-ink-soft hover:text-clay transition-colors"
      >
        <ArrowLeft size={12} /> All posts
      </Link>

      <header className="mt-5 mb-8 pb-8 border-b border-dashed border-line">
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-widest text-ink-soft/60">
          <span className="marker text-base normal-case tracking-normal text-clay">{formatDate(post.date)}</span>
          <span className="h-3 w-px bg-line"></span>
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {post.readingMinutes} min read
          </span>
        </div>
        <h1 className="mt-3 font-sans font-black text-2xl sm:text-4xl text-ink tracking-tight leading-tight">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-bold uppercase tracking-wider text-ink-soft bg-paper-2 border border-line rounded-full px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <article>
        <MarkdownRenderer markdown={post.body} assetBaseUrl={assetBase('blog')} />
      </article>

      <footer className="mt-14 pt-8 border-t border-dashed border-line flex justify-between items-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-ink-soft hover:text-clay transition-colors"
        >
          <ArrowLeft size={12} /> All posts
        </Link>
        <p className="marker text-lg text-clay">— mafrook</p>
      </footer>
    </main>
  );
};

export default BlogPostPage;
