import { test, expect } from '@playwright/test';
import { selectRangeInNextMonth } from 'e2e/helpers/selectRangeInNextMonth';

test.describe('Select booking date', () => {
  test('user selects date and system reacts correctly (free or overlap)', async ({
    page,
  }) => {
    await page.goto('/en/rooms/1234');
    await page.waitForLoadState('networkidle');

    const datePicker = page.getByTestId('booking-date-picker');
    await expect(datePicker).toBeVisible({ timeout: 30_000 });

    await selectRangeInNextMonth(page);

    const summary = page.getByTestId('booking-summary');
    const totalPrice = page.getByTestId('total-price');

    await expect(summary).toBeVisible();

    await expect(totalPrice.locator('svg')).toHaveCount(0, { timeout: 10_000 });
    await expect(totalPrice).not.toHaveText('', { timeout: 10_000 });
  });
});
