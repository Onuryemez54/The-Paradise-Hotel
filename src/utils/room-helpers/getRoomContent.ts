'use client';
import { RoomKey } from '@/types/i18n/keys';
import type { RoomType } from '@/types/rooms/room';
import { useTranslations } from 'next-intl';

export const getRoomContent = (type: RoomType) => {
  const t = useTranslations(RoomKey.TITLE);
  const names = t.raw(RoomKey.NAMES) as Record<RoomType, string>;
  const descriptions = t.raw(RoomKey.DESC) as Record<RoomType, string>;
  return {
    name: names[type],
    description: descriptions[type],
  };
};
