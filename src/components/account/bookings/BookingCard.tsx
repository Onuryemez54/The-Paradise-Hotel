'use client';
import { isPast } from 'date-fns';
import { Edit, Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { DeleteBookingButton } from './DeleteBookingButton';
import { DateRangeDisplay } from '@/components/account/bookings/DateRangeDisplay';
import { BookingByUserIdResult } from '@/lib/actions/prisma-actions/db-acitons';
import { Badge } from '@/components/common/Badge';
import { CustomListItem } from '@/components/ui/custom-components/CustomListItem';
import { usePrice } from '@/hooks/usePrice';
import { BookingNightsTitle } from '@/components/account/bookings/BookingNightsTitle ';
import { RoomType } from '@/types/rooms/room';
import { BadgeKey, ListItemKey } from '@/types/i18n/keys';
import { assertDescriptionType } from '@/utils/room-helpers/assertDescriptionType';
import { useRates } from '@/context/PriceRatesContext';

interface BookingCardProps {
  booking: BookingByUserIdResult;
  onDelete: (bookingId: string) => Promise<void>;
}

export const BookingCard = ({ booking, onDelete }: BookingCardProps) => {
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    createdAt,
    room: { type, image },
  } = booking;

  const rates = useRates();
  const { formatPrice, isLoading } = usePrice(totalPrice, rates);

  const roomType = assertDescriptionType(type as RoomType);
  const isPastBooking = isPast(new Date(endDate));

  return (
    <div
      data-booking-id={booking.id}
      data-testid="booking-row"
      className="border-border flex rounded-2xl border p-1 md:p-2"
    >
      <div className="relative hidden aspect-square h-42 lg:block">
        <Image
          src={image || ''}
          alt={`${type} image`}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="rounded-xl object-cover object-center"
          priority
        />
      </div>

      <div className="flex grow flex-col gap-1 px-2 py-1 sm:gap-4 sm:px-4 sm:py-2 lg:gap-6">
        <div
          data-testid="booking-title"
          className="flex items-center justify-between"
        >
          <BookingNightsTitle nights={numNights} roomType={roomType} />
          {isPastBooking ? (
            <Badge variant="secondary" i18nKey={BadgeKey.PAST} />
          ) : (
            <Badge variant="primary" i18nKey={BadgeKey.UPCOMING} />
          )}
        </div>

        <DateRangeDisplay startDate={startDate} endDate={endDate} />

        <div className="flex flex-col items-start justify-between gap-2 lg:flex-row lg:items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <div
              data-testid="booking-price"
              className="text-accent-400 text-sm font-semibold sm:text-base lg:text-lg xl:text-xl"
            >
              {isLoading ? (
                <Loader size={14} className="animate-spin" />
              ) : (
                formatPrice()
              )}
            </div>
            <div data-testid="booking-guests" className="flex items-center">
              <CustomListItem
                numGuests={numGuests}
                variant="small"
                i18nKey={
                  numGuests > 1
                    ? ListItemKey.GUEST_MULTIPLE
                    : ListItemKey.GUEST_SINGLE
                }
              />
            </div>
          </div>
          <div
            data-testid="booking-created"
            className="text-primary-200 ml-0 lg:ml-2"
          >
            <CustomListItem
              variant="small"
              i18nKey={ListItemKey.BOOKED}
              created={new Date(createdAt)}
            />
          </div>
        </div>
      </div>

      <div className="border-primary-400/60 flex w-16 flex-col items-center justify-center border-l px-1">
        {!isPastBooking ? (
          <p className="flex flex-col items-center justify-center gap-1 p-2">
            <Link href={`/account/bookings/edit/${id}`}>
              <Edit
                data-testid="booking-edit"
                className="text-primary-200 hover:text-accent-400 h-4 w-4 transition-all duration-300 hover:rotate-45 md:h-5 md:w-5"
              />
            </Link>
            <span className="border-border/30 my-3 w-full border-b sm:my-4 lg:my-6" />

            <DeleteBookingButton bookingId={id} onDelete={onDelete} />
          </p>
        ) : (
          <p className="flex flex-col items-center justify-center gap-1 px-2">
            <CustomListItem
              variant="xs"
              i18nKey={ListItemKey.NOT_CHANGED}
              className="text-primary-200/30"
            />
            <span className="border-primary-400/60 my-1 w-full border-b sm:my-2 md:my-4" />
            <DeleteBookingButton bookingId={id} onDelete={onDelete} />
          </p>
        )}
      </div>
    </div>
  );
};
