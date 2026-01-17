'use client';
import { isRangeOverlapping } from '@/utils/booking-helpers/isRangeOverlapping';
import { BookingRange } from '@/utils/booking-helpers/types';
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';

const clearBookingLocalStorage = () => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
};

type InvalidReason = 'none' | 'range' | 'guest' | 'range_and_guest';

enum STORAGE_KEYS {
  RANGE = 'booking-range',
  GUESTS = 'booking-guests',
  BREAKFAST = 'booking-breakfast',
  OBSERVATIONS = 'booking-observations',
  ROOM_ID = 'booking-room-id',
}

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}
type Mode = 'create' | 'edit';

interface ReservationContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;

  range: DateRange;
  setRange: (range: DateRange) => void;

  guests: number;
  setGuests: (value: number) => void;

  breakfastIncluded: boolean;
  setBreakfastIncluded: (value: boolean) => void;

  observations: string;
  setObservations: (value: string) => void;

  roomId: string;
  setRoomId: (roomId: string) => void;

  hydrateRangeFromDB: (dbRange: DateRange) => void;

  evaluateRoomChange: (
    range: DateRange,
    bookedRanges: BookingRange[],
    guests: number,
    maxCapacity: number
  ) => void;

  invalidReason: InvalidReason;
  setInvalidReason: (reason: InvalidReason) => void;

  resetRange: () => void;
  resetAll: () => void;
}

const ReservationContext = createContext<ReservationContextType | null>(null);

const INITIAL_RANGE: DateRange = {
  from: undefined,
  to: undefined,
};
const INITIAL_GUESTS = 1;
const INITIAL_BREAKFAST = false;
const INITIAL_OBSERVATIONS = '';
const INITIAL_ROOM_ID = '0';

export const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<Mode>('create');
  const [roomId, setRoomIdState] = useState<string>(INITIAL_ROOM_ID);
  const [range, setRangeState] = useState<DateRange>(INITIAL_RANGE);
  const [guests, setGuestsState] = useState<number>(INITIAL_GUESTS);
  const [observations, setObservationsState] =
    useState<string>(INITIAL_OBSERVATIONS);
  const [breakfastIncluded, setBreakfastIncludedState] =
    useState<boolean>(INITIAL_BREAKFAST);
  const [invalidReason, setInvalidReason] = useState<InvalidReason>('none');

  const setMode = useCallback(
    (nextMode: Mode) => {
      setModeState(nextMode);
    },
    [mode]
  );

  const prevModeRef = useRef<Mode | null>(null);
  useEffect(() => {
    if (prevModeRef.current === 'edit' && mode === 'create') {
      setRangeState(INITIAL_RANGE);
      setGuestsState(INITIAL_GUESTS);
      setBreakfastIncludedState(INITIAL_BREAKFAST);
      setObservationsState(INITIAL_OBSERVATIONS);
      setRoomIdState(INITIAL_ROOM_ID);
      clearBookingLocalStorage();
    }
    prevModeRef.current = mode;
  }, [mode]);

  const hydrateRangeFromDB = useCallback((dbRange: DateRange) => {
    setRangeState(dbRange);
  }, []);

  useEffect(() => {
    if (mode !== 'create') return;

    const storedRange = localStorage.getItem(STORAGE_KEYS.RANGE);
    const storedGuests = localStorage.getItem(STORAGE_KEYS.GUESTS);
    const storedBreakfast = localStorage.getItem(STORAGE_KEYS.BREAKFAST);
    const storedObs = localStorage.getItem(STORAGE_KEYS.OBSERVATIONS);
    const storedRoomId = localStorage.getItem(STORAGE_KEYS.ROOM_ID);

    if (storedRoomId) {
      setRoomIdState(storedRoomId);
    }

    if (storedRange) {
      const parsed = JSON.parse(storedRange);
      setRangeState({
        from: parsed.from ? new Date(parsed.from) : undefined,
        to: parsed.to ? new Date(parsed.to) : undefined,
      });
    }

    if (storedGuests) setGuestsState(Number(storedGuests));
    if (storedBreakfast) setBreakfastIncludedState(JSON.parse(storedBreakfast));
    if (storedObs) setObservationsState(storedObs);
  }, [mode]);

  const setRoomId = useCallback(
    (value: string) => {
      setRoomIdState(value);
      if (mode === 'create') {
        localStorage.setItem(STORAGE_KEYS.ROOM_ID, value);
      }
    },
    [mode]
  );

  // catch roomId changes to check for overlaps
  const evaluateRoomChange = (
    range: DateRange,
    bookedRanges: BookingRange[],
    guests: number,
    maxCapacity: number
  ) => {
    if (mode === 'edit') {
      setInvalidReason('none');
      return;
    }

    if (!range.from || !range.to) {
      setInvalidReason('none');
      return;
    }

    const overlapping = isRangeOverlapping(
      { from: range.from, to: range.to },
      bookedRanges
    );

    const guestInvalid = guests > maxCapacity;

    if (overlapping && guestInvalid) {
      setInvalidReason('range_and_guest');
      return;
    }

    if (overlapping) {
      setInvalidReason('range');
      return;
    }

    if (guestInvalid) {
      setInvalidReason('guest');
      return;
    }

    setInvalidReason('none');
  };

  const setRange = useCallback(
    (value: DateRange) => {
      setRangeState(value);
      if (mode === 'create') {
        localStorage.setItem(STORAGE_KEYS.RANGE, JSON.stringify(value));
      }
    },
    [mode]
  );

  const setGuests = useCallback(
    (value: number) => {
      setGuestsState(value);
      if (mode === 'create') {
        localStorage.setItem(STORAGE_KEYS.GUESTS, value.toString());
      }
    },
    [mode]
  );

  const setBreakfastIncluded = useCallback(
    (value: boolean) => {
      setBreakfastIncludedState(value);
      if (mode === 'create') {
        localStorage.setItem(STORAGE_KEYS.BREAKFAST, JSON.stringify(value));
      }
    },
    [mode]
  );

  const setObservations = useCallback(
    (value: string) => {
      setObservationsState(value);
      if (mode === 'create') {
        localStorage.setItem(STORAGE_KEYS.OBSERVATIONS, value);
      }
    },
    [mode]
  );

  const resetRange = useCallback(() => {
    setRangeState(INITIAL_RANGE);
    setRoomIdState(INITIAL_ROOM_ID);
    localStorage.removeItem(STORAGE_KEYS.RANGE);
    localStorage.removeItem(STORAGE_KEYS.ROOM_ID);
  }, []);

  const resetAll = useCallback(() => {
    setRangeState(INITIAL_RANGE);
    setGuestsState(INITIAL_GUESTS);
    setBreakfastIncludedState(INITIAL_BREAKFAST);
    setObservationsState(INITIAL_OBSERVATIONS);
    setRoomIdState(INITIAL_ROOM_ID);
    clearBookingLocalStorage();
  }, []);

  return (
    <ReservationContext.Provider
      value={{
        mode,
        setMode,
        range,
        setRange,
        resetRange,
        guests,
        setGuests,
        breakfastIncluded,
        observations,
        setObservations,
        setBreakfastIncluded,
        hydrateRangeFromDB,
        roomId,
        setRoomId,
        evaluateRoomChange,
        invalidReason,
        setInvalidReason,
        resetAll,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }

  return context;
};
