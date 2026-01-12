'use client';
import { useTranslations } from 'next-intl';
import { cn } from '@/utils/utils';
import { getRoomContent } from '@/utils/room-helpers/getRoomContent';
import { RoomType } from '@/types/rooms/room';
import { BookingKey } from '@/types/i18n/keys';

type Props = {
  nights: number;
  className?: string;
  roomType: RoomType;
};

export const BookingNightsTitle = ({ nights, className, roomType }: Props) => {
  const tBooking = useTranslations(BookingKey.TITLE);
  const { name } = getRoomContent(roomType);

  return (
    <h3
      className={cn(
        'text-sm font-semibold sm:text-base lg:text-lg xl:text-xl',
        className
      )}
    >
      {tBooking(BookingKey.NIGHTS_IN, { count: nights })} - {name}
    </h3>
  );
};
