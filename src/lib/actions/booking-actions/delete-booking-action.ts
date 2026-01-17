'use server';
import { db } from '@/db/prisma';
import {
  getBookingsListByUserId,
  getCurrentUser,
} from '../prisma-actions/db-acitons';
import { revalidatePath, revalidateTag } from 'next/cache';
import { ErrorKey } from '@/types/i18n/keys';

export const deleteBookingAction = async (bookingId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error(ErrorKey.AUTH_REQUIRED);
  }

  const userBookings = await getBookingsListByUserId(currentUser.id);
  const userBookingsIds = userBookings.map((booking) => booking.id);

  if (!userBookingsIds.includes(bookingId)) {
    throw new Error(ErrorKey.BOOKING_DELETE_FORBIDDEN);
  }

  try {
    await db.booking.delete({
      where: { id: BigInt(bookingId) },
    });
  } catch (err) {
    console.error('deleteBookingAction error:', err);
    throw new Error(ErrorKey.BOOKING_DELETE_FAILED);
  }

  revalidateTag(`user-bookings-${currentUser.id}`, 'default');
  revalidatePath('/account/bookings');
};
