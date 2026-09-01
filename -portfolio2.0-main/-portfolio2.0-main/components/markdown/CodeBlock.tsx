import React, { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import hljs from 'highlight.js/lib/common';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const highlighted = useMemo(() => {
    try {
      if (language && hljs.getLanguage(language)) {
        return hljs.highlight(code, { language }).value;
      }
      return hljs.highlightAuto(code).value;
    } catch {
      return null;
    }
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="md-codeblock group relative my-5 rounded-lg border border-line bg-paper-2 overflow-hidden" dir="ltr">
      <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-line/60">
        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-ink-soft/70">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-ink-soft hover:text-clay transition-colors cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? <Check size={11} className="text-olive" /> : <Copy size={11} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-relaxed font-mono">
        {highlighted !== null ? (
          <code className="hljs-body" dangerouslySetInnerHTML={{ __html: highlighted }} />
        ) : (
          <code className="hljs-body">{code}</code>
        )}
      </pre>
    </div>
  );
};

export default CodeBlock;
