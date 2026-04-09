export interface PlatformConfig {
  name: string;
  baseURL: string;
}

export const PLATFORMS: Record<string, PlatformConfig> = {
  siliconflow: {
    name: '硅基流动',
    baseURL: 'https://api.siliconflow.cn/v1',
  },
  openrouter: {
    name: 'OpenRouter',
    baseURL: 'https://openrouter.ai/api/v1',
  },
};
