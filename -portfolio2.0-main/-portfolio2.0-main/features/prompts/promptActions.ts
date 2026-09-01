// Small shared helpers for the prompt library.

export function getCopyCount(slug: string): number {
  try {
    return Number(localStorage.getItem(`prompt-copies:${slug}`)) || 0;
  } catch {
    return 0;
  }
}

export function incrementCopyCount(slug: string): number {
  const next = getCopyCount(slug) + 1;
  try {
    localStorage.setItem(`prompt-copies:${slug}`, String(next));
  } catch {
    // storage unavailable — count just isn't persisted
  }
  return next;
}

/** Deep links that open the prompt pre-filled in an AI chat. */
export function aiChatLinks(promptBody: string) {
  const encoded = encodeURIComponent(promptBody.trim());
  return {
    claude: `https://claude.ai/new?q=${encoded}`,
    chatgpt: `https://chatgpt.com/?q=${encoded}`,
  };
}
