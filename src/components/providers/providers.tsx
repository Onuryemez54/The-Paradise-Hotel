import { AuthProvider } from '@/context/AuthContext';
import { ReservationProvider } from '@/context/ReservationContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { createClient } from '@/db/supabase/server';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = async ({ children }: ProvidersProps) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <ThemeProvider>
      <ReservationProvider>
        <AuthProvider initialUser={user}>{children}</AuthProvider>
      </ReservationProvider>
    </ThemeProvider>
  );
};

export default Providers;
