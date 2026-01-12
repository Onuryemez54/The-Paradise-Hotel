import { RoomKey } from '@/types/i18n/keys';
import { RoomType } from '@/types/rooms/room';
import { getTranslations } from 'next-intl/server';

export const getRoomNameServer = async (type: RoomType) => {
  const t = await getTranslations(RoomKey.TITLE);

  const names = t.raw(RoomKey.NAMES) as Record<RoomType, string>;

  return {
    name: names[type],
  };
};
