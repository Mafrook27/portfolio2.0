---
name: react-best-practices
description: Use when writing, reviewing, or refactoring React/Next.js code — on a fresh project or an existing codebase. Audits for unnecessary re-renders, hook misuse, dead code, missing UI edge states, folder structure and DRY violations, JS-level performance, click/event handling, and async correctness. Single-file, low-token, works on any model tier.
license: MIT
metadata:
  author: mafrook
  version: 1.2.0
---

# React Full Audit

Run every check below against the code in front of you. Report only what's violated — skip a section silently if it's already clean. Format: `[CATEGORY] file:line — issue → fix`.

## Fresh Project vs. Existing System

- **Fresh project**: apply every rule as a hard requirement from the start — folder structure (§5), typing (§5), error boundaries (§8) go in before feature code accumulates. Cheap to fix now, expensive later.
- **Existing/production system**: don't mass-refactor working code on one pass. Flag issues by severity (bug-risk vs. style), fix bug-risk items (race conditions, memory leaks, stale closures, missing error boundaries) first and in isolation, and batch low-risk structural/naming cleanup separately so it doesn't get tangled with behavior changes in the same diff. If touching legacy code you didn't write, confirm the "why" before refactoring — it may be intentional.

## 1. Re-renders & Hooks

- **useEffect misuse**: effect only sets derived state from props/state → move to render-time calculation, delete the effect (`rerender-derived-state-no-effect`).
- **useEffect for event logic**: effect fires in response to a user action (click/submit) → move logic into the handler itself, not an effect watching a flag.
- **Missing/wrong deps**: stale closures, missing dep array items, or `eslint-disable` on deps → fix deps or restructure to avoid needing them.
- **useMemo/useCallback overuse**: memoizing primitives, cheap expressions, or values never passed to a memoized child/dep array → remove; memoization itself has a cost.
- **useMemo/useCallback underuse**: expensive computation (loops, filters, sorts over real data) or object/array/function passed as a prop into `React.memo` children → add memoization.
- **Inline object/array/function literals** passed as props to memoized children → hoist outside render or memoize.
- **Components defined inside components** → hoist to module scope (causes full remount + state loss every render).
- **Over-broad state**: one `useState` holding an object where only one field changes per update → split into independent state, OR derive with `useReducer` if fields are coupled.
- **State that should be a ref**: value updated frequently but never drives UI (scroll pos, timers, prev-value tracking) → `useRef` instead of `useState`.
- **Subscribing to more state than needed**: component re-renders on unrelated field changes in a large object/context → select only the slice needed (selector, derived hook, or split context).
- **Context re-render blast radius**: one context value object recreated every render, causing all consumers to re-render → split context or memoize the value.
- **List re-render**: missing/unstable `key` (index-as-key on reorderable lists), or every list item re-renders on unrelated parent state change → stable IDs as keys + memoize item component.
- **Stale closures**: `setState(x + 1)` used inside a timer/async callback/event handler that outlives the render it was created in → use functional form `setState(prev => prev + 1)`.
- **Lazy state init**: `useState(expensiveCalc())` recomputes on every render even though only mount matters → `useState(() => expensiveCalc())`.
- **Handler refs**: event handler function put into a `useEffect` dependency array, forcing the effect to re-run every time the handler identity changes → store handler in a `useRef`/`useEffectEvent` instead.

## 2. Dead Code

- Unused imports, exports, variables, functions, and components (no reference anywhere in the codebase — grep before flagging).
- Commented-out code blocks left in place (not documentation, actual disabled code).
- Unreachable code after early return/throw.
- Feature-flagged or `if (false)` branches with no flag system behind them.
- Duplicate/near-duplicate components or functions doing the same thing under different names — flag for consolidation, don't just delete.
- Console.logs / debugger statements left in.

## 3. UI Edge States

For every data-driven component/screen, verify all of these exist (not just the "happy path" with data):

