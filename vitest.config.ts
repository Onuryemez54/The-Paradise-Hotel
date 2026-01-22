import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),

      // 🔥 NEXT 16 + NEXT-INTL FIX
      'next/navigation': 'next/navigation.js',
    },
  },
});
