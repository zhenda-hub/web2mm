import type { ExtractedContent } from './types';

export function extractSelection(): ExtractedContent | null {
  const selection = window.getSelection();
  const text = selection?.toString().trim();

  if (!text || text.length < 10) {
    return null;
  }

  return {
    title: document.title || 'Selected Text',
    textContent: text,
    url: location.href,
    excerpt: text.slice(0, 200),
    source: 'selection',
  };
}
