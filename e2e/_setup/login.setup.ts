import { expect, test } from '@playwright/test';

const TEST_EMAIL = process.env.TEST_USER_EMAIL!;
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD!;

test('login and save storage state', async ({ page }) => {
  await page.goto('/en/auth/login');

  await page.fill('input[name="email"]', TEST_EMAIL);
  await page.fill('input[name="password"]', TEST_PASSWORD);

  await page.click('button[type="submit"]');

  await page.waitForURL('**/account**', { timeout: 15_000 });

  await expect(page.getByText('Welcome')).toBeVisible({
    timeout: 15_000,
  });

  await page.context().storageState({
    path: 'e2e/_user/user.json',
  });

  expect(await page.title()).toBeTruthy();
});
