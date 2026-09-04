import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, CornerDownLeft, FileText, FolderGit2, Terminal, PenLine } from 'lucide-react';
import { projects } from '../../lib/data';
import { useCollection } from '../../lib/content';
import { useLanguage } from '../../context/LanguageContext';

interface SearchOverlayProps {
  onClose: () => void;
}

interface SearchItem {
  id: string;
  group: string;
  title: string;
  subtitle?: string;
  href: string;
  keywords: string;
}

const groupIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Projects: FolderGit2,
  Prompts: Terminal,
  Blog: PenLine,
};

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { entries: blogEntries } = useCollection('blog');
  const { entries: promptEntries } = useCollection('prompts');

  const index = useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [];

    projects.forEach((project, i) =>
      items.push({
        id: `project-${i}`,
        group: 'Projects',
        title: project.title,
        subtitle: project.technologies.join(' · '),
        href: '/#projects',
        keywords: `${project.title} ${project.desc} ${project.technologies.join(' ')}`.toLowerCase(),
      }),
    );

    promptEntries.forEach((prompt) =>
      items.push({
        id: `prompt-${prompt.slug}`,
        group: 'Prompts',
        title: prompt.title,
        subtitle: prompt.category,
        href: `/prompts/${prompt.slug}`,
        keywords: `${prompt.title} ${prompt.category ?? ''} ${prompt.summary ?? ''} ${prompt.tags.join(' ')}`.toLowerCase(),
      }),
    );

    blogEntries.forEach((post) =>
      items.push({
        id: `blog-${post.slug}`,
        group: 'Blog',
        title: post.title,
        subtitle: post.date,
        href: `/blog/${post.slug}`,
        keywords: `${post.title} ${post.summary ?? ''} ${post.tags.join(' ')}`.toLowerCase(),
      }),
    );

    return items;
  }, [blogEntries, promptEntries]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 12);
    return index
      .map((item) => {
        let score = 0;
        if (item.title.toLowerCase().startsWith(q)) score = 3;
        else if (item.title.toLowerCase().includes(q)) score = 2;
        else if (item.keywords.includes(q)) score = 1;
        return { item, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.item)
      .slice(0, 16);
  }, [query, index]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const goTo = (item: SearchItem) => {
    onClose();
    navigate(item.href.startsWith('/#') ? { pathname: '/', hash: item.href.slice(1) } : item.href);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') onClose();
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
    if (event.key === 'Enter' && results[activeIndex]) {
      goTo(results[activeIndex]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[70] bg-ink/25 backdrop-blur-[3px] flex items-start justify-center px-4 pt-[12vh]"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -14, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        className="w-full max-w-lg bg-card border border-line rounded-2xl shadow-2xl overflow-hidden"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-label={t.search}
      >
        {/* Input row */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-line" dir="ltr">
          <Search size={15} className="text-clay shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, prompts, blog…"
            className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-ink-soft/50 font-medium"
          />
          <button
            onClick={onClose}
            className="text-[9px] font-mono font-bold border border-line rounded px-1.5 py-0.5 text-ink-soft/60 hover:text-ink cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[46vh] overflow-y-auto py-2" dir="ltr">
          {results.length === 0 && (
            <p className="px-4 py-6 text-center text-xs text-ink-soft/60 font-medium">
              Nothing found for “{query}”
            </p>
          )}
          {results.map((item, i) => {
            const Icon = groupIcons[item.group] || FileText;
            return (
              <button
                key={item.id}
                onClick={() => goTo(item)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer ${
                  i === activeIndex ? 'bg-paper-2' : ''
                }`}
              >
                <span className="w-7 h-7 rounded-lg border border-line bg-paper-2 flex items-center justify-center shrink-0">
                  <Icon size={13} className="text-clay" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-bold text-ink truncate">{item.title}</span>
                  {item.subtitle && (
                    <span className="block text-[10.5px] text-ink-soft/70 truncate">{item.subtitle}</span>
                  )}
                </span>
                <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider text-ink-soft/50 shrink-0">
                  {item.group}
                </span>
                {i === activeIndex && <CornerDownLeft size={12} className="text-ink-soft/50 shrink-0" />}
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchOverlay;
