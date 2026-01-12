import { Locale } from '@/i18n/routing';

export enum Currency {
  USD = 'USD',
  TRY = 'TRY',
  EUR = 'EUR',
}

export const currencyMap: Record<Locale, Currency> = {
  [Locale.EN]: Currency.USD,
  [Locale.TR]: Currency.TRY,
  [Locale.DE]: Currency.EUR,
} as const;

export type Rates = Record<Currency, number>;
