'use server';
import { Rates } from '@/types/exchangeTypes';
import { ErrorKey } from '@/types/i18n/keys';

const CACHE_TTL = 60 * 60 * 1000;
let cachedRates: Rates | null = null;
let lastFetch = 0;

export const getExchangeRates = async (): Promise<Rates> => {
  const now = Date.now();

  if (cachedRates && now - lastFetch < CACHE_TTL) {
    return cachedRates;
  }

  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=USD');

    if (!res.ok) {
      console.error('Failed to fetch exchange rates:', res.status);
      throw new Error(ErrorKey.EXCHANGE_RATE_FAILED);
    }
    const data = await res.json();

    const eur = data?.rates?.EUR;
    const tryRate = data?.rates?.TRY;

    if (typeof eur !== 'number' || typeof tryRate !== 'number') {
      console.error('Invalid exchange rate payload', data);
      throw new Error(ErrorKey.EXCHANGE_RATE_FAILED);
    }

    cachedRates = {
      USD: 1,
      EUR: eur,
      TRY: tryRate,
    };

    lastFetch = now;

    return cachedRates;
  } catch (err) {
    throw new Error(ErrorKey.EXCHANGE_RATE_FAILED);
  }
};
