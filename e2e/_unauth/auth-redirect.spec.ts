import { test, expect } from '@playwright/test';

test.describe('unauthenticated only', () => {
  test('unauthenticated user is redirected to login from account page', async ({
    page,
  }, testInfo) => {
    if (testInfo.project.name !== 'unauthenticated') {
      test.skip();
    }

    await page.goto('/en/account');

    await expect(page).toHaveURL(/\/en\/auth\/login/);
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  });
});
