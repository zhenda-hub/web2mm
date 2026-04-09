// 使用 WXT storage API 存储设置
// MVP 用 chrome.storage.local 直接实现

export interface Settings {
  platform: string;
  apiKey: string;
  model: string;
}

const DEFAULT_SETTINGS: Settings = {
  platform: 'siliconflow',
  apiKey: '',
  model: 'Qwen/Qwen2.5-7B-Instruct',
};

const STORAGE_KEY = 'web2mm_settings';

export async function loadSettings(): Promise<Settings> {
  return new Promise((resolve) => {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
      resolve({ ...DEFAULT_SETTINGS, ...result[STORAGE_KEY] });
    });
  });
}

export async function saveSettings(settings: Partial<Settings>): Promise<void> {
  const current = await loadSettings();
  const updated = { ...current, ...settings };
  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY]: updated }, resolve);
  });
}
