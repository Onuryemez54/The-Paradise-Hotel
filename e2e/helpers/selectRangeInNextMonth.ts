import { Page, expect } from '@playwright/test';

export const selectRangeInNextMonth = async (page: Page) => {
  const monthSelect = page.locator('select').first();

  if (await monthSelect.isVisible()) {
    const today = new Date();
    const nextMonthIndex = (today.getMonth() + 1) % 12;

    await monthSelect.selectOption(String(nextMonthIndex));
    await page.waitForTimeout(400);
  }

  const enabledDays = page.locator(
    '[role="gridcell"]:not([aria-disabled="true"])'
  );

  const count = await enabledDays.count();
  expect(count).toBeGreaterThan(10);

  const startIndex = Math.floor(count / 4);
  const endIndex = startIndex + 5;

  const start = enabledDays.nth(startIndex);
  const end = enabledDays.nth(endIndex);

  await expect(start).toBeEnabled();
  await expect(end).toBeEnabled();

  await start.click();
  await end.click();
};
