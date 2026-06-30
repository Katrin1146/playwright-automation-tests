import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: 1,
  use: {
    baseURL: 'https://www.demoblaze.com',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  reporter: 'html',
});
