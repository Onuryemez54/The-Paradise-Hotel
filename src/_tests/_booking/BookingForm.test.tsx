import { beforeEach, describe, it, vi, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { DateRange } from '@/context/ReservationContext';
import { toastError, toastSuccess } from '@/test/mocks/toast';
import { routerMock } from '@/test/mocks/nextNavigation';
import { BookingForm } from '@/components/common/booking/BookingForm';
import userEvent from '@testing-library/user-event';

vi.mock('@/context/PriceRatesContext', () => ({
  useRates: () => ({
    currency: 'USD',
    rate: 1,
  }),
}));

vi.mock('@/hooks/usePrice', () => ({
  usePrice: (totalPrice: number) => ({
    formatPrice: () => `${totalPrice} $`,
    isLoading: false,
  }),
}));

const createBookingActionMock = vi.fn();
const editBookingActionMock = vi.fn();

vi.mock('@/lib/actions/booking-actions/create-booking-action', () => ({
  createBookingAction: (formData: FormData) =>
    createBookingActionMock(formData),
}));

vi.mock('@/lib/actions/booking-actions/edit-booking-action', () => ({
  editBookingAction: (formData: FormData) => editBookingActionMock(formData),
}));

let currentRange: DateRange = {
  from: new Date(2026, 1, 10),
  to: new Date(2026, 1, 15),
};

let currentGuests = 2;
let currentBreakfast = false;
let currentObs = '';

const setGuestsMock = vi.fn();
const setBreakfastIncludedMock = vi.fn();
const setObservationsMock = vi.fn();
const setInvalidReasonMock = vi.fn();
const resetAllMock = vi.fn();

vi.mock('@/context/ReservationContext', () => ({
  useReservation: () => ({
    range: currentRange,
    guests: currentGuests,
    breakfastIncluded: currentBreakfast,
    observations: currentObs,
    invalidReason: 'none',
    mode: 'create',

    setGuests: setGuestsMock,
    setBreakfastIncluded: setBreakfastIncludedMock,
    setObservations: setObservationsMock,
    setInvalidReason: setInvalidReasonMock,
    resetAll: resetAllMock,
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
  createBookingActionMock.mockClear();
  editBookingActionMock.mockClear();

  currentRange = {
    from: new Date(2026, 1, 10),
    to: new Date(2026, 1, 15),
  };
  currentGuests = 2;
  currentBreakfast = false;
  currentObs = '';
});

describe('BookingForm', () => {
  it('submits create booking and redirects on success', async () => {
    const user = userEvent.setup();

    render(
      <BookingForm
        user={{ id: '1', name: 'Onur', image: null } as any}
        roomId="room-1"
        roomPrice={100}
        breakfastPrice={10}
        maxCapacity={3}
        bookedRanges={[]}
        isExternalReset={{ current: false }}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /create_booking/i });

    expect(submitBtn).toBeEnabled();

    await user.click(submitBtn);

    await waitFor(() => {
      expect(createBookingActionMock).toHaveBeenCalledTimes(1);
    });

    const formData = createBookingActionMock.mock.calls[0][0] as FormData;

    expect(formData.get('roomId')).toBe('room-1');
    expect(formData.get('numGuests')).toBe('2');
    expect(formData.get('numNights')).toBe('5');

    expect(toastSuccess).toHaveBeenCalledWith('BOOKING_CREATED', 2000, true);

    expect(resetAllMock).toHaveBeenCalled();

    expect(routerMock.replace).toHaveBeenCalledWith('/account/bookings');
  });

  it('shows error toast and does not redirect when create booking fails', async () => {
    const user = userEvent.setup();
    createBookingActionMock.mockRejectedValueOnce(
      new Error('BOOKING_CREATE_FAILED')
    );

    render(
      <BookingForm
        user={{ id: '1', name: 'Onur', image: null } as any}
        roomId="room-1"
        roomPrice={100}
        breakfastPrice={10}
        maxCapacity={3}
        bookedRanges={[]}
        isExternalReset={{ current: false }}
      />
    );
    const submitBtn = screen.getByRole('button', { name: /create_booking/i });

    expect(submitBtn).toBeEnabled();
    await user.click(submitBtn);

    await waitFor(() => {
      expect(createBookingActionMock).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith('BOOKING_CREATE_FAILED');
    });

    await waitFor(() => {
      expect(routerMock.replace).not.toHaveBeenCalled();
    });
  });

  it('submits edit booking with initial values and calls editBookingAction', async () => {
    const user = userEvent.setup();

    vi.doMock('@/context/ReservationContext', () => ({
      useReservation: () => ({
        range: currentRange,
        guests: 3,
        breakfastIncluded: true,
        observations: 'Old note',
        invalidReason: 'none',
        mode: 'edit',

        setGuests: setGuestsMock,
        setBreakfastIncluded: setBreakfastIncludedMock,
        setObservations: setObservationsMock,
        setInvalidReason: setInvalidReasonMock,
        resetAll: resetAllMock,
      }),
    }));

    const { BookingForm: FreshBookingForm } =
      await import('@/components/common/booking/BookingForm');

    render(
      <FreshBookingForm
        user={{ id: '1', name: 'Onur', image: null } as any}
        roomId="room-1"
        roomPrice={100}
        breakfastPrice={10}
        maxCapacity={6}
        bookedRanges={[]}
        isExternalReset={{ current: false }}
        bookingId="booking-123"
        initialGuests={3}
        initialBreakfast={true}
        initialObservation="Old note"
      />
    );

    const guestsSelect = screen.getByRole('combobox');
    expect(guestsSelect).toHaveTextContent('3');

    const observationsTextarea = screen.getByRole('textbox');
    expect(observationsTextarea).toHaveValue('Old note');

    const breakfastCheckbox = screen.getByRole('checkbox');
    expect(breakfastCheckbox).toBeChecked();

    const submitBtn = screen.getByRole('button');

    await user.clear(observationsTextarea);
    await user.type(observationsTextarea, 'New text');

    expect(observationsTextarea).toHaveValue('New text');

    await user.click(submitBtn);

    await waitFor(() => {
      expect(editBookingActionMock).toHaveBeenCalledTimes(1);
    });

    const formData = editBookingActionMock.mock.calls[0][0] as FormData;

    expect(formData.get('bookingId')).toBe('booking-123');
    expect(formData.get('numGuests')).toBe('3');
    expect(formData.get('observations')).toBe('New text');
    expect(formData.get('numNights')).toBe('5');

    expect(toastSuccess).toHaveBeenCalledWith('BOOKING_UPDATED', 2000, true);

    expect(resetAllMock).toHaveBeenCalled();
    expect(routerMock.replace).toHaveBeenCalledWith('/account/bookings');
  });
});
