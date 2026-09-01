# mafrook.dev — Portfolio 2.0

Personal portfolio with a self-updating blog and prompt library. **No backend, no CMS** — all content is plain files in this repo, fetched live by the browser.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Home — hero, about, skills, experience, projects, certifications |
| `/prompts` | Prompt library — reusable AI prompts with copy / open-in-Claude / open-in-ChatGPT |
| `/prompts/:slug` | Full prompt view (markdown) |
| `/blog` | Blog index |
| `/blog/:slug` | Post view — markdown with Mermaid diagrams, syntax-highlighted code, images, tables |

Global search: press **Ctrl/Cmd + K** anywhere (indexes sections, projects, skills, certifications, prompts and posts).

## ✍️ Updating content (no code!)

Everything editable lives in [`content/`](content/). Push a file (or edit on github.com — even from your phone) and the live site picks it up **without a redeploy**: the browser re-fetches the `content/` folder from GitHub raw (10-minute cache), falling back to the copies bundled at build time if GitHub is unreachable.

### Add a blog post

Create `content/blog/my-post-slug.md`:

```markdown
---
title: My Post Title
date: 2026-08-01
summary: One-liner shown in the blog list.
tags: [react, thoughts]
---

Body in normal markdown. Code fences get highlighting,
mermaid fences render as diagrams, images work too.
```

- File name = URL slug (`/blog/my-post-slug`)
- `draft: true` in frontmatter hides a post
- Images: put them in `content/blog/` and reference relatively (`![alt](diagram.png)`), or use absolute URLs

### Add a prompt

Create `content/prompts/my-prompt.md`:

```markdown
---
title: My Prompt Name
category: Development
summary: What this prompt does, shown on the card.
tags: [review]
order: 5
---

The prompt text itself (markdown). This whole body is what
"Copy prompt" copies and what opens in Claude / ChatGPT.
```

### Add a project / skill / certification / experience

Edit the matching JSON in `content/data/`:

- `projects.json`, `skills.json`, `certifications.json`, `experience.json`, `education.json`, `socials.json`
- `icon` is a string name resolved via `lib/icons.ts` (any name already registered there; unknown names fall back to a code icon). To use a brand-new icon, add one line to the registry in `lib/icons.ts`.

> These JSON files are bundled at build time, so they update on the next deploy (Vercel/Netlify auto-deploys on push). Blog & prompts additionally update live without any deploy.

`content/site.json` configures which repo/branch the live fetch reads from.

## Project structure

```
├── App.tsx                  # Router + app shell (header, menu, search, footer)
├── components/
│   ├── layout/              # Header, MenuPanel, Footer
│   ├── markdown/            # MarkdownRenderer, CodeBlock, Mermaid
│   └── ui/                  # PhysicalCard, PushPin, SectionHeading, …
├── context/                 # Theme, Language, Performance, Ui providers
├── features/
│   ├── home/                # HomePage + section components + ResumeModal
│   ├── blog/                # Blog list + post pages
│   ├── prompts/             # Prompt library pages
│   └── search/              # Global Ctrl+K search overlay
├── lib/                     # content loader, frontmatter parser, data, icons
└── content/                 # ← ALL editable content lives here
```

## Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build (dist/)
npm run preview
```

Deployment: any static host. SPA rewrites are included for Vercel (`vercel.json`) and Netlify (`public/_redirects`).
