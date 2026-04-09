export interface ModelOption {
  id: string;
  name: string;
}

export const MODELS: Record<string, ModelOption[]> = {
  siliconflow: [
    { id: 'Qwen/Qwen2.5-7B-Instruct', name: 'Qwen2.5-7B (免费)' },
    { id: 'Qwen/Qwen2.5-32B-Instruct', name: 'Qwen2.5-32B' },
    { id: 'deepseek-ai/DeepSeek-V3', name: 'DeepSeek-V3' },
    { id: 'deepseek-ai/DeepSeek-R1', name: 'DeepSeek-R1' },
  ],
  openrouter: [
    { id: 'google/gemini-2.0-flash-001', name: 'Gemini 2.0 Flash' },
    { id: 'anthropic/claude-3.5-haiku', name: 'Claude 3.5 Haiku' },
    { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini' },
    { id: 'meta-llama/llama-3.1-8b-instruct', name: 'Llama 3.1 8B' },
  ],
};
