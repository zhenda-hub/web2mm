// 免费服务客户端 - 调用 Cloudflare Worker 代理
// MVP 阶段暂未部署后端，预留接口

const FREE_SERVICE_URL = 'https://web2mm-proxy.workers.dev';

export async function summarizeFree(textContent: string): Promise<string> {
  const response = await fetch(FREE_SERVICE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: textContent.slice(0, 12000),
      extensionId: chrome.runtime.id,
    }),
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('今日免费额度已用完，请在设置中配置自己的 API Key');
    }
    throw new Error(`Free service error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.markdown || '';
}
