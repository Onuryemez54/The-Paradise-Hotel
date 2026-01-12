'use client';
import { useReservation } from '@/context/ReservationContext';
import { BookingKey } from '@/types/i18n/keys';
import { ArrowRight, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { DateRangeDisplay } from '../account/bookings/DateRangeDisplay';

export const BookingReminder = () => {
  const t = useTranslations(BookingKey.TITLE);
  const { roomId, mode, range, resetAll } = useReservation();
  const { from, to } = range;

  if (!from || !to || mode === 'edit') return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-full max-w-xl -translate-x-1/2">
      <div className="bg-btn-primary-bg relative flex items-center justify-center gap-1 rounded-2xl px-6 py-4 shadow-2xl">
        <button
          onClick={resetAll}
          aria-label="Remove reminder"
          className="text-primary-100/70 hover:text-primary-100 absolute top-2 right-2 cursor-pointer rounded-full p-1 transition hover:bg-white/10"
        >
          <X className="3xl:h-7 3xl:w-7 h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div className="flex flex-col items-center justify-center gap-1">
          <DateRangeDisplay startDate={from} endDate={to} />
          <p className="text-primary-100 3xl:text-lg text-center text-xs font-medium lg:text-sm">
            "{t(BookingKey.REMINDER)}"
          </p>
        </div>

        <Link
          href={`/rooms/${roomId}`}
          className="text-primary-200 mt-6 ml-4 font-bold transition-transform duration-300 hover:translate-x-1"
        >
          <ArrowRight className="3xl:h-7 3xl:w-7 h-6 w-6 animate-pulse" />
        </Link>
      </div>
    </div>
  );
};
