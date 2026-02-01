'use client';
import { useOptimistic } from 'react';
import { useToast } from '@/context/ToastContext';
import { useTranslations } from 'next-intl';
import { BookingCard } from './BookingCard';
import { deleteBookingAction } from '@/lib/actions/booking-actions/delete-booking-action';
import { BookingByUserIdResult } from '@/lib/actions/prisma-actions/db-acitons';
import { ErrorKey, SuccessKey } from '@/types/i18n/keys';
import { handleAppError } from '@/lib/errors/helpers/handleAppError';
import { FadeUp } from '@/components/common/animation/FadeUp';

interface UserBookingsListProps {
  bookings: BookingByUserIdResult[];
}

export const UserBookingsList = ({ bookings }: UserBookingsListProps) => {
  const toast = useToast();
  const tS = useTranslations(SuccessKey.TITLE);
  const tE = useTranslations(ErrorKey.TITLE);

  const [optimisticBookings, updateOptimistic] = useOptimistic(
    bookings,
    (state, action: { type: 'delete'; id: string } | { type: 'reset' }) => {
      if (action.type === 'delete') {
        return state.filter((b) => b.id !== action.id);
      }
      return bookings;
    }
  );

  const handleDelete = async (bookingId: string) => {
    updateOptimistic({ type: 'delete', id: bookingId });

    const result = await deleteBookingAction(bookingId);

    const error = handleAppError({
      result,
      t: tE,
      toast,
    });

    if (error) {
      updateOptimistic({ type: 'reset' });
      return;
    }

    toast.success(tS(SuccessKey.BOOKING_DELETED), 500, true);
  };

  return (
    <FadeUp>
      <ul className="space-y-4 p-0.5 sm:p-1 md:p-2 lg:p-3">
        {optimisticBookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </FadeUp>
  );
};
