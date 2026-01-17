'use server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { db } from '@/db/prisma';
import { getCurrentUser } from '../prisma-actions/db-acitons';
import {
  getOptionalString,
  getRequiredDate,
  getRequiredNumber,
  getRequiredString,
} from '@/utils/form-helpers/helpers';
import { ErrorKey } from '@/types/i18n/keys';

export const createBookingAction = async (formData: FormData) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error(ErrorKey.AUTH_REQUIRED);

  const roomId = getRequiredNumber(formData, 'roomId');
  const numGuests = getRequiredNumber(formData, 'numGuests');
  const breakfastIncluded = getRequiredString(formData, 'breakfastIncluded');
  const observations = getOptionalString(formData, 'observations') || '';
  const numNights = getRequiredNumber(formData, 'numNights');
  const extrasPrice = getRequiredNumber(formData, 'extrasPrice');
  const roomPrice = getRequiredNumber(formData, 'roomPrice');
  const startDate = getRequiredDate(formData, 'startDate');
  const endDate = getRequiredDate(formData, 'endDate');

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
        startDate: { lt: endDate },
        endDate: { gt: startDate },
      },
    });

    if (overlap) throw new Error(ErrorKey.BOOKING_OVERLAP);

    booking = await tx.booking.create({
      data: {
        ...updatedBooking,
      },
    });
  });

  if (!booking) throw new Error(ErrorKey.BOOKING_CREATE_FAILED);

  revalidateTag(`user-bookings-${currentUser.id}`, 'default');
  revalidatePath(`/rooms/${roomId}`);
  revalidatePath('/account/bookings');
};
