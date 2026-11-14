import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // The redesigned site serves its images, fonts and static files from /static.
  publicDir: 'static',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    host: 'localhost',
    watch: {
      // Local QA artifacts and the editor's temporary atomic-write directories
      // must never be watched (Windows locks them and the watcher would crash).
      ignored: [
        '**/.work/**',
        '**/docs/**',
        '**/*.tmp',
        '**/*.tmpdir/**',
        '**/.*.tmpdir/**',
        '**/.*.tmpdir*/**',
      ],
    },
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
  build: {
    target: 'es2019',
    cssCodeSplit: true,
  },
});
