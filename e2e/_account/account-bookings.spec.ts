import { test, expect } from '@playwright/test';
import { waitForBookingsState } from 'e2e/helpers/waitForBookingsState';

test.describe('Account - My Bookings page', () => {
  test('bookings page shows correct state', async ({ page }) => {
    await page.goto('/en/account/bookings');
    await page.waitForLoadState('networkidle');

    await waitForBookingsState(page);
  });

  test('booking card shows correct information', async ({ page }) => {
    await page.goto('/en/account/bookings');
    await page.waitForLoadState('networkidle');

    const result = await waitForBookingsState(page);

    if (result.state === 'empty') {
      test.skip(true, 'No bookings for this user');
      return;
    }

    const first = result.rows.first();

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

  test('user can delete a booking', async ({ page }) => {
    await page.goto('/en/account/bookings');
    await page.waitForLoadState('networkidle');

    const result = await waitForBookingsState(page);

    if (result.state === 'empty') {
      test.skip(true, 'No bookings to delete');
      return;
    }

    const { rows, count: initialCount } = result;

    const firstRow = rows.first();
    const deleteButton = firstRow.getByTestId('booking-delete');

    await deleteButton.click();

    await expect(page.getByText(/deleted successfully/i)).toBeVisible({
      timeout: 3_000,
    });

    const finalCount = await rows.count();
    expect(finalCount).toBe(initialCount - 1);
  });

  test('user can navigate to edit booking page', async ({ page }) => {
    await page.goto('/en/account/bookings');
    await page.waitForLoadState('networkidle');

    const result = await waitForBookingsState(page);

    if (result.state !== 'list') {
      test.skip(true, 'No bookings to edit');
      return;
    }

    const firstRow = result.rows.first();
    await expect(firstRow).toBeVisible();

    const editButton = firstRow.getByTestId('booking-edit');
    await expect(editButton).toBeVisible();

    const link = editButton.locator('..');
    const href = await link.getAttribute('href');

    expect(href).toBeTruthy();
    expect(href).toMatch(/\/account\/bookings\/edit\/.+/);

    await editButton.click();

    await expect(page).toHaveURL(/\/en\/account\/bookings\/edit\/.+/, {
      timeout: 15_000,
    });

    const editSection = page.getByTestId('booking-edit-client');
    await expect(editSection).toBeVisible({ timeout: 15_000 });
  });
});
