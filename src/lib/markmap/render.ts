import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import { Toolbar } from 'markmap-toolbar';
import 'markmap-toolbar/dist/style.css';

const transformer = new Transformer();

const LIGHT_COLORS = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#dc2626', '#7c3aed'];
const DARK_COLORS = ['#818cf8', '#22d3ee', '#34d399', '#fbbf24', '#f87171', '#a78bfa'];

function isDarkMode(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function renderMindmap(svgEl: SVGElement, markdown: string): Markmap {
  const { root } = transformer.transform(markdown);
  const dark = isDarkMode();
  const colors = dark ? DARK_COLORS : LIGHT_COLORS;

  // 清除旧内容
  while (svgEl.firstChild) {
    svgEl.removeChild(svgEl.firstChild);
  }

  const mm = Markmap.create(svgEl, {
    autoFit: true,
    color: (node) => {
      return colors[node.state?.depth % colors.length] || colors[0];
    },
    duration: 500,
    maxWidth: 200,
    paddingX: 12,
  }, { ...root, type: root.type });

  // 添加工具栏
  try {
    const toolbar = Toolbar.create(mm);
    const container = svgEl.parentElement;
    if (container) {
      // 移除旧 toolbar
      container.querySelectorAll('.mm-toolbar').forEach((el) => el.remove());
      container.appendChild(toolbar.el);
      toolbar.el.style.position = 'absolute';
      toolbar.el.style.bottom = '8px';
      toolbar.el.style.right = '8px';
    }
  } catch {
    // toolbar 非关键，忽略错误
  }

  return mm;
}
