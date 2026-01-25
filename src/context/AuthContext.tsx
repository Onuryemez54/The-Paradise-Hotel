'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  useCallback,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient as createClientBrowser } from '@/db/supabase/client';
import type { User as DbUser } from '@prisma/client';
import { getCurrentUser } from '@/lib/actions/prisma-actions/db-acitons';
import { logout as logoutAction } from '@/lib/actions/auth-actions/logout-action';
import { useReservation } from './ReservationContext';

interface AuthContextValue {
  user: User | null;
  currentUser: DbUser | null;
  isLoading: boolean;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  initialUser: User | null;
}

export const AuthProvider = ({ children, initialUser }: AuthProviderProps) => {
  const { resetAll } = useReservation();

  const [user, setUser] = useState<User | null>(initialUser);
  const [currentUser, setCurrentUser] = useState<DbUser | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const supabaseRef = useRef(createClientBrowser());
  const supabase = supabaseRef.current;

  useEffect(() => {
    if (!user) {
      setCurrentUser(null);
      return;
    }

    const fetchProfile = async () => {
      setIsLoading(true);

      try {
        const dbUser = await getCurrentUser();
        setCurrentUser(dbUser || null);
      } catch (error) {
        console.error('[fetchProfile]', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const supUser = session?.user ?? null;
      setUser(supUser);
      if (!supUser) {
        setCurrentUser(null);
      }
      setIsLoading(true);
      if (supUser) {
        const dbUser = await getCurrentUser();
        setCurrentUser(dbUser || null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = useCallback(async () => {
    try {
      await logoutAction();
    } catch (error) {
      console.error('[logout]', error);
    } finally {
      setUser(null);
      setCurrentUser(null);
      resetAll();
    }
  }, [logoutAction, resetAll]);

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