- **Loading**: skeleton or spinner, not a blank screen.
- **Empty**: zero results state with clear copy — distinct from loading and from error.
- **Error**: fetch/mutation failure state with a retry action, not a silent fail or raw error dump.
- **No permission / unauthorized**: distinct from generic error if the app has auth-gated data.
- **Partial data / stale data**: if using cache-then-revalidate, indicate staleness rather than flashing empty→full.
- **Offline**: if the app has real-time or network-dependent features, handle disconnect state (don't assume always-online).
- Flag any component that renders `data.map(...)` or similar with no null/empty/error guard above it.

## 4. React Optimization (general)

- `React.memo` missing on pure list-item/leaf components that re-render on unrelated parent updates.
- Large lists (100+ items) rendered without virtualization (`react-window`/`react-virtual`) or `content-visibility: auto`.
- Images without lazy loading / explicit width-height (layout shift).
- Heavy/rarely-used components not code-split (`next/dynamic` or `React.lazy`).
- Non-urgent updates (search-as-you-type, filters) not wrapped in `startTransition`/`useDeferredValue`.
- Conditional rendering using `&&` with a value that can be `0`/`""` (renders stray `0` in UI) → use ternary.
- Suspense boundaries missing around async/lazy content that could stream.

## 5. Folder Structure & DRY

- Flag flat/type-based structure (`/components`, `/hooks`, `/utils` all mixed) on any codebase with 15+ components → recommend feature-based: `/features/<domain>/{components,hooks,api,types}`.
- Shared/cross-feature code should live in `/shared` or `/lib`, not duplicated per feature.
- Same logic (formatters, validators, API-call patterns, custom hooks) repeated in 2+ places → extract to `/shared/utils` or `/shared/hooks`, name it, replace call sites.
- Business logic embedded directly in components (API calls, transforms) instead of hooks/services → extract into a custom hook or service layer.
- Barrel files (`index.ts` re-exporting everything) on large modules → flag if causing bundle-bloat risk (breaks tree-shaking).
- Inconsistent naming/casing across similar files (PascalCase vs kebab-case mixed) → flag for consistency pass.
- **Prop drilling**: data passed through 3+ component levels that don't use it themselves, just forward it → context, composition (children/slots), or co-locate the component closer to the data.
- **`any`/`unknown` leakage**: types widened to silence a compiler error instead of fixed, or API response shapes left untyped → silent runtime bugs; type the actual shape or use a runtime validator (zod) at the API boundary.
- **Hardcoded config/secrets**: API URLs, keys, or feature flags hardcoded inline in components instead of env vars/config layer → breaks per-environment builds, security risk if committed.

## 6. JS-Level Optimization

- **Async/promise**: sequential `await`s on independent calls → `Promise.all`; await placed before a cheap sync check that could short-circuit first → reorder.
- **Search/filter on input**: unthrottled filtering on every keystroke over non-trivial data → debounce (250–400ms) and/or memoize the filtered result with `useMemo` keyed on query+data.
- **Pagination**: full dataset fetched/rendered when list can grow unbounded → recommend server pagination, cursor-based fetch, or client virtualization if data must stay client-side.
- **Memory leaks**: subscriptions/listeners/timers/intervals set up without cleanup in `useEffect` return; async calls that `setState` after unmount without a cancellation/abort guard.
- **Repeated lookups**: `.find()`/`.filter()` in a loop or on every render for lookups by ID → build a `Map` once (module-level or memoized).
- **Caching**: expensive pure computations or repeat network calls for the same key with no cache → module-level `Map`/LRU cache, or `React.cache()`/SWR for request dedup.
- **localStorage/sessionStorage**: read on every render/call instead of cached in memory and synced.

## 7. Click & Event Handling

- **Double-submit**: button/click handler triggers an async action (submit, delete, payment) with no disabled/loading guard → disable on click until the promise resolves, or debounce.
- **Duplicate global listeners**: `window`/`document.addEventListener` set up per component instance instead of once/deduped → dedupe via a shared hook or module-level singleton listener.
- **Non-passive scroll/touch listeners**: scroll, touchstart, touchmove, wheel handlers without `{ passive: true }` → add it, blocks main thread otherwise.
- **No preload on intent**: nav links/heavy routes with no preload on hover/focus before click → prefetch on hover/focus for perceived-instant navigation.
- **Missing cleanup**: listener added in `useEffect` with no matching `removeEventListener` in the cleanup return → add cleanup (ties into memory-leak checks in §6).

## 8. Async Correctness & Component API

- **Race conditions**: fast successive requests (search-as-you-type, rapid clicks) where an older response can resolve after a newer one and overwrite it → ignore stale responses (AbortController, request-id/sequence check, or SWR/React Query which handle this natively).
- **Missing Error Boundaries**: risky subtrees (third-party widgets, `.map()` over uncertain API data, iframes) have no `<ErrorBoundary>` → one throw takes down the whole page instead of failing locally.
- **Unsanitized HTML injection**: `dangerouslySetInnerHTML` fed from API/user data without sanitization (DOMPurify or equivalent) → XSS risk, flag every occurrence.
- **Boolean prop explosion**: component accumulates `isX`/`isY`/`hasZ` props over time instead of one `variant`/`status` prop or composition → creates impossible/contradictory prop combos, hard to reason about.
- **No optimistic UI on mutations**: click → spinner → wait for network → UI updates, for actions that are almost always going to succeed (toggle, snooze, mark-read) → update UI immediately, roll back on failure.

## How to Apply

1. Read the diff/file once. Classify issues under the sections above.
2. Only report actual violations — no filler "this looks fine" commentary per rule.
3. For each issue: 1-line what's wrong + 1-line fix. Code snippet only if the fix isn't obvious from the description.
4. **Report only — do not edit any file yet.** Present the full findings list first, in priority order (below). This is analysis output, not a diff.
5. **Ask which items to apply.** After the findings list, ask the user which issues they want fixed — all, a subset, or none. Do not assume "report = go ahead and fix."
6. **Only touch what was approved.** Edit exactly the items the user confirmed, nothing adjacent, even if another issue is sitting right next to it in the same file. If a fix for an approved item unavoidably touches other code, say so before making the edit, not after.
7. Priority order when triaging a large file: re-renders/hooks (1) → memory leaks & race conditions (6, 8) → click/event handling (7) → UI edge states (3) → dead code (2) → structure (5) → misc JS (6 rest) → component API polish (8 rest).
