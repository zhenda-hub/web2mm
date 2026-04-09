import { renderMindmap } from '@/lib/markmap/render';
import { loadSettings, saveSettings } from '@/lib/storage/settings';
import { clearCache } from '@/lib/storage/cache';
import { MODELS } from '@/lib/ai/models';

type ViewName = 'welcome' | 'loading' | 'result' | 'settings' | 'error';

let currentTabId: number | null = null;

function showView(name: ViewName) {
  document.querySelectorAll('.view').forEach((el) => el.classList.remove('active'));
  document.getElementById(`view-${name}`)?.classList.add('active');
}

function showError(msg: string) {
  document.getElementById('error-text')!.textContent = msg;
  showView('error');
}

async function getCurrentTabId(): Promise<number> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) throw new Error('No active tab found');
  return tab.id;
}

async function summarize(source: 'page' | 'selection') {
  showView('loading');
  const loadingText = document.getElementById('loading-text')!;

  try {
    loadingText.textContent = '正在提取页面内容...';

    if (!currentTabId) {
      currentTabId = await getCurrentTabId();
    }

    loadingText.textContent = '正在分析并总结...';

    const response = await chrome.runtime.sendMessage({
      action: 'extractAndSummarize',
      tabId: currentTabId,
      source,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    const { content, markdown } = response.data;

    // 渲染思维导图
    const svg = document.getElementById('mindmap-svg')!;
    renderMindmap(svg, markdown);

    document.getElementById('result-title')!.textContent = content.title;
    showView('result');
  } catch (err) {
    showError(String(err));
  }
}

async function initSettings() {
  const settings = await loadSettings();

  const platformSelect = document.getElementById('select-platform') as HTMLSelectElement;
  const modelSelect = document.getElementById('select-model') as HTMLSelectElement;
  const apiKeyInput = document.getElementById('input-api-key') as HTMLInputElement;

  platformSelect.value = settings.platform;
  apiKeyInput.value = settings.apiKey;

  function updateModelOptions() {
    const platform = platformSelect.value;
    const models = MODELS[platform] || [];
    modelSelect.innerHTML = '';
    for (const m of models) {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = m.name;
      modelSelect.appendChild(opt);
    }
    modelSelect.value = settings.model;
  }

  updateModelOptions();

  platformSelect.addEventListener('change', () => {
    const models = MODELS[platformSelect.value] || [];
    if (models.length > 0) {
      modelSelect.value = models[0].id;
    }
    updateModelOptions();
    saveSettings({
      platform: platformSelect.value,
      model: modelSelect.value,
    });
  });

  modelSelect.addEventListener('change', () => {
    saveSettings({ model: modelSelect.value });
  });

  apiKeyInput.addEventListener('change', () => {
    saveSettings({ apiKey: apiKeyInput.value.trim() });
  });
}

function setupEventListeners() {
  document.getElementById('btn-summarize-page')!.addEventListener('click', () => summarize('page'));
  document.getElementById('btn-summarize-selection')!.addEventListener('click', () => summarize('selection'));

  document.getElementById('btn-settings')!.addEventListener('click', () => showView('settings'));
  document.getElementById('btn-settings-back')!.addEventListener('click', () => showView('welcome'));
  document.getElementById('btn-back')!.addEventListener('click', () => showView('welcome'));
  document.getElementById('btn-error-back')!.addEventListener('click', () => showView('welcome'));
  document.getElementById('btn-retry')!.addEventListener('click', () => summarize('page'));

  // 清除缓存
  document.getElementById('btn-clear-cache')!.addEventListener('click', async () => {
    await clearCache();
    const btn = document.getElementById('btn-clear-cache')!;
    btn.textContent = '已清除 ✓';
    setTimeout(() => { btn.textContent = '清除缓存'; }, 1500);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  showView('welcome');
  setupEventListeners();
  initSettings();
});
