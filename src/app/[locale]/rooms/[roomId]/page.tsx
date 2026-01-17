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
import { AppLocale } from '@/i18n/routing';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LoadingKey, RoomKey } from '@/types/i18n/keys';
import { notFound } from 'next/navigation';

interface RoomPageProps {
  params: Promise<{
    locale: AppLocale;
    roomId: string;
  }>;
}

export async function generateMetadata({
  params,
}: RoomPageProps): Promise<Metadata> {
  const { roomId, locale } = await params;
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

const RoomPage = async ({ params }: RoomPageProps) => {
  const { roomId } = await params;
  if (!roomId) {
    notFound();
  }
  const room = await getRoomDetailById(BigInt(roomId));

  return (
    <div className="mx-auto mt-2 max-w-6xl space-y-10">
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
