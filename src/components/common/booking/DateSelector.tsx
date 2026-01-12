'use client';
import { useTranslations } from 'use-intl';
import { useReservation } from '@/context/ReservationContext';
import { useEffect, useMemo, useRef } from 'react';
import { useToast } from '@/context/ToastContext';
import { DateRange } from 'react-day-picker';
import { BookingDatePicker } from './BookingDatePicker';
import { excludeCurrentBooking } from '@/utils/booking-helpers/excludeCurrentBooking';
import { isRangeOverlapping } from '@/utils/booking-helpers/isRangeOverlapping';
import { ErrorKey } from '@/types/i18n/keys';
import { BookingRange } from '@/utils/booking-helpers/types';

interface DateSelectorProps {
  roomID: string;
  maxCapacity: number;
  minBookingLength?: number;
  maxBookingLength?: number;
  bookedRanges: BookingRange[];
  startDate?: Date;
  endDate?: Date;
}

export const DateSelector = ({
  roomID,
  maxCapacity,
  minBookingLength,
  maxBookingLength,
  bookedRanges,
  startDate,
  endDate,
}: DateSelectorProps) => {
  const toast = useToast();
  const tE = useTranslations(ErrorKey.TITLE);

  const {
    range,
    setRange,
    resetRange,
    hydrateRangeFromDB,
    setRoomId,
    guests,
    evaluateRoomChange,
  } = useReservation();

  const isEditMode = Boolean(startDate && endDate);

  useEffect(() => {
    if (isEditMode) return;
    setRoomId(roomID);
  }, [roomID, isEditMode]);

  useEffect(() => {
    evaluateRoomChange(range, bookedRanges, guests, maxCapacity);
  }, [roomID]);

  const availableBookings = useMemo(() => {
    if (!isEditMode) return bookedRanges;

    return excludeCurrentBooking(bookedRanges, {
      from: startDate!,
      to: endDate!,
    });
  }, [bookedRanges, startDate, endDate]);

  useEffect(() => {
    if (isEditMode) {
      hydrateRangeFromDB({ from: startDate, to: endDate });
    }
  }, [isEditMode, startDate, endDate, hydrateRangeFromDB]);

  const handleSelect = (selectedRange?: DateRange) => {
    if (!selectedRange?.from || !selectedRange?.to) {
      setRange({
        from: selectedRange?.from,
        to: undefined,
      });
      return;
    }

    const overlapping = isRangeOverlapping(
      { from: selectedRange.from, to: selectedRange.to },
      availableBookings
    );

    if (overlapping) {
      toast.warning(tE(ErrorKey.INVALID_BOOKING_DATES));
      return;
    }

    setRange({
      from: selectedRange.from,
      to: selectedRange.to,
    });
  };

  const handleReset = () => {
    resetRange();
  };

  return (
    <BookingDatePicker
      range={range}
      onSelect={handleSelect}
      bookedRanges={availableBookings}
      minNights={minBookingLength}
      maxNights={maxBookingLength}
      isEditMode={isEditMode}
      handleReset={handleReset}
    />
  );
};
