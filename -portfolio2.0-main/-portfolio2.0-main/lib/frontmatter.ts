// Minimal YAML-subset frontmatter parser (no Buffer/node deps, browser safe).
// Supports: strings, quoted strings, numbers, booleans,
// inline arrays `[a, b]` and dashed lists.

export interface ParsedDocument {
  meta: Record<string, any>;
  body: string;
}

const coerce = (raw: string): any => {
  const value = raw.trim();
  if (value === '') return '';
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => coerce(item))
      .filter((item) => item !== '');
  }
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
};

export function parseFrontmatter(raw: string): ParsedDocument {
  const normalized = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return { meta: {}, body: normalized };
  }

  const end = normalized.indexOf('\n---', 4);
  if (end === -1) {
    return { meta: {}, body: normalized };
  }

  const header = normalized.slice(4, end);
  const body = normalized.slice(end + 4).replace(/^\n+/, '');
  const meta: Record<string, any> = {};

  let currentListKey: string | null = null;
  for (const line of header.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const listItem = line.match(/^\s+-\s+(.*)$/);
    if (listItem && currentListKey) {
      (meta[currentListKey] as any[]).push(coerce(listItem[1]));
      continue;
    }

    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!pair) continue;

    const [, key, value] = pair;
    if (value.trim() === '') {
      meta[key] = [];
      currentListKey = key;
    } else {
      meta[key] = coerce(value);
      currentListKey = null;
    }
  }

  return { meta, body };
}
