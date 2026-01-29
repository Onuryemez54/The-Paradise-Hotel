import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: [
      'e2e/**',
      '**/*.e2e.{ts,tsx}',
      'node_modules/**',
      'dist/**',
      '.next/**',
    ],
  },

  css: {
    postcss: {},
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'next/navigation': 'next/navigation.js',
    },
  },
});
