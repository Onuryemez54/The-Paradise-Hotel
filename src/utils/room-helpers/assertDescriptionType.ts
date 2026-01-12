import { ErrorKey } from '@/types/i18n/keys';
import { RoomType } from '@/types/rooms/room';

export function assertDescriptionType(value: RoomType): RoomType {
  const allowed: RoomType[] = Object.values(RoomType);

  if (!allowed.includes(value as RoomType)) {
    throw new Error(ErrorKey.ROOM_TYPE_INVALID);
  }

  return value as RoomType;
}
