import test, { expect } from '@playwright/test';

test.describe('Rooms List', () => {
  test('rooms page loads correctly', async ({ page }) => {
    await page.goto('/en/rooms');
    await page.waitForLoadState('networkidle');

    await expect(
      page.getByRole('heading', { name: /our luxury rooms/i })
    ).toBeVisible();
    await expect(page.getByText(/cozy yet refined rooms/i)).toBeVisible();

    const filterBar = page.getByTestId('rooms-filter');
    await expect(filterBar).toBeVisible();
  });

  test('rooms list is rendered', async ({ page }) => {
    await page.goto('/en/rooms');
    await page.waitForLoadState('networkidle');

    const roomsList = page.getByTestId('rooms-list');
    await expect(roomsList).toBeVisible({ timeout: 15_000 });

    const cards = page.getByTestId('room-card');
    const count = await cards.count();

    expect(count).toBeGreaterThan(0);

    await expect(cards.first()).toBeVisible();
  });

  test('user can filter rooms by capacity', async ({ page }) => {
    await page.goto('/en/rooms');
    await page.waitForLoadState('networkidle');

    const smallFilter = page.getByRole('button', { name: /2/i });
    await expect(smallFilter).toBeVisible();

    await smallFilter.click();

    await expect(page).toHaveURL(/capacity=small/, { timeout: 10_000 });

    const roomsList = page.getByTestId('rooms-list');
    await expect(roomsList).toBeVisible({ timeout: 15_000 });

    const cards = page.getByTestId('room-card');
    const count = await cards.count();

    expect(count).toBeGreaterThan(0);
  });

  test('filter persists on reload', async ({ page }) => {
    await page.goto('/en/rooms?capacity=medium');
    await page.waitForLoadState('networkidle');

    const activeFilter = page.getByRole('button', { name: /4/i });
    await expect(activeFilter).toHaveClass(/bg-primary-700/);

    const cards = page.getByTestId('room-card');
    const count = await cards.count();

    expect(count).toBeGreaterThan(0);
  });

  test('user can navigate to room detail page', async ({ page }) => {
    await page.goto('/en/rooms');
    await page.waitForLoadState('networkidle');

    const cards = page.getByTestId('room-card');

    const firstCard = cards.first();
    await expect(firstCard).toBeVisible({ timeout: 15_000 });

    const link = firstCard.getByRole('link', { name: /details/i });
    const href = await link.getAttribute('href');

    expect(href).toBeTruthy();
    expect(href).toMatch(/\/rooms\/.+/);

    await link.click();

    await expect(page).toHaveURL(/\/en\/rooms\/.+/, { timeout: 15_000 });

    const roomDetailPage = page.getByTestId('room-detail-page');
    await expect(roomDetailPage).toBeVisible({ timeout: 15_000 });

    const roomImage = page.getByTestId('room-image');
    await expect(roomImage).toBeVisible({ timeout: 15_000 });
  });
});
