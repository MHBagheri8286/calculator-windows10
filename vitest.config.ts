import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        'dist/',
      ],
    },
  },
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/common/components'),
      '@constants': resolve(__dirname, 'src/common/constants'),
      '@models': resolve(__dirname, 'src/common/models'),
      '@hooks': resolve(__dirname, 'src/common/hooks'),
      '@utils': resolve(__dirname, 'src/common/utils'),
      '@styles': resolve(__dirname, 'src/common/styles'),
    },
  },
})