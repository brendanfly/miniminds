import { defineConfig, devices } from '@playwright/test';

const port = process.env.MINIMINDS_PORT ?? '5174';
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
    command: `npm run dev -- --port ${port} --strictPort --mode browser-test`,
    url: baseURL,
    reuseExistingServer: false,
  },
});
