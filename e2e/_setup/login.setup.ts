import { expect, test } from '@playwright/test';

test('login and save storage state', async ({ page }) => {
  await page.goto('/en/auth/login');

  await page.fill('input[name="email"]', 'e2e.user@test.com');
  await page.fill('input[name="password"]', '55555test');

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
