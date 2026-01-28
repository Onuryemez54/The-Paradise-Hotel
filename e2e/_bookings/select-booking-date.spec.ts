import { test, expect } from '@playwright/test';
import { selectRangeInNextMonth } from 'e2e/helpers/selectRangeInNextMonth';

test('user can select a booking date range', async ({ page }) => {
  await page.goto('/en/rooms/1234');
  await page.waitForLoadState('networkidle');

  const datePicker = page.getByTestId('booking-date-picker');
  await expect(datePicker).toBeVisible({ timeout: 30_000 });

  await selectRangeInNextMonth(page);
});
