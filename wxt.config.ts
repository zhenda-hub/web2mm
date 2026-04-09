import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  manifest: {
    name: 'web2mm - Web to Mind Map',
    description: 'Summarize any webpage into an interactive mind map',
    permissions: ['storage', 'sidePanel', 'activeTab', 'scripting'],
    action: {
      default_title: 'Summarize this page',
    },
  },
});
