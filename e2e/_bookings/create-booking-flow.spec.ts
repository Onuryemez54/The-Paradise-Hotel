import { test, expect } from '@playwright/test';
import { selectRangeInNextMonth } from 'e2e/helpers/selectRangeInNextMonth';

test.describe('Create Booking Flow', () => {
  test.describe.configure({ mode: 'serial' });

  test.afterEach(async ({ request }) => {
    await request.post('/api/e2e/cleanup-bookings', {
      data: {
        roomId: 1234,
      },
    });
  });

  test('user can create a booking successfully', async ({ page }) => {
    await page.goto('/en/rooms/1234');

    const datePicker = page.getByTestId('booking-date-picker');
    await expect(datePicker).toBeVisible({ timeout: 20_000 });

    await selectRangeInNextMonth(page);

    const summary = page.getByTestId('booking-summary');
    await expect(summary).toBeVisible({ timeout: 10_000 });

    const totalPrice = page.getByTestId('total-price');
    await expect(totalPrice.locator('svg')).toHaveCount(0, {
      timeout: 10_000,
    });
    await expect(totalPrice).not.toHaveText('', { timeout: 10_000 });

    const form = page.getByTestId('booking-form');
    await expect(form).toBeVisible();

    const guestsSelect = form.getByTestId('booking-num-guests');
    await guestsSelect.click();
    await page.locator('[role="option"]', { hasText: '6' }).click();

    const observations = form.getByTestId('booking-observations');
    await observations.fill('E2E booking test reservation notes.');

    const breakfastCheckbox = form.getByTestId('booking-breakfast-included');
    await breakfastCheckbox.check();

    const submitButton = page.getByTestId('booking-submit');
    await expect(submitButton).toBeEnabled();

    await submitButton.click();

    await expect(page).toHaveURL(/\/en\/account\/bookings/, {
      timeout: 15_000,
    });

    await expect(page.getByText(/created successfully/i)).toBeVisible({
      timeout: 5_000,
    });

    const bookingsList = page.getByTestId('bookings-list');
    await expect(bookingsList).toBeVisible({ timeout: 15_000 });

    const rows = page.getByTestId('booking-row');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });
});
