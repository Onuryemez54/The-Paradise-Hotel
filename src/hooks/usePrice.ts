'use client';
import { useLocale } from 'next-intl';
import { Locale } from '@/i18n/routing';
import { Currency, currencyMap, Rates } from '@/types/exchangeTypes';

export const usePrice = (basePriceUSD: number, rates: Rates) => {
  const rawLocale = useLocale();
  const locale: Locale = Object.values(Locale).includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : Locale.EN;
  const currency: Currency = currencyMap[locale] ?? Currency.USD;

  const converted = rates ? basePriceUSD * rates[currency] : basePriceUSD;

  const formatPrice = (value: number = converted) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value);

  return {
    formatPrice,
    isLoading: !rates,
  };
};
