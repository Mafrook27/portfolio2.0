import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Copy, ExternalLink } from 'lucide-react';
import { useCollection, assetBase } from '../../lib/content';
import { MarkdownRenderer } from '../../components/markdown/MarkdownRenderer';
import { aiChatLinks, incrementCopyCount } from './promptActions';

export const PromptDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { entries, loading } = useCollection('prompts');
  const prompt = entries.find((entry) => entry.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!prompt) {
    return (
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20 min-h-screen text-center" dir="ltr">
        {loading ? (
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-ink-soft/60 animate-pulse py-20">
            Loading prompt…
          </p>
        ) : (
          <>
            <p className="marker text-2xl text-clay">Couldn't find that prompt in the drawer.</p>
            <Link
              to="/prompts"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-soft hover:text-clay transition-colors"
            >
              <ArrowLeft size={12} /> All prompts
            </Link>
          </>
        )}
      </main>
    );
  }

  const links = aiChatLinks(prompt.body);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.body.trim());
    incrementCopyCount(prompt.slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="max-w-3xl mx-auto px-5 sm:px-6 pt-28 sm:pt-32 pb-20 min-h-screen" dir="ltr">
      <Link
        to="/prompts"
        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-ink-soft hover:text-clay transition-colors"
      >
        <ArrowLeft size={12} /> All prompts
      </Link>

      <header className="mt-5 mb-8 pb-8 border-b border-dashed border-line">
        <p className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-ink-soft/60">
          {prompt.category || 'General'}
        </p>
        <h1 className="mt-2 font-sans font-black text-2xl sm:text-3xl text-ink tracking-tight leading-tight">
          {prompt.title}
        </h1>
        {prompt.summary && <p className="mt-3 text-sm text-ink-soft leading-relaxed">{prompt.summary}</p>}

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-clay hover:brightness-110 text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-full shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            {copied ? <Check size={11} /> : <Copy size={11} />}
            {copied ? 'Copied!' : 'Copy full prompt'}
          </button>
          <a
            href={links.claude}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 border border-line bg-paper-2 hover:bg-card text-ink-soft hover:text-clay font-bold text-[10px] uppercase tracking-wider px-3 py-2 rounded-full transition-all"
          >
            Open in Claude <ExternalLink size={9} />
          </a>
          <a
            href={links.chatgpt}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 border border-line bg-paper-2 hover:bg-card text-ink-soft hover:text-clay font-bold text-[10px] uppercase tracking-wider px-3 py-2 rounded-full transition-all"
          >
            Open in ChatGPT <ExternalLink size={9} />
          </a>
        </div>
      </header>

      <article>
        <MarkdownRenderer markdown={prompt.body} assetBaseUrl={assetBase('prompts')} />
      </article>
    </main>
  );
};

export default PromptDetailPage;
