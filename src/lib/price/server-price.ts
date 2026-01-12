import { Locale } from '@/i18n/routing';
import { getExchangeRates } from './exchange-rates';
import { Currency, currencyMap } from '@/types/exchangeTypes';

export const formatServerPrice = async (
  amountUSD: number,
  locale: Locale
): Promise<string> => {
  const currency = currencyMap[locale] ?? Currency.USD;
  const rates = await getExchangeRates();

  const converted = amountUSD * rates[currency];

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(converted);
};
