export const isThereBooking = () => {
  const range = localStorage.getItem('booking-range');
  return range !== null;
};
