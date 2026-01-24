import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBookingPrice } from '@/hooks/useBookingPrice';

describe('useBookingPrice', () => {
  it('calculates base price correctly without breakfast', () => {
    const { result } = renderHook(() =>
      useBookingPrice({
        nights: 3,
        roomPrice: 100,
        guests: 2,
      })
    );

    expect(result.current.totalPrice).toBe(600);
  });

  it('includes breakfast price when breakfastIncluded is true', () => {
    const { result } = renderHook(() =>
      useBookingPrice({
        nights: 2,
        roomPrice: 100,
        guests: 2,
        breakfastPrice: 10,
        breakfastIncluded: true,
      })
    );

    expect(result.current.totalPrice).toBe(440);
  });

  it('excludes breakfast price when breakfastIncluded is false', () => {
    const { result } = renderHook(() =>
      useBookingPrice({
        nights: 2,
        roomPrice: 100,
        guests: 2,
        breakfastPrice: 10,
        breakfastIncluded: false,
      })
    );

    expect(result.current.totalPrice).toBe(400);
  });

  it('uses default guests value when not provided', () => {
    const { result } = renderHook(() =>
      useBookingPrice({
        nights: 2,
        roomPrice: 100,
      })
    );

    expect(result.current.totalPrice).toBe(200);
  });

  it('uses default breakfastPrice and breakfastIncluded when not provided', () => {
    const { result } = renderHook(() =>
      useBookingPrice({
        nights: 1,
        roomPrice: 80,
        guests: 2,
      })
    );

    expect(result.current.totalPrice).toBe(160);
  });

  it('recalculates price when dependencies change', () => {
    const { result, rerender } = renderHook((props) => useBookingPrice(props), {
      initialProps: {
        nights: 2,
        roomPrice: 100,
        guests: 1,
        breakfastIncluded: false,
      },
    });

    expect(result.current.totalPrice).toBe(200);

    rerender({
      nights: 2,
      roomPrice: 100,
      guests: 3,
      breakfastIncluded: false,
    });

    expect(result.current.totalPrice).toBe(600);
  });
});
