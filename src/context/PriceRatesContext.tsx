'use client';
import { createContext, useContext } from 'react';
import { Rates } from '@/types/exchangeTypes';

const PriceRatesContext = createContext<Rates | null>(null);

export const PriceRatesProvider = ({
  rates,
  children,
}: {
  rates: Rates;
  children: React.ReactNode;
}) => {
  return (
    <PriceRatesContext.Provider value={rates}>
      {children}
    </PriceRatesContext.Provider>
  );
};

export const useRates = () => {
  const ctx = useContext(PriceRatesContext);
  if (!ctx) {
    throw new Error('useRates must be used within PriceRatesProvider');
  }
  return ctx;
};
