import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { DateSelector } from '@/components/common/booking/DateSelector';
import userEvent from '@testing-library/user-event';
import { toastWarning } from '@/test/mocks/toast';

const setRangeMock = vi.fn();
const resetRangeMock = vi.fn();
const setRoomIdMock = vi.fn();
const hydrateRangeFromDBMock = vi.fn();
const evaluateRoomChangeMock = vi.fn();

vi.mock('react-day-picker', () => {
  return {
    DayPicker: ({
      onSelect,
    }: {
      onSelect: (range: { from: Date; to: Date }) => void;
    }) => {
      return (
        <button
          data-testid="fake-daypicker"
          onClick={() =>
            onSelect({
              from: new Date(2026, 1, 10),
              to: new Date(2026, 1, 15),
            })
          }
        >
          Fake Calendar
        </button>
      );
    },
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('When range is undefined , DateSelector', () => {
  vi.mock('@/context/ReservationContext', () => ({
    useReservation: () => ({
      range: undefined,
      guests: 2,
      setRange: setRangeMock,
      resetRange: resetRangeMock,
      setRoomId: setRoomIdMock,
      hydrateRangeFromDB: hydrateRangeFromDBMock,
      evaluateRoomChange: evaluateRoomChangeMock,
    }),
  }));

  it('sets range when selecting a valid date range', async () => {
    const user = userEvent.setup();

    render(
      <DateSelector
        roomID="room-1"
        maxCapacity={2}
        minBookingLength={2}
        maxBookingLength={10}
        bookedRanges={[]}
      />
    );

    const calendar = screen.getByTestId('fake-daypicker');
    await user.click(calendar);

    expect(setRangeMock).toHaveBeenCalledWith({
      from: new Date(2026, 1, 10),
      to: new Date(2026, 1, 15),
    });
  });

  it('shows warning and does not set range when selected dates overlap booked ranges', async () => {
    const user = userEvent.setup();

    render(
      <DateSelector
        roomID="room-1"
        maxCapacity={2}
        minBookingLength={2}
        maxBookingLength={10}
        bookedRanges={[
          {
            from: new Date(2026, 1, 12),
            to: new Date(2026, 1, 20),
          },
        ]}
      />
    );

    const calendar = screen.getByTestId('fake-daypicker');
    await user.click(calendar);

    expect(setRangeMock).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(toastWarning).toHaveBeenCalledWith('INVALID_BOOKING_DATES');
    });
  });

  it('hydrates range from DB when in edit mode', async () => {
    const startDate = new Date(2026, 0, 5);
    const endDate = new Date(2026, 0, 12);

    render(
      <DateSelector
        roomID="room-1"
        maxCapacity={2}
        minBookingLength={2}
        maxBookingLength={10}
        bookedRanges={[]}
        startDate={startDate}
        endDate={endDate}
      />
    );

    expect(hydrateRangeFromDBMock).toHaveBeenCalledWith({
      from: startDate,
      to: endDate,
    });

    expect(setRoomIdMock).not.toHaveBeenCalled();
  });
});

describe('When range is defined , DateSelector', () => {
  vi.mock('@/context/ReservationContext', () => ({
    useReservation: () => ({
      range: {
        from: new Date(2026, 1, 5),
        to: new Date(2026, 1, 10),
      },
      guests: 2,
      setRange: setRangeMock,
      resetRange: resetRangeMock,
      setRoomId: setRoomIdMock,
      hydrateRangeFromDB: hydrateRangeFromDBMock,
      evaluateRoomChange: evaluateRoomChangeMock,
    }),
  }));

  it('calls resetRange when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <DateSelector
        roomID="room-1"
        maxCapacity={2}
        minBookingLength={2}
        maxBookingLength={10}
        bookedRanges={[]}
      />
    );
    const resetButton = screen.getByRole('button', {
      name: /reset date selection/i,
    });
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toBeEnabled();

    await user.click(resetButton);

    expect(resetRangeMock).toHaveBeenCalledTimes(1);
  });
});
