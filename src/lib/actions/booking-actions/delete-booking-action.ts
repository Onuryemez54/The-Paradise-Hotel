'use server';
import { db } from '@/db/prisma';
import {
  getBookingsListByUserId,
  getCurrentUser,
} from '../prisma-actions/db-acitons';
import { revalidatePath, revalidateTag } from 'next/cache';
import { ErrorKey } from '@/types/i18n/keys';
import { ActionResultType } from '@/lib/errors/helpers/handleAppError';

export const deleteBookingAction = async (
  bookingId: string
): Promise<ActionResultType> => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { ok: false, error: ErrorKey.AUTH_REQUIRED };
  }

  const userBookings = await getBookingsListByUserId(currentUser.id);
  const userBookingsIds = userBookings.map((booking) => booking.id);

  if (!userBookingsIds.includes(bookingId)) {
    return { ok: false, error: ErrorKey.BOOKING_DELETE_FORBIDDEN };
  }

  try {
    await db.booking.delete({
      where: { id: BigInt(bookingId) },
    });
  } catch (err) {
    console.error('deleteBookingAction error:', err);
    return { ok: false, error: ErrorKey.BOOKING_DELETE_FAILED };
  }

  revalidateTag(`user-bookings-${currentUser.id}`, 'default');
  revalidatePath('/account/bookings');
  return { ok: true };
};
