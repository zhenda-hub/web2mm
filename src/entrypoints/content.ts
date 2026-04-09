import { extractPageContent } from '@/lib/extract/readability';
import { extractSelection } from '@/lib/extract/selection';

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_idle',
  main() {
    // 监听来自 background 的消息
    browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message.action === 'ping') {
        sendResponse({ ok: true });
        return false;
      }
      if (message.action === 'extract') {
        try {
          const content = message.source === 'selection'
            ? extractSelection()
            : extractPageContent();

          if (!content) {
            sendResponse({ error: message.source === 'selection'
              ? 'No text selected. Please select some text first.'
              : 'Cannot extract content from this page.'
            });
          } else {
            sendResponse({ data: content });
          }
        } catch (err) {
          sendResponse({ error: String(err) });
        }
        // 返回 true 表示异步 sendResponse (虽然这里是同步，但保持一致性)
        return false;
      }
    });
  },
});
