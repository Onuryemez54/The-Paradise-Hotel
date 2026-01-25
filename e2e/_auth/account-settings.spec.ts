import { test, expect } from '@playwright/test';

test.describe('Account - Settings page', () => {
  test('authenticated user can see profile settings form', async ({ page }) => {
    await page.goto('/en/account/settings');

    await expect(page).toHaveURL(/\/en\/account\/settings/);

    const form = page.getByTestId('settings-form');
    await expect(form).toBeVisible({ timeout: 15_000 });

    await expect(page.getByTestId('full-name-input')).toBeVisible();
    await expect(page.getByTestId('email-input')).toBeVisible();
    await expect(page.getByTestId('email-input')).toBeDisabled();
    await expect(page.getByTestId('nationality-select')).toBeVisible();
    await expect(page.getByTestId('national-id-input')).toBeVisible();
    await expect(page.getByText(/you from/i)).toBeVisible();

    await expect(page.getByRole('button', { name: /save/i })).toBeVisible();
  });

  test('user can update profile information successfully', async ({ page }) => {
    await page.goto('/en/account/settings');

    const form = page.getByTestId('settings-form');
    await expect(form).toBeVisible({ timeout: 15_000 });

    const fullNameInput = page.getByTestId('full-name-input');
    const nationalitySelect = page.getByTestId('nationality-select');
    const nationalIdInput = page.getByTestId('national-id-input');
    const saveButton = page.getByRole('button', { name: /save/i });

    await fullNameInput.fill('E2E Test User Updated');
    await nationalIdInput.fill('12345678901');

    await nationalitySelect.click();

    await page.getByRole('option', { name: 'Sweden' }).click();

    await expect(saveButton).toBeEnabled();
    await saveButton.click();

    await expect(saveButton).not.toBeDisabled({ timeout: 15_000 });

    await expect(page.getByText(/updated successfully/i)).toBeVisible({
      timeout: 15_000,
    });
  });
});
