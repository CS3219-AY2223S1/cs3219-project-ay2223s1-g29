import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-ignore
  plugins: [react(), monacoEditorPlugin.default({})],
  server: {
    port: 3000,
  },
});
