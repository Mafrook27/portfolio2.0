import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CodeBlock } from './CodeBlock';

let renderCounter = 0;

// Renders a ```mermaid fenced block as an SVG diagram. The mermaid library
// (~large) is imported lazily so it never weighs down the initial bundle.
export const Mermaid: React.FC<{ chart: string }> = ({ chart }) => {
  const { theme } = useTheme();
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    setFailed(false);

    import('mermaid')
      .then(async ({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: theme === 'dark' ? 'dark' : 'neutral',
          fontFamily: 'Sora, system-ui, sans-serif',
        });
        const { svg: rendered } = await mermaid.render(`mermaid-${renderCounter++}`, chart);
        if (active) setSvg(rendered);
      })
      .catch(() => {
        if (active) setFailed(true);
      });

    return () => {
      active = false;
    };
  }, [chart, theme]);

  if (failed) return <CodeBlock code={chart} language="mermaid" />;

  return (
    <div className="md-mermaid my-6 rounded-lg border border-line bg-card p-4 overflow-x-auto" dir="ltr">
      {svg ? (
        <div className="flex justify-center [&_svg]:max-w-full [&_svg]:h-auto" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className="flex items-center justify-center py-10 text-[10px] font-mono uppercase tracking-widest text-ink-soft/60 animate-pulse">
          Rendering diagram…
        </div>
      )}
    </div>
  );
};

export default Mermaid;
