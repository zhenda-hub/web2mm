export const SYSTEM_PROMPT = `You are a content summarizer. Your task is to summarize the given text into a hierarchical mind map structure using Markdown headings.

Rules:
1. Use # for the main topic (article title or theme)
2. Use ## for key sections/categories
3. Use ### for sub-points
4. Use - bullet points for details under each sub-point
5. Keep each node concise (under 15 words)
6. Aim for 3-5 second-level nodes, each with 2-4 sub-points
7. Output ONLY the Markdown, no explanations
8. Use the SAME LANGUAGE as the input content`;

export function buildUserPrompt(content: string): string {
  // 截断超长内容
  const maxChars = 12000;
  const truncated = content.length > maxChars
    ? content.slice(0, maxChars) + '\n\n[Content truncated...]'

    : content;

  return `Please summarize the following content into a hierarchical mind map:\n\n${truncated}`;
}
