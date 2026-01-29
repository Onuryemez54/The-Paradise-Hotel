import { test, expect } from '@playwright/test';

test.describe('Account - My Bookings page', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ request }) => {
    await request.post('/api/e2e/seed-booking');
  });

  test.afterEach(async ({ request }) => {
    await request.post('/api/e2e/cleanup-bookings', {
      data: {
        roomId: 6,
      },
    });
  });

  test('bookings page shows correct information', async ({ page }) => {
    await page.goto('/en/account/bookings');

    const bookingsList = page.getByTestId('bookings-list');
    await expect(bookingsList).toBeVisible({ timeout: 15_000 });

    const rows = page.getByTestId('booking-row');

    await expect(rows.first()).toBeVisible({ timeout: 15_000 });

    const count = await rows.count();
    expect(count).toBeGreaterThan(0);

    const first = rows.first();

    await expect(first.getByTestId('booking-title')).not.toHaveText('', {
      timeout: 10_000,
    });

    await expect(first.getByTestId('booking-dates')).not.toHaveText('', {
      timeout: 10_000,
    });

    const price = first.getByTestId('booking-price');
    await expect(price.locator('svg')).toHaveCount(0, { timeout: 10_000 });
    await expect(price).not.toHaveText('', { timeout: 10_000 });

    await expect(first.getByTestId('booking-guests')).not.toHaveText('', {
      timeout: 10_000,
    });

    await expect(first.getByTestId('booking-created')).not.toHaveText('', {
      timeout: 10_000,
    });
  });

  test('user can delete a booking', async ({ page }) => {
    await page.goto('/en/account/bookings');

    const rows = page.getByTestId('booking-row');
    await expect(rows.first()).toBeVisible({ timeout: 15_000 });

    const initialCount = await rows.count();

    await rows.first().getByTestId('booking-delete').click();

    await expect(page.getByText(/deleted successfully/i)).toBeVisible({
      timeout: 5_000,
    });

    await expect(rows).toHaveCount(initialCount - 1, {
      timeout: 10_000,
    });
  });

  test('user can navigate to edit booking page', async ({ page }) => {
    await page.goto('/en/account/bookings');

    const rows = page.getByTestId('booking-row');
    await expect(rows.first()).toBeVisible({ timeout: 15_000 });

    const editButton = rows.first().getByTestId('booking-edit');
    await expect(editButton).toBeVisible();

    await editButton.click();

    await expect(page).toHaveURL(/\/en\/account\/bookings\/edit\/.+/, {
      timeout: 15_000,
    });

    await expect(page.getByTestId('booking-edit-client')).toBeVisible({
      timeout: 15_000,
    });
  });
});
