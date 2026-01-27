import { expect, Page } from '@playwright/test';
import { BookingsStateResult } from './types';

export const waitForBookingsState = async (
  page: Page
): Promise<BookingsStateResult> => {
  const bookingsList = page.getByTestId('bookings-list');
  const emptyState = page.getByTestId('empty-bookings');

  await Promise.race([
    bookingsList.waitFor({ state: 'visible', timeout: 15_000 }),
    emptyState.waitFor({ state: 'visible', timeout: 5_000 }),
  ]);

  if (await bookingsList.isVisible()) {
    const rows = page.getByTestId('booking-row');
    const count = await rows.count();

    expect(count).toBeGreaterThan(0);
    await expect(rows.first()).toBeVisible();

    return {
      state: 'list',
      rows,
      count,
    };
  }

  if (await emptyState.isVisible()) {
    await expect(emptyState).toBeVisible();
    await expect(page.getByRole('link', { name: /explore/i })).toBeVisible();

    return {
      state: 'empty',
    };
  }

  throw new Error('Neither bookings list nor empty state became visible');
};
