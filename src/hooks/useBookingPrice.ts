import { useMemo } from 'react';

interface UseBookingPriceParams {
  nights: number;
  roomPrice: number;
  guests?: number;
  breakfastPrice?: number;
  breakfastIncluded?: boolean;
}

export const useBookingPrice = ({
  nights,
  roomPrice,
  guests = 1,
  breakfastPrice = 0,
  breakfastIncluded = false,
}: UseBookingPriceParams) => {
  return useMemo(() => {
    const basePrice = nights * guests * roomPrice;

    const breakfastTotal = breakfastIncluded
      ? nights * guests * breakfastPrice
      : 0;

    const totalPrice = basePrice + breakfastTotal;

    return {
      totalPrice,
    };
  }, [nights, guests, roomPrice, breakfastPrice, breakfastIncluded]);
};
