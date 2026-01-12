import { RoomBookingClient } from '@/components/common/booking/RoomBookingClient';
import {
  getBookedRangesByRoomId,
  getBookingById,
  getCurrentUser,
  getSettings,
} from '@/lib/actions/db-acitons';

export const EditBooking = async ({ bookingId }: { bookingId: string }) => {
  const [currentUser, settings, booking] = await Promise.all([
    getCurrentUser(),
    getSettings(),
    getBookingById(BigInt(bookingId)),
  ]);
  const room = booking.room;
  const startDate = booking.startDate;
  const endDate = booking.endDate;
  const numGuests = booking.numGuests;
  const hasBreakfast = booking.hasBreakfast;
  const observations = booking.observations;

  const bookedRanges = await getBookedRangesByRoomId(BigInt(room.id));

  return (
    <RoomBookingClient
      room={room}
      settings={settings}
      bookedRanges={bookedRanges}
      user={currentUser}
      bookingId={bookingId}
      startDate={startDate}
      endDate={endDate}
      initialGuests={numGuests}
      initialBreakfast={hasBreakfast}
      initialObservation={observations || ''}
    />
  );
};
