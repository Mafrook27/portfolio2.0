import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Copy, ExternalLink, Rss } from 'lucide-react';
import { useCollection, type ContentEntry } from '../../lib/content';
import { aiChatLinks, getCopyCount, incrementCopyCount } from './promptActions';

const PromptCard: React.FC<{ prompt: ContentEntry }> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);
  const [copyCount, setCopyCount] = useState(() => getCopyCount(prompt.slug));
  const links = aiChatLinks(prompt.body);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.body.trim());
    setCopyCount(incrementCopyCount(prompt.slug));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const preview = prompt.summary || prompt.body.replace(/[#*`>]/g, '').slice(0, 150).trim() + '…';

  return (
    <div className="desk-card rounded-xl p-5 sm:p-6 flex flex-col">
      <div className="flex items-center gap-2.5">
        <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-ink-soft/60">
          {prompt.category || 'General'}
        </span>
        {copyCount > 0 && (
          <span className="marker text-sm text-clay">copied {copyCount}×</span>
        )}
      </div>

      <h2 className="mt-1.5 font-sans font-extrabold text-lg text-ink leading-snug">{prompt.title}</h2>

      {/* Dashed prompt preview */}
      <div className="mt-3.5 rounded-lg border border-dashed border-line bg-paper-2/70 px-4 py-3.5 text-[12.5px] leading-relaxed text-ink-soft flex-1">
        {preview}
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 bg-clay hover:brightness-110 text-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-full shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? 'Copied!' : 'Copy prompt'}
        </button>
        <a
          href={links.claude}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 border border-line bg-paper-2 hover:bg-card text-ink-soft hover:text-clay font-bold text-[10px] uppercase tracking-wider px-3 py-2 rounded-full transition-all"
        >
          Claude <ExternalLink size={9} />
        </a>
        <a
          href={links.chatgpt}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 border border-line bg-paper-2 hover:bg-card text-ink-soft hover:text-clay font-bold text-[10px] uppercase tracking-wider px-3 py-2 rounded-full transition-all"
        >
          ChatGPT <ExternalLink size={9} />
        </a>
      </div>

      <Link
        to={`/prompts/${prompt.slug}`}
        className="marker mt-3.5 text-base text-ink-soft hover:text-clay transition-colors self-start"
      >
        read full prompt →
      </Link>
    </div>
  );
};

export const PromptsPage: React.FC = () => {
  const { entries, loading } = useCollection('prompts');
  const isLive = entries.some((entry) => entry.source === 'live');

  return (
    <main className="max-w-5xl mx-auto px-6 pt-28 sm:pt-32 pb-20 min-h-screen" dir="ltr">
      <header className="mb-10 sm:mb-14">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-ink-soft/60 mb-2">
          Battle-tested & self-used
        </p>
        <h1 className="font-sans font-black text-3xl sm:text-4xl text-ink tracking-tight">
          Prompt library<span className="text-clay">.</span>
        </h1>
        <p className="mt-3 text-sm text-ink-soft max-w-lg leading-relaxed">
          The prompts and skill specs I actually use in my daily developer workflow — copy them, or open
          them straight in Claude / ChatGPT.
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest text-ink-soft/50">
          <Rss size={10} className={isLive ? 'text-olive' : 'text-ink-soft/40'} />
          {loading ? 'Syncing from GitHub…' : isLive ? 'Live · synced from GitHub' : 'Bundled content'}
        </p>
      </header>

      {entries.length === 0 && !loading && (
        <p className="marker text-xl text-ink-soft text-center py-16">The prompt drawer is empty — for now!</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {entries.map((prompt) => (
          <PromptCard key={prompt.slug} prompt={prompt} />
        ))}
      </div>
    </main>
  );
};

export default PromptsPage;
