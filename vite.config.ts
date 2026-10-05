import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'node:path';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  cacheDir: join('node_modules', mode === 'browser-test' ? '.vite-browser-tests' : '.vite'),
}));
