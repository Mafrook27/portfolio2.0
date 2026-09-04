// Content engine — no backend required.
//
// Markdown lives in /content/{blog,prompts}. Files bundled at build time are
// the fallback; at runtime the same folders are re-fetched straight from
// GitHub, so pushing a new .md file updates the live site without a rebuild.
import { useEffect, useState } from 'react';
import { parseFrontmatter } from './frontmatter';
import siteConfig from '../content/site.json';

export type CollectionName = 'blog' | 'prompts';

export interface ContentEntry {
  slug: string;
  title: string;
  date?: string;
  category?: string;
  summary?: string;
  tags: string[];
  order?: number;
  body: string;
  readingMinutes: number;
  /** 'bundled' = shipped with the build, 'live' = fetched from GitHub */
  source: 'bundled' | 'live';
}

const bundledFiles: Record<CollectionName, Record<string, string>> = {
  blog: import.meta.glob('../content/blog/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  }) as Record<string, string>,
  prompts: import.meta.glob('../content/prompts/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  }) as Record<string, string>,
};

const { owner, repo, branch, contentDir, liveFetch, cacheMinutes } = siteConfig;

/** Base URL for resolving relative images inside markdown files. */
export function assetBase(collection: CollectionName): string {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${contentDir}/${collection}/`;
}

function toEntry(fileName: string, raw: string, source: ContentEntry['source']): ContentEntry | null {
  const { meta, body } = parseFrontmatter(raw);
  if (meta.draft === true) return null;

  const slug = fileName.replace(/\.md$/, '');
  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: typeof meta.title === 'string' && meta.title ? meta.title : slug.replace(/[-_]/g, ' '),
    date: typeof meta.date === 'string' ? meta.date : undefined,
    category: typeof meta.category === 'string' ? meta.category : undefined,
    summary: typeof meta.summary === 'string' ? meta.summary : (typeof meta.description === 'string' ? meta.description : undefined),
    tags: Array.isArray(meta.tags) ? meta.tags.map(String) : [],
    order: typeof meta.order === 'number' ? meta.order : undefined,
    body,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    source,
  };
}

function sortEntries(collection: CollectionName, entries: ContentEntry[]): ContentEntry[] {
  if (collection === 'blog') {
    return entries.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }
  return entries.sort((a, b) => {
    const byOrder = (a.order ?? 999) - (b.order ?? 999);
    return byOrder !== 0 ? byOrder : a.title.localeCompare(b.title);
  });
}

function bundledEntries(collection: CollectionName): ContentEntry[] {
  const entries = Object.entries(bundledFiles[collection])
    .map(([path, raw]) => toEntry(path.split('/').pop() as string, raw, 'bundled'))
    .filter((entry): entry is ContentEntry => entry !== null);
  return sortEntries(collection, entries);
}

// ---------------------------------------------------------------------------
// Live fetch from GitHub (public repo, unauthenticated, sessionStorage cache)
// ---------------------------------------------------------------------------

interface CachePayload {
  fetchedAt: number;
  files: Record<string, string>;
}

function readCache(collection: CollectionName): CachePayload | null {
  try {
    const raw = sessionStorage.getItem(`content:${collection}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachePayload;
    if (Date.now() - parsed.fetchedAt > cacheMinutes * 60_000) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(collection: CollectionName, files: Record<string, string>) {
  try {
    sessionStorage.setItem(
      `content:${collection}`,
      JSON.stringify({ fetchedAt: Date.now(), files } satisfies CachePayload),
    );
  } catch {
    // Storage full/unavailable — live data still renders, it just isn't cached.
  }
}

async function fetchLiveFiles(collection: CollectionName): Promise<Record<string, string> | null> {
  const cached = readCache(collection);
  if (cached) return cached.files;

  const listUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${contentDir}/${collection}?ref=${branch}`;
  const response = await fetch(listUrl, { headers: { Accept: 'application/vnd.github+json' } });
  if (!response.ok) return null;

  const listing = (await response.json()) as Array<{ name: string; download_url: string | null; type: string }>;
  const markdownFiles = listing.filter((item) => item.type === 'file' && item.name.endsWith('.md') && item.download_url);

  const files: Record<string, string> = {};
  await Promise.all(
    markdownFiles.slice(0, 60).map(async (item) => {
      const fileResponse = await fetch(item.download_url as string);
      if (fileResponse.ok) files[item.name] = await fileResponse.text();
    }),
  );

  if (Object.keys(files).length === 0) return null;
  writeCache(collection, files);
  return files;
}

export async function loadCollection(collection: CollectionName): Promise<ContentEntry[]> {
  if (liveFetch) {
    try {
      const files = await fetchLiveFiles(collection);
      if (files) {
        const entries = Object.entries(files)
          .map(([name, raw]) => toEntry(name, raw, 'live'))
          .filter((entry): entry is ContentEntry => entry !== null);
        if (entries.length > 0) return sortEntries(collection, entries);
      }
    } catch {
      // Network/rate-limit issues — fall through to the bundled copy.
    }
  }
  return bundledEntries(collection);
}

// ---------------------------------------------------------------------------
// React hook
// ---------------------------------------------------------------------------

export function useCollection(collection: CollectionName) {
  const [entries, setEntries] = useState<ContentEntry[]>(() => bundledEntries(collection));
  const [loading, setLoading] = useState(liveFetch);

  useEffect(() => {
    let active = true;
    setEntries(bundledEntries(collection));

    if (!liveFetch) {
      setLoading(false);
      return;
    }

    setLoading(true);
    loadCollection(collection).then((result) => {
      if (!active) return;
      setEntries(result);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [collection]);

  return { entries, loading };
}
