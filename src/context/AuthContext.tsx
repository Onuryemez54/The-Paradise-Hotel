'use client';
import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/db/supabase/client';
import { useRouter } from 'next/navigation';
import type { User as DbUser } from '@prisma/client';
import { getCurrentUser } from '@/lib/actions/prisma-actions/db-acitons';
import { logout } from '@/lib/actions/auth-actions/logout-action';
import { useReservation } from './ReservationContext';

interface AuthContextValue {
  user: User | null;
  currentUser: DbUser | null;
  isLoading: boolean;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<DbUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { resetAll } = useReservation();

  const supabase = createClient();

  const hydrateUser = async (supabaseUser: User | null) => {
    if (!supabaseUser) {
      setUser(null);
      setCurrentUser(null);
      return;
    }

    setUser(supabaseUser);

    const dbUser = await getCurrentUser();
    setCurrentUser(dbUser || null);
  };

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      setIsLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      await hydrateUser(session?.user ?? null);
      setIsLoading(false);
    };

    init();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        await hydrateUser(session?.user ?? null);
      }
    );

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.refresh();
      router.push('/');
      resetAll();
    } catch (error) {
      console.error('[logout]', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser,
        isLoading,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
