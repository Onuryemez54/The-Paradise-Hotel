'use client';
import { AuthProvider } from '@/context/AuthContext';
import { ReservationProvider } from '@/context/ReservationContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider>
      <ReservationProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReservationProvider>
    </ThemeProvider>
  );
};

export default Providers;
