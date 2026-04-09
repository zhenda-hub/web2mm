const CACHE_PREFIX = 'web2mm_cache:';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 小时

export interface CacheEntry {
  markdown: string;
  title: string;
  url: string;
  timestamp: number;
}

// 简单哈希：textContent 特征 + model
function generateCacheKey(textContent: string, model: string): string {
  const head = textContent.slice(0, 100);
  const len = textContent.length;
  const raw = `${head}:${len}:${model}`;

  // djb2 hash
  let hash = 5381;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) + hash) ^ raw.charCodeAt(i);
  }
  return CACHE_PREFIX + (hash >>> 0).toString(36);
}

export async function getCachedResult(
  textContent: string,
  model: string
): Promise<CacheEntry | null> {
  const key = generateCacheKey(textContent, model);

  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      const entry = result[key] as CacheEntry | undefined;
      if (!entry) {
        resolve(null);
        return;
      }

      // 检查是否过期
      if (Date.now() - entry.timestamp > CACHE_TTL) {
        chrome.storage.local.remove(key);
        resolve(null);
        return;
      }

      resolve(entry);
    });
  });
}

export async function setCachedResult(
  textContent: string,
  model: string,
  entry: Omit<CacheEntry, 'timestamp'>
): Promise<void> {
  const key = generateCacheKey(textContent, model);
  const value: CacheEntry = { ...entry, timestamp: Date.now() };

  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, resolve);
  });
}

export async function clearCache(): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.get(null, (items) => {
      const keysToRemove = Object.keys(items).filter((k) =>
        k.startsWith(CACHE_PREFIX)
      );
      if (keysToRemove.length === 0) {
        resolve();
        return;
      }
      chrome.storage.local.remove(keysToRemove, resolve);
    });
  });
}
