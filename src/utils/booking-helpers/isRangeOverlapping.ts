import { areIntervalsOverlapping } from 'date-fns';
import { BookingRange } from './types';

export const isRangeOverlapping = (
  selected: BookingRange,
  bookedRanges: BookingRange[]
): boolean => {
  return bookedRanges.some((booking) =>
    areIntervalsOverlapping(
      { start: selected.from, end: selected.to },
      { start: booking.from, end: booking.to },
      {
        inclusive: false,
      }
    )
  );
};
