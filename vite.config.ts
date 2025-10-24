import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// ✅ Correct: single export with everything merged
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 👈 keeps your @ alias working
    },
  },
  base: '/user-observation-template/', // 👈 GitHub Pages base path
});
