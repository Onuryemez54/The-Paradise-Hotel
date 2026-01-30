import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { RoomBooking } from '@/components/rooms/RoomBooking';
import { RoomDetail } from '@/components/rooms/RoomDetail';
import { Divider } from '@/components/common/Divider';
import {
  getRoomDetailById,
  getRoomsForList,
  RoomListItem,
} from '@/lib/actions/prisma-actions/db-acitons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ErrorKey, LoadingKey, RoomKey } from '@/types/i18n/keys';
import { AppError } from '@/lib/errors/AppError';
import { getValidatedLocale } from '@/i18n/server';

interface RoomPageMetadataProps {
  params: Promise<{
    locale: string;
    roomId: string;
  }>;
}

export async function generateMetadata({
  params,
}: RoomPageMetadataProps): Promise<Metadata> {
  const { roomId } = await params;
  const locale = await getValidatedLocale(params);

  const t = await getTranslations({
    locale,
    namespace: RoomKey.TITLE,
  });
  return {
    title: `${t(RoomKey.NAME)}-${roomId}`,
  };
}

export const generateStaticParams = async () => {
  const rooms = await getRoomsForList();
  const ids = rooms.map((room: RoomListItem) => ({ roomId: room.id }));
  return ids;
};

const RoomPage = async ({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) => {
  const { roomId } = await params;
  if (!roomId) {
    throw new AppError(ErrorKey.ROOM_NOT_FOUND);
  }
  const room = await getRoomDetailById(BigInt(roomId));

  return (
    <div
      data-testid="room-detail-page"
      className="mx-auto mt-2 max-w-6xl space-y-10"
    >
      <RoomDetail room={room} />
      <Divider />
      <Suspense
        fallback={<LoadingSpinner label={LoadingKey.ROOM_BOOK_DETAILS} />}
      >
        <RoomBooking roomId={room.id} />
      </Suspense>
    </div>
  );
};

export default RoomPage;
