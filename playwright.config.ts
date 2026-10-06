import { defineConfig, devices } from '@playwright/test';

const server = process.env.MINIMINDS_SERVER ?? 'vite';
if (server !== 'vite' && server !== 'workers') throw new Error('MINIMINDS_SERVER must be vite or workers.');
const port = Number(process.env.MINIMINDS_PORT ?? (server === 'workers' ? '5178' : '5174'));
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('MINIMINDS_PORT must be a port number from 1 to 65535.');
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: { baseURL },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'tablet', use: { ...devices['iPad Mini'], defaultBrowserType: 'chromium' } },
    { name: 'phone', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: {
    command: server === 'workers'
      ? `npx --yes wrangler@4.143.0 dev --local --ip 127.0.0.1 --port ${port} --show-interactive-dev-session=false`
      : `npm run dev -- --port ${port} --strictPort --mode browser-test`,
    env: { WRANGLER_SEND_METRICS: 'false' },
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120000,
  },
});
