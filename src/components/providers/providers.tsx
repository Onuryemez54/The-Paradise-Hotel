import { AuthProvider } from '@/context/AuthContext';
import { ReservationProvider } from '@/context/ReservationContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { getSupabaseSession } from '@/lib/actions/helpers/getSupabaseSession';
import { getCurrentUser } from '@/lib/actions/prisma-actions/db-acitons';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = async ({ children }: ProvidersProps) => {
  const session = await getSupabaseSession();
  const user = session?.user ? session.user : null;
  const currentUser = user ? await getCurrentUser() : null;

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
