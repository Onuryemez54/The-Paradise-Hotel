'use server';
import { db } from '@/db/prisma';
import { createClient } from '@/db/supabase/server';
import { BookingRange } from '@/utils/booking-helpers/types';
import { ErrorKey } from '@/types/i18n/keys';
import { unstable_cache } from 'next/cache';

// --- AUTH ---
// CURRENT USER
export const getCurrentUser = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const currentUser = await db.user.findUnique({
    where: { id: user.id },
  });

  return currentUser;
};

// --- ROOMS ---
// getRoomsForList is cached for 1 hour
export const getRoomsForList = unstable_cache(
  async () => {
    try {
      const rooms = await db.room.findMany({
        select: {
          id: true,
          image: true,
          maxCapacity: true,
          regularPrice: true,
          discount: true,
          type: true,
        },
      });

      return rooms.map((room) => ({
        ...room,
        id: room.id.toString(),
      }));
    } catch (err) {
      console.error('getRoomsForList error:', err);
      throw new Error(ErrorKey.ROOMS_FETCH_FAILED);
    }
  },
  ['rooms-list'],
  { revalidate: 3600, tags: ['rooms'] }
);

export type RoomListItem = Awaited<ReturnType<typeof getRoomsForList>>[number];

//  getRoomCount is cached for 1 hour
export const getRoomCount = unstable_cache(
  async () => {
    try {
      return await db.room.count();
    } catch (err) {
      console.error('getRoomCount error:', err);
      throw new Error(ErrorKey.ROOMS_FETCH_FAILED);
    }
  },
  ['room-count'],
  {
    revalidate: 3600,
    tags: ['rooms'],
  }
);

// getRoomById is cached for 1 hour
export const getRoomDetailById = async (roomId: bigint) =>
  unstable_cache(
    async () => {
      try {
        const room = await db.room.findUnique({
          where: { id: roomId },
          select: {
            id: true,
            image: true,
            maxCapacity: true,
            regularPrice: true,
            discount: true,
            type: true,
          },
        });

        if (!room) {
          throw new Error(ErrorKey.ROOM_NOT_FOUND);
        }

        return {
          ...room,
          id: room.id.toString(),
        };
      } catch (err) {
        console.error('getRoomById error:', err);
        throw new Error(ErrorKey.ROOM_FETCH_FAILED);
      }
    },
    [`room-${roomId}`],
    {
      revalidate: 3600,
      tags: ['rooms', `room-${roomId}`],
    }
  )();

export type RoomDetailType = Awaited<ReturnType<typeof getRoomDetailById>>;

// getRoomForBookingById is cached for 1 hour
export const getRoomForBookingById = async (roomId: bigint) =>
  unstable_cache(
    async () => {
      try {
        const room = await db.room.findUnique({
          where: { id: roomId },
          select: {
            id: true,
            maxCapacity: true,
            regularPrice: true,
            discount: true,
          },
        });

        if (!room) {
          throw new Error(ErrorKey.ROOM_NOT_FOUND);
        }
        return {
          ...room,
          id: room.id.toString(),
        };
      } catch (err) {
        console.error('getRoomForBookingById error:', err);
        throw new Error(ErrorKey.ROOM_FETCH_FAILED);
      }
    },
    [`room-booking-${roomId}`],
    {
      revalidate: 3600,
      tags: ['rooms', `room-${roomId}`],
    }
  )();

export type RoomForBookingType = Awaited<
  ReturnType<typeof getRoomForBookingById>
>;

// --- SETTINGS ---
// getSettings is cached for 2 hours
export const getSettings = unstable_cache(
  async () => {
    try {
      const settings = await db.setting.findFirst({
        select: {
          maxBookingLength: true,
          minBookingLength: true,
          breakfastPrice: true,
        },
      });

      if (!settings) {
        throw new Error(ErrorKey.SETTINGS_NOT_FOUND);
      }

      return settings;
    } catch (err) {
      console.error('getSettings error:', err);
      throw new Error(ErrorKey.SETTINGS_FETCH_FAILED);
    }
  },
  ['settings'],
  { revalidate: 7200, tags: ['settings'] }
);

export type SettingsType = Awaited<ReturnType<typeof getSettings>>;

// --- BOOKING ---
// getBookingById is NOT cached
export const getBookingById = async (bookingId: bigint) => {
  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      numGuests: true,
      hasBreakfast: true,
      observations: true,
      room: {
        select: {
          id: true,
          maxCapacity: true,
          regularPrice: true,
          discount: true,
        },
      },
    },
  });

  if (!booking) {
    throw new Error(ErrorKey.BOOKING_NOT_FOUND);
  }

  return {
    ...booking,
    id: booking.id.toString(),
    room: {
      ...booking.room,
      id: booking.room.id.toString(),
    },
  };
};

// getBookedRangesByRoomId is NOT cached
export const getBookedRangesByRoomId = async (
  roomId: bigint
): Promise<BookingRange[]> => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const bookings = await db.booking.findMany({
    where: {
      roomId,
      OR: [
        {
          endDate: {
            gte: today,
          },
        },
        {
          status: 'checked-in',
        },
      ],
    },
    select: {
      startDate: true,
      endDate: true,
    },
  });

  return bookings.map((booking) => ({
    from: booking.startDate,
    to: booking.endDate,
  }));
};

// --- USERS BOOKINGS ---
// getDashboardBookingsByUserId is cached for 2 minute
export const getDashboardBookingsByUserId = async (userId: string) =>
  unstable_cache(
    async () => {
      try {
        const bookings = await db.booking.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            startDate: true,
            endDate: true,
            room: {
              select: {
                type: true,
              },
            },
          },
        });

        return bookings.map((b) => ({
          ...b,
          id: b.id.toString(),
        }));
      } catch (err) {
        console.error('getDashboardBookingsByUserId error:', err);
        throw new Error(ErrorKey.BOOKINGS_FETCH_FAILED);
      }
    },
    [`dashboard-bookings-${userId}`],
    {
      revalidate: 120,
      tags: [`user-bookings-${userId}`],
    }
  )();

export type DashboardBookingByUserIdResult = Awaited<
  ReturnType<typeof getDashboardBookingsByUserId>
>[number];

// getBookingsByUserId is NOT cached
export const getBookingsListByUserId = async (userId: string) => {
  const bookings = await db.booking.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      numNights: true,
      totalPrice: true,
      numGuests: true,
      createdAt: true,
      room: {
        select: {
          type: true,
          image: true,
        },
      },
    },
  });
  return bookings.map((b) => ({
    ...b,
    id: b.id.toString(),
  }));
};

export type BookingByUserIdResult = Awaited<
  ReturnType<typeof getBookingsListByUserId>
>[number];
