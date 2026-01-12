'use client';
import { useRates } from '@/context/PriceRatesContext';
import { usePrice } from '@/hooks/usePrice';
import { ListItemKey } from '@/types/i18n/keys';
import { SlashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface RoomPriceProps {
  regularPrice: number;
  discount?: number;
}
export const RoomPrice = ({ regularPrice, discount }: RoomPriceProps) => {
  const rates = useRates();
  const t = useTranslations(ListItemKey.TITLE);

  const finalPrice = discount! > 0 ? regularPrice - discount! : regularPrice;
  const { formatPrice: exchangedFinalPrice } = usePrice(finalPrice, rates);
  const { formatPrice: exchangedRegularPrice } = usePrice(regularPrice, rates);
  return (
    <h2 className="flex items-center gap-2">
      <span className="text-primary-200 text-base font-bold md:text-lg lg:text-xl xl:text-2xl">
        {exchangedFinalPrice()}
      </span>

      {discount! > 0 && (
        <span className="flex items-center gap-1">
          <SlashIcon
            width={18}
            height={18}
            className="text-primary-400 inline-block"
          />

          <span className="text-primary-400 text-sm line-through lg:text-lg">
            {exchangedRegularPrice()}
          </span>
        </span>
      )}
      <span className="text-primary-400 text-xs font-semibold lg:text-sm">
        ({t(ListItemKey.NIGHT)})
      </span>
    </h2>
  );
};
