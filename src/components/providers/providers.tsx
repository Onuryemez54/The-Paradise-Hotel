import { AuthProvider } from '@/context/AuthContext';
import { ReservationProvider } from '@/context/ReservationContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { getSupabaseUser } from '@/lib/actions/helpers/getSupabaseUser';
import { getCurrentUser } from '@/lib/actions/prisma-actions/db-acitons';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = async ({ children }: ProvidersProps) => {
  const user = await getSupabaseUser();
  const currentUser = await getCurrentUser();

  return (
    <ThemeProvider>
      <ReservationProvider>
        <AuthProvider initialCurrentUser={currentUser} initialUser={user}>
          {children}
        </AuthProvider>
      </ReservationProvider>
    </ThemeProvider>
  );
};

export default Providers;
