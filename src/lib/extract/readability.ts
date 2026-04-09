import { Readability } from '@mozilla/readability';
import type { ExtractedContent } from './types';

export function extractPageContent(): ExtractedContent | null {
  // Readability 会修改 DOM，需要克隆
  const clonedDoc = document.cloneNode(true) as Document;
  const reader = new Readability(clonedDoc);
  const article = reader.parse();

  if (!article || !article.textContent?.trim()) {
    return null;
  }

  return {
    title: article.title || document.title || 'Untitled',
    textContent: article.textContent.trim(),
    url: location.href,
    excerpt: article.excerpt || '',
    source: 'page',
  };
}
