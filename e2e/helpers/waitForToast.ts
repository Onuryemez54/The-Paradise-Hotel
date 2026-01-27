import { Page, expect } from '@playwright/test';

export const waitForToast = async (page: Page, expectedText?: RegExp) => {
  const toast = page.getByTestId('custom-toast');

  await expect(toast).toBeVisible({ timeout: 15_000 });

  if (expectedText) {
    await expect(toast).toContainText(expectedText);
  }

  return toast;
};
