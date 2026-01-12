'use server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { db } from '@/db/prisma';
import { getCurrentUser } from '../db-acitons';
import {
  getOptionalString,
  getRequiredDate,
  getRequiredNumber,
  getRequiredString,
} from '@/utils/form-helpers/helpers';
import { AppError } from '@/lib/errors/AppError';
import { ErrorKey } from '@/types/i18n/keys';

export const editBookingAction = async (formData: FormData) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new AppError(ErrorKey.AUTH_REQUIRED);

  const roomId = getRequiredNumber(formData, 'roomId');
  const numGuests = getRequiredNumber(formData, 'numGuests');
  const breakfastIncluded = getRequiredString(formData, 'breakfastIncluded');
  const observations = getOptionalString(formData, 'observations') || '';
  const numNights = getRequiredNumber(formData, 'numNights');
  const extrasPrice = getRequiredNumber(formData, 'extrasPrice');
  const roomPrice = getRequiredNumber(formData, 'roomPrice');
  const startDate = getRequiredDate(formData, 'startDate');
  const endDate = getRequiredDate(formData, 'endDate');
  const bookingId = getRequiredNumber(formData, 'bookingId');

  const hasBreakfast = breakfastIncluded === 'yes';

  const totalPrice = roomPrice * numGuests * numNights + extrasPrice;

  const updatedBooking = {
    startDate,
    endDate,
    numNights,
    numGuests,
    roomPrice,
    extrasPrice,
    totalPrice,
    isPaid: false,
    status: 'unconfirmed',
    hasBreakfast,
    observations,
    roomId,
    userId: String(currentUser.id),
  };

  let booking;

  await db.$transaction(async (tx) => {
    const overlap = await tx.booking.findFirst({
      where: {
        roomId,
        id: { not: bookingId },
        startDate: { lt: endDate },
        endDate: { gt: startDate },
      },
    });

    if (overlap) throw new AppError(ErrorKey.BOOKING_OVERLAP);

    booking = await tx.booking.update({
      where: { id: bookingId },
      data: {
        ...updatedBooking,
      },
    });
  });

  if (!booking) throw new AppError(ErrorKey.BOOKING_UPDATE_FAILED);

  revalidateTag(`user-bookings-${currentUser.id}`, 'default');
  revalidatePath('/account/bookings');
  revalidatePath(`/rooms/${roomId}`);
};
