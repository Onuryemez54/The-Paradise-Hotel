import { BookingRange } from './types';
import { isSameDay } from 'date-fns';

export const excludeCurrentBooking = (
  bookings: BookingRange[],
  current?: BookingRange
): BookingRange[] => {
  if (!current) return bookings;

  return bookings.filter(
    (b) => !(isSameDay(b.from, current.from) && isSameDay(b.to, current.to))
  );
};
