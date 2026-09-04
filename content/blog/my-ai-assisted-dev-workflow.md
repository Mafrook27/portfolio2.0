---
title: "Spec First, Code Second: My AI-Assisted Dev Workflow"
date: 2026-06-28
summary: How I actually use AI day to day — writing markdown specs before code, treating prompts as reusable tools, and reviewing everything like a suspicious senior.
tags: [ai, workflow, productivity]
---

Most people use AI chat like a search engine: ask, copy, paste, hope. After a year of building real features with it at work, my flow looks completely different.

## The core loop

My rule: **the AI writes code, I write intent.**

1. **Spec in markdown.** Before any code, I write (or generate) a short spec — goal, scope, types, edge cases. My [Feature Spec Writer](/prompts/feature-spec-writer) prompt turns a rough idea into this in one shot.
2. **Generate against the spec.** The agent implements *the spec*, not my vague memory of it. When output drifts, I fix the spec, not the chat.
3. **Review like it's a stranger's PR.** Every generated diff goes through the same checklist I'd apply to a human's code — correctness, security, then simplicity.

## Why the spec matters so much

A chat message is disposable; a spec is an artifact. The difference shows up two weeks later:

```ts
// Without a spec, this "worked" — until endDate was null
const months = end.getMonth() - start.getMonth();

// The spec said: "endDate: null means currently employed"
const end = exp.endDate ? new Date(exp.endDate) : new Date();
```

The bug wasn't the AI's fault. The intent was never written down anywhere it could be checked against.

## Prompts are tools, not conversations

The second shift: I stopped re-typing instructions. Any prompt I use more than twice gets saved with a clear structure — role, process, rules, output format. That's literally why the [prompt library](/prompts) on this site exists; it's my actual toolbox, published.

A good reusable prompt has three properties:

- **A narrow job.** "Review this diff" beats "help me with code".
- **An output contract.** If I can't predict the response's *shape*, it needs tightening.
- **Rules that encode taste.** "Don't rewrite everything", "give failure scenarios" — the things I'd otherwise repeat forever.

## What I don't delegate

- Naming things — names encode understanding I need to keep
- Architecture decisions — I want to be the one who's wrong
- The final read of every diff — trust, but verify. Mostly verify.

AI hasn't made me code less carefully. It's made *careless coding* much faster — which means the care has to move upstream, into specs and review. That's the whole workflow.
