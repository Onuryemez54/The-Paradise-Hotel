import {
  getBookedRangesByRoomId,
  getCurrentUser,
  getRoomForBookingById,
  getSettings,
} from '@/lib/actions/db-acitons';
import { RoomBookingClient } from '@/components/common/booking/RoomBookingClient';
import { ScrollReveal } from '@/components/common/animation/ScrollReveal';

export const RoomBooking = async ({ roomId }: { roomId: string }) => {
  const [settings, bookedRanges, currentUser, room] = await Promise.all([
    getSettings(),
    getBookedRangesByRoomId(BigInt(roomId)),
    getCurrentUser(),
    getRoomForBookingById(BigInt(roomId)),
  ]);

  return (
    <ScrollReveal>
      <RoomBookingClient
        room={room}
        settings={settings}
        bookedRanges={bookedRanges}
        user={currentUser}
      />
    </ScrollReveal>
  );
};
