import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';
import { Mermaid } from './Mermaid';

interface MarkdownRendererProps {
  markdown: string;
  /** Base URL for resolving relative image paths (e.g. GitHub raw folder). */
  assetBaseUrl?: string;
}

const extractText = (node: React.ReactNode): string => {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node)) return extractText((node.props as any).children);
  return '';
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown, assetBaseUrl }) => {
  const resolveSrc = (src?: string) => {
    if (!src) return src;
    if (/^(https?:|data:|\/)/.test(src)) return src;
    return assetBaseUrl ? assetBaseUrl + src.replace(/^\.\//, '') : src;
  };

  return (
    <div className="md-prose" dir="ltr">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ children }) {
            const child = React.Children.toArray(children)[0];
            if (React.isValidElement(child)) {
              const className: string = (child.props as any).className || '';
              const language = /language-([\w-]+)/.exec(className)?.[1];
              const code = extractText((child.props as any).children).replace(/\n$/, '');
              if (language === 'mermaid') return <Mermaid chart={code} />;
              return <CodeBlock code={code} language={language} />;
            }
            return <pre>{children}</pre>;
          },
          img({ src, alt }) {
            return (
              <img
                src={resolveSrc(typeof src === 'string' ? src : undefined)}
                alt={alt || ''}
                loading="lazy"
                className="md-img"
              />
            );
          },
          a({ href, children }) {
            const isExternal = href?.startsWith('http');
            return (
              <a href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}>
                {children}
              </a>
            );
          },
          table({ children }) {
            return (
              <div className="md-table-wrap">
                <table>{children}</table>
              </div>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
