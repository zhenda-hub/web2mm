import { summarizeWithProvider } from '@/lib/ai/provider';
import { summarizeFree } from '@/lib/ai/free-service';
import { loadSettings } from '@/lib/storage/settings';
import { getCachedResult, setCachedResult } from '@/lib/storage/cache';
import type { ExtractedContent } from '@/lib/extract/types';

export default defineBackground(() => {
  // 点击扩展图标打开 Side Panel
  browser.action.onClicked.addListener(async (tab) => {
    if (tab.id) {
      await browser.sidePanel.open({ tabId: tab.id });
    }
  });

  // 处理来自 sidepanel 的消息
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.action === 'extractAndSummarize') {
      handleExtractAndSummarize(message.tabId, message.source)
        .then((result) => sendResponse({ data: result }))
        .catch((err) => sendResponse({ error: String(err) }));
      return true; // 异步 sendResponse
    }
  });

  // 确保 content script 已注入，没有则动态注入
  async function ensureContentScript(tabId: number) {
    try {
      await browser.tabs.sendMessage(tabId, { action: 'ping' });
    } catch {
      await browser.scripting.executeScript({
        target: { tabId },
        files: ['content-scripts/content.js'],
      });
    }
  }

  async function handleExtractAndSummarize(
    tabId: number,
    source: 'page' | 'selection'
  ): Promise<{ content: ExtractedContent; markdown: string }> {
    // 1. 确保 content script 已注入，再提取内容
    await ensureContentScript(tabId);

    const extractResponse = await browser.tabs.sendMessage(tabId, {
      action: 'extract',
      source,
    });

    if (extractResponse.error) {
      throw new Error(extractResponse.error);
    }

    const content: ExtractedContent = extractResponse.data;

    if (!content.textContent || content.textContent.length < 20) {
      throw new Error('Page content is too short to summarize');
    }

    // 2. 读取设置
    const settings = await loadSettings();

    // 3. AI 总结（带缓存）
    let markdown: string;

    // 先查缓存
    const cached = await getCachedResult(content.textContent, settings.model);
    if (cached) {
      markdown = cached.markdown;
    } else if (settings.apiKey) {
      // 用户自带 Key 模式
      markdown = await summarizeWithProvider({
        textContent: content.textContent,
        platform: settings.platform,
        apiKey: settings.apiKey,
        model: settings.model,
      });
    } else {
      // 免费模式
      markdown = await summarizeFree(content.textContent);
    }

    if (!markdown) {
      throw new Error('AI returned empty result');
    }

    // 写入缓存
    if (!cached) {
      await setCachedResult(content.textContent, settings.model, {
        markdown,
        title: content.title,
        url: content.url,
      });
    }

    return { content, markdown };
  }
});
