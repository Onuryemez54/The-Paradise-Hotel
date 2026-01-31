'use client';
import { useEffect, useRef } from 'react';
import { useBookingPrice } from '@/hooks/useBookingPrice';
import { useReservation } from '@/context/ReservationContext';
import { differenceInDays } from 'date-fns';
import { DateSelector } from './DateSelector';
import { BookingForm } from './BookingForm';
import { BookingSummary } from './BookingSummary';
import { LoginMessage } from '@/components/rooms/LoginMessage';
import { CustomTitle } from '../../ui/custom-components/CustomTitle';
import { CustomSubTitle } from '../../ui/custom-components/CustomSubTitle';
import { SubTitleKey, TitleKey } from '@/types/i18n/keys';
import { BookingRange } from '@/utils/booking-helpers/types';
import {
  RoomForBookingType,
  SettingsType,
} from '@/lib/actions/prisma-actions/db-acitons';
import { FadeLeftToRight } from '../animation/FadeLeftToRight';
import { FadeRightToLeft } from '../animation/FadeRightToLeft';
import { FadeUp } from '../animation/FadeUp';
import { cn } from '@/utils/utils';
import { dbUser } from '@/types/auth/dbUser';

interface Props {
  room: RoomForBookingType;
  settings: SettingsType;
  bookedRanges: BookingRange[];
  user: dbUser | null;
  bookingId?: string;
  startDate?: Date;
  endDate?: Date;
  initialGuests?: number;
  initialBreakfast?: boolean;
  initialObservation?: string;
}

export const RoomBookingClient = ({
  room,
  settings,
  bookedRanges,
  user,
  bookingId,
  startDate,
  endDate,
  initialGuests,
  initialBreakfast,
  initialObservation,
}: Props) => {
  const { range, guests, breakfastIncluded, resetAll, setMode } =
    useReservation();

  useEffect(() => {
    setMode(bookingId ? 'edit' : 'create');
  }, [bookingId, setMode]);

  const { id: roomId, regularPrice, discount, maxCapacity } = room;
  const { breakfastPrice, minBookingLength, maxBookingLength } = settings;

  const nights =
    range.from && range.to ? differenceInDays(range.to, range.from) : 0;
  const roomPrice = discount ? regularPrice - discount : regularPrice;

  const bookingPrice = useBookingPrice({
    nights,
    roomPrice,
    guests,
    breakfastPrice,
    breakfastIncluded,
  });

  const { totalPrice } = bookingPrice;

  const isExternalReset = useRef(false);
  const handleReset = () => {
    isExternalReset.current = true;
    resetAll();
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      {!bookingId && (
        <div className="my-2 flex flex-col items-center gap-3">
          <CustomTitle
            variant="subheading"
            className="mb-2"
            i18nKey={TitleKey.DATE}
          />
          <CustomSubTitle
            variant="section"
            className="mb-2"
            i18nKey={SubTitleKey.DATE}
          />
        </div>
      )}

      <div
        className={cn(
          'flex w-full flex-col items-center gap-4',
          !bookingId ? 'xl:flex-row xl:gap-6' : ''
        )}
      >
        <FadeLeftToRight>
          <DateSelector
            roomID={roomId}
            maxCapacity={maxCapacity}
            minBookingLength={minBookingLength}
            maxBookingLength={maxBookingLength}
            bookedRanges={bookedRanges}
            startDate={startDate}
            endDate={endDate}
          />
        </FadeLeftToRight>
        {user ? (
          <div className="w-full">
            <FadeRightToLeft>
              <BookingForm
                isExternalReset={isExternalReset}
                user={user}
                roomId={roomId}
                roomPrice={roomPrice}
                breakfastPrice={breakfastPrice}
                maxCapacity={maxCapacity}
                bookedRanges={bookedRanges}
                bookingId={bookingId}
                initialGuests={initialGuests}
                initialBreakfast={initialBreakfast}
                initialObservation={initialObservation}
              />
            </FadeRightToLeft>
          </div>
        ) : (
          <div className="w-full max-w-xl">
            <FadeRightToLeft>
              <LoginMessage />
            </FadeRightToLeft>
          </div>
        )}
      </div>
      {range.from && range.to && (
        <FadeUp initialY={12}>
          <BookingSummary
            totalPrice={totalPrice}
            numNights={nights}
            numGuests={guests}
            handleReset={handleReset}
            bookingId={bookingId ?? undefined}
          />
        </FadeUp>
      )}
    </div>
  );
};
