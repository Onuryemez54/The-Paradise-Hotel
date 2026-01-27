import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /_setup\/.*\.setup\.ts/,
    },
    {
      name: 'authenticated',
      testMatch: /(_account|_bookings|_rooms)\/.*\.spec\.ts/,
      use: {
        storageState: 'e2e/.auth/user.json',
      },
      dependencies: ['setup'],
      testIgnore: ['**/auth-redirect.spec.ts'],
    },

    {
      name: 'unauthenticated',
      testMatch: /_unauth\/.*\.spec\.ts/,
      use: {},
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: baseURL,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
