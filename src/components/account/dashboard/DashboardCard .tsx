import { getTranslations } from 'next-intl/server';
import { isPast } from 'date-fns';
import { Divider } from '../../common/Divider';
import { BookingKey } from '@/types/i18n/keys';
import { DashboardBookingByUserIdResult } from '@/lib/actions/db-acitons';
import { assertDescriptionType } from '@/utils/room-helpers/assertDescriptionType';
import { RoomType } from '@/types/rooms/room';
import { getRoomNameServer } from '@/utils/room-helpers/getRoomNameServer';

type Title = 'STATISTICS' | 'RECENT_ACTIVITY';
interface DashboardCardProps {
  title: Title;
  bookings?: DashboardBookingByUserIdResult[];
}

export const DashboardCard = async ({
  title,
  bookings,
}: DashboardCardProps) => {
  const now = new Date();
  const activeBookings = bookings?.filter((b) => {
    const start = new Date(b.startDate);
    const end = new Date(b.endDate);
    return start <= now && end >= now;
  });
  const pastBookings = bookings
    ?.filter((b) => isPast(new Date(b.endDate)))
    ?.sort(
      (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
    );
  const recentBookings = pastBookings?.slice(0, 3);

  const safeRecentBookings = recentBookings ?? [];

  const recentBookingsWithRoomName = await Promise.all(
    safeRecentBookings.map(async (b) => {
      const roomType = assertDescriptionType(b.room.type as RoomType);
      const { name } = await getRoomNameServer(roomType);
      return {
        id: b.id,
        startDate: b.startDate,
        endDate: b.endDate,
        roomName: name,
      };
    })
  );

  const t = await getTranslations(BookingKey.TITLE);
  const titleKey = t(BookingKey[title]);

  const content =
    title === 'STATISTICS' ? (
      <div className="space-y-2 text-xs lg:text-sm">
        <div className="flex items-center justify-between gap-10">
          <span>{t(BookingKey.TOTAL_BOOKINGS)}</span>
          <span className="text-primary-400 rounded-md border px-2 py-1">
            {bookings?.length ?? 0}
          </span>
        </div>

        <div className="flex items-center justify-between gap-10">
          <span>{t(BookingKey.ACTIVE_BOOKINGS)}</span>
          <span className="border-accent-400 text-accent-400 rounded-md border px-2 py-1">
            {activeBookings?.length ?? 0}
          </span>
        </div>

        <div className="flex items-center justify-between gap-10">
          <span>{t(BookingKey.PAST_BOOKINGS)}</span>
          <span className="border-primary-400 text-primary-400 rounded-md border px-2 py-1">
            {pastBookings?.length ?? 0}
          </span>
        </div>
      </div>
    ) : !recentBookings || recentBookings.length === 0 ? (
      <p className="text-footer-text text-xs lg:text-sm">
        {t(BookingKey.NO_RECENT_ACTIVITY)}
      </p>
    ) : (
      <div className="space-y-2 text-xs lg:text-sm">
        {recentBookingsWithRoomName?.map((booking) => (
          <div
            key={booking.id}
            className="border-accent-border/50 space-y-1 border-b pb-3 last:border-0"
          >
            <p>
              {t(BookingKey.ROOM)}:{' '}
              <span className="text-accent-400 font-semibold">
                {booking.roomName}
              </span>
            </p>

            <p>
              {t(BookingKey.STAYED_FROM)}{' '}
              <strong className="text-accent-400">
                {new Date(booking.startDate).toLocaleDateString()}
              </strong>{' '}
              {t(BookingKey.TO)}{' '}
              <strong className="text-accent-400">
                {new Date(booking.endDate).toLocaleDateString()}
              </strong>
            </p>
          </div>
        ))}
      </div>
    );

  return (
    <div className="text-primary-200 border-border from-primary-700 to-primary-950 rounded-2xl border bg-linear-to-br p-5 shadow-sm backdrop-blur-md">
      <h2 className="mb-3 text-sm font-semibold lg:text-base">{titleKey}</h2>
      <Divider m />
      {content}
    </div>
  );
};
