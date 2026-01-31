'use client';
import { DateRange as CustomDateRange } from '@/context/ReservationContext';
import { ButtonKey } from '@/types/i18n/keys';
import { BookingRange } from '@/utils/booking-helpers/types';
import { cn } from '@/utils/utils';
import { isPast, isWithinInterval, subDays } from 'date-fns';
import { de, enUS, tr } from 'date-fns/locale';
import { Delete } from 'lucide-react';
import { useLocale } from 'next-intl';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type Props = {
  range: CustomDateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
  bookedRanges: BookingRange[];
  minNights?: number;
  maxNights?: number;
  isEditMode?: boolean;
  handleReset?: () => void;
};

const localeMap = {
  en: enUS,
  de: de,
  tr: tr,
};

export const BookingDatePicker = ({
  range,
  onSelect,
  bookedRanges,
  minNights,
  maxNights,
  isEditMode,
  handleReset,
}: Props) => {
  const locale = useLocale();
  const dateLocale = localeMap[locale as keyof typeof localeMap] ?? enUS;

  return (
    <div data-testid="booking-date-picker" className="relative">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={onSelect}
        locale={dateLocale}
        weekStartsOn={1}
        numberOfMonths={2}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 11)}
        captionLayout="dropdown"
        min={minNights}
        max={maxNights}
        className="rdp bg-primary-900/60 rounded-3xl p-2 sm:p-1 md:p-4"
        classNames={{
          months: cn(
            'flex flex-col gap-2',
            isEditMode ? 'lg:flex-row' : 'md:flex-row md:gap-4',
            'lg:gap-10'
          ),
          month: 'space-y-2 sm:space-y-3',
        }}
        disabled={(date) =>
          isPast(date) ||
          bookedRanges.some((booking) =>
            isWithinInterval(date, {
              start: booking.from,
              end: subDays(booking.to, 1),
            })
          )
        }
      />
      <button
        disabled={!range?.from || !range?.to}
        title={isEditMode ? ButtonKey.CHANGE : ButtonKey.CLEAR}
        aria-label="Reset Date Selection"
        className={cn(
          'text-primary-300 hover:text-accent-500 absolute right-2 bottom-2 cursor-pointer transition-all duration-300 hover:-translate-x-1 disabled:cursor-not-allowed',
          !range?.from || !range?.to
            ? 'pointer-events-none cursor-not-allowed opacity-50'
            : ''
        )}
        onClick={handleReset}
      >
        <Delete className="h-5 w-5 md:h-6 md:w-6" />
      </button>
    </div>
  );
};
