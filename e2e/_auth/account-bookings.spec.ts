import { test, expect } from '@playwright/test';

test.describe('Account - My Bookings page', () => {
  test('bookings page shows correct state', async ({ page }) => {
    await page.goto('/en/account/bookings');

    await page.waitForLoadState('networkidle');

    const bookingsList = page.getByTestId('bookings-list');
    const emptyState = page.getByTestId('empty-bookings');

    await Promise.race([
      bookingsList.waitFor({ state: 'visible', timeout: 15_000 }),
      emptyState.waitFor({ state: 'visible', timeout: 15_000 }),
    ]);

    if (await bookingsList.isVisible()) {
      const rows = page.getByTestId('booking-row');

      const count = await rows.count();
      expect(count).toBeGreaterThan(0);

      await expect(rows.first()).toBeVisible();
    }

    if (await emptyState.isVisible()) {
      await expect(emptyState).toBeVisible();
      await expect(page.getByRole('link', { name: /explore/i })).toBeVisible();
    }
  });

  test('booking card shows correct information', async ({ page }) => {
    await page.goto('/en/account/bookings');

    await page.waitForLoadState('networkidle');

    const rows = page.getByTestId('booking-row');
    const count = await rows.count();

    if (count === 0) {
      test.skip(true, 'No bookings for this user');
    }

    const first = rows.first();

    await expect(first).toBeVisible({ timeout: 15_000 });

    const title = first.getByTestId('booking-title');
    await expect(title).toBeVisible();
    await expect(title).not.toHaveText('', { timeout: 10_000 });

    const dates = first.getByTestId('booking-dates');
    await expect(dates).toBeVisible();
    await expect(dates).not.toHaveText('', { timeout: 10_000 });

    const price = first.getByTestId('booking-price');

    await expect(price.locator('svg')).toHaveCount(0, { timeout: 10_000 });

    await expect(price).not.toHaveText('', { timeout: 10_000 });

    const guests = first.getByTestId('booking-guests');
    await expect(guests).toBeVisible();
    await expect(guests).not.toHaveText('', { timeout: 10_000 });

    const created = first.getByTestId('booking-created');
    await expect(created).toBeVisible();
    await expect(created).not.toHaveText('', { timeout: 10_000 });
  });
});
