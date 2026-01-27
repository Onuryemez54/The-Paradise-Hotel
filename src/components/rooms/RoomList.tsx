import {
  getRoomsForList,
  RoomListItem,
} from '@/lib/actions/prisma-actions/db-acitons';
import { RoomCard } from './RoomCard';
import { FadeUp } from '@/components/common/animation/FadeUp';
import { FilterValue } from '@/types/i18n/keys';

interface RoomListProps {
  filter: string;
}

export const RoomList = async ({ filter }: RoomListProps) => {
  const rooms = await getRoomsForList();

  let displayedRooms: RoomListItem[] = rooms;

  if (filter === FilterValue.ALL) displayedRooms = rooms;

  if (filter === FilterValue.SMALL)
    displayedRooms = rooms.filter((room) => room.maxCapacity === 2);

  if (filter === FilterValue.MEDIUM)
    displayedRooms = rooms.filter((room) => (room.maxCapacity ?? 0) === 4);
  if (filter === FilterValue.LARGE)
    displayedRooms = rooms.filter((room) => room.maxCapacity === 6);

  if (filter === FilterValue.X_LARGE)
    displayedRooms = rooms.filter((room) => room.maxCapacity === 10);

  return (
    <FadeUp delay={0.2}>
      <div
        data-testid="rooms-list"
        className="3xl:grid-cols-4 3xl:gap-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 xl:gap-8"
      >
        {displayedRooms.map((room) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </div>
    </FadeUp>
  );
};
