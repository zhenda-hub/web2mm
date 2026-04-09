import { PLATFORMS } from './platforms';
import { SYSTEM_PROMPT, buildUserPrompt } from './prompt';

export interface SummarizeRequest {
  textContent: string;
  platform: string;
  apiKey: string;
  model: string;
}

export async function summarizeWithProvider(req: SummarizeRequest): Promise<string> {
  const platform = PLATFORMS[req.platform];
  if (!platform) throw new Error(`Unknown platform: ${req.platform}`);

  const url = `${platform.baseURL}/chat/completions`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${req.apiKey}`,
    },
    body: JSON.stringify({
      model: req.model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserPrompt(req.textContent) },
      ],
      max_tokens: 2000,
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error (${response.status}): ${err}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}
