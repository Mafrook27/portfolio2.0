import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Rss } from 'lucide-react';
import { useCollection } from '../../lib/content';

const formatDate = (date?: string) => {
  if (!date) return '';
  const parsed = new Date(date);
  return isNaN(parsed.getTime())
    ? date
    : parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const BlogListPage: React.FC = () => {
  const { entries, loading } = useCollection('blog');
  const isLive = entries.some((entry) => entry.source === 'live');

  return (
    <main className="max-w-3xl mx-auto px-6 pt-28 sm:pt-32 pb-20 min-h-screen" dir="ltr">
      {/* Page heading */}
      <header className="mb-10 sm:mb-14">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-ink-soft/60 mb-2">
          Personal notes
        </p>
        <h1 className="font-sans font-black text-3xl sm:text-4xl text-ink tracking-tight">
          Blog<span className="text-clay">.</span>
        </h1>
        <p className="mt-3 text-sm text-ink-soft max-w-md leading-relaxed">
          Thoughts on building software, developer workflow and things I learn along the way.
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest text-ink-soft/50">
          <Rss size={10} className={isLive ? 'text-olive' : 'text-ink-soft/40'} />
          {loading ? 'Syncing from GitHub…' : isLive ? 'Live · synced from GitHub' : 'Bundled content'}
        </p>
      </header>

      {/* Post list */}
      {entries.length === 0 && !loading && (
        <p className="marker text-xl text-ink-soft text-center py-16">Nothing written yet — check back soon!</p>
      )}

      <div className="space-y-5">
        {entries.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="desk-card group block rounded-xl p-5 sm:p-6 hover:-translate-y-0.5 transition-transform"
          >
            <div className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-widest text-ink-soft/60">
              <span className="marker text-sm normal-case tracking-normal text-clay">{formatDate(post.date)}</span>
              <span className="h-3 w-px bg-line"></span>
              <span className="flex items-center gap-1">
                <Clock size={10} />
                {post.readingMinutes} min read
              </span>
            </div>
            <h2 className="mt-2 font-sans font-extrabold text-lg sm:text-xl text-ink group-hover:text-clay transition-colors leading-snug">
              {post.title}
            </h2>
            {post.summary && (
              <p className="mt-2 text-[13px] text-ink-soft leading-relaxed line-clamp-3">{post.summary}</p>
            )}
            {post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
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
          </Link>
        ))}
      </div>
    </main>
  );
};

export default BlogListPage;
