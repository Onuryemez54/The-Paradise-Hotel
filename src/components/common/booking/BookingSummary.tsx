'use client';
import { useTranslations } from 'next-intl';
import { cn } from '@/utils/utils';
import { CustomButton } from '@/components/ui/custom-components/CustomButton';
import { usePrice } from '@/hooks/usePrice';
import { Loader, SlashIcon } from 'lucide-react';
import { BookingKey, ButtonKey } from '@/types/i18n/keys';
import { useRates } from '@/context/PriceRatesContext';

interface BookingSummaryProps {
  totalPrice: number;
  numNights: number;
  numGuests: number;
  handleReset: () => void;
  bookingId?: string;
}

export const BookingSummary = ({
  totalPrice,
  numNights,
  numGuests,
  handleReset,
  bookingId,
}: BookingSummaryProps) => {
  const rates = useRates();
  const t = useTranslations(BookingKey.TITLE);
  const { formatPrice, isLoading } = usePrice(totalPrice, rates);
  const nightClass = bookingId
    ? 'text-xs md:text-sm lg:text-base'
    : 'text-sm sm:text-base lg:text-lg 2xl:text-xl';
  const textClass = bookingId ? 'text-xs lg:text-sm' : 'text-sm lg:text-base';

  return (
    <div
      data-testid="booking-summary"
      className={cn(
        'flex flex-col items-center justify-center gap-2 xl:gap-4',
        !bookingId
          ? 'sm:flex-row sm:items-baseline'
          : 'md:flex-row md:items-baseline md:gap-px lg:gap-2'
      )}
    >
      <p className="flex items-center justify-center">
        <span
          className={cn(
            'text-primary-300 inline-flex items-baseline',
            nightClass
          )}
        >
          {t(BookingKey.NIGHTS_IN, { count: numNights })}
        </span>

        <span className={cn('text-accent-500/60 mx-1 items-baseline')}>
          <SlashIcon className="h-[1em] w-[1em]" />
        </span>

        <span className="inline-flex items-baseline gap-1">
          <span className="text-primary-300 hidden text-sm font-semibold sm:inline-block sm:text-lg lg:text-xl 2xl:text-2xl">
            {t(BookingKey.TOTAL_PRICE)}
          </span>

          <span
            data-testid="total-price"
            className="text-accent-400 px-1 text-lg font-bold sm:text-xl lg:text-2xl 2xl:text-3xl"
          >
            {isLoading ? (
              <Loader size={14} className="animate-spin" />
            ) : (
              formatPrice()
            )}
          </span>

          <span className={cn('text-primary-300 font-medium', textClass)}>
            {numGuests > 1
              ? t(BookingKey.FOR_GUESTS, { count: numGuests })
              : t(BookingKey.PER_PERSON)}
          </span>
        </span>
      </p>

      <CustomButton
        className="sm:ml-3"
        variant="tertiary"
        onAction={handleReset}
        i18nKey={bookingId ? ButtonKey.CHANGE : ButtonKey.CLEAR}
      />
    </div>
  );
};
