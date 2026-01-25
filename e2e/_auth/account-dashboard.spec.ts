import { test, expect } from '@playwright/test';

test.describe('Account - Dashboard Page', () => {
  test('authenticated user can access account page', async ({ page }) => {
    await page.goto('/en/account');

    await expect(page).toHaveURL(/\/en\/account/);

    await expect(page.getByText(/account/i)).toBeVisible();
    await expect(page.getByText(/statistics/i)).toBeVisible({
      timeout: 15_000,
    });
  });

  test('authenticated user can access bookings page by clicking bookings link', async ({
    page,
  }) => {
    await page.goto('/en/account');

    const bookingsLink = page.getByRole('link', { name: /my bookings/i });

    await expect(bookingsLink).toBeVisible({ timeout: 15_000 });

    await bookingsLink.click();

    await expect(page).toHaveURL(/\/en\/account\/bookings/);

    await expect(
      page.getByRole('heading', { name: /your bookings/i })
    ).toBeVisible();

    await page.waitForLoadState('networkidle');
  });

  test('authenticated user can access settings page by clicking edit link', async ({
    page,
  }) => {
    await page.goto('/en/account');

    const settingsLink = page.getByRole('link', { name: /edit/i });

    await expect(settingsLink).toBeVisible({ timeout: 15_000 });

    await settingsLink.click();
    await expect(page).toHaveURL(/\/en\/account\/settings/);

    await expect(
      page.getByRole('heading', { name: /your profile/i })
    ).toBeVisible();

    const settingsForm = page.getByTestId('settings-form');

    await expect(settingsForm).toBeVisible({ timeout: 15_000 });
  });
});
