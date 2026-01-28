'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  useCallback,
  useMemo,
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
  refreshCurrentUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  initialUser: User | null;
  initialCurrentUser: DbUser | null;
}

export const AuthProvider = ({
  children,
  initialUser,
  initialCurrentUser,
}: AuthProviderProps) => {
  const { resetAll } = useReservation();

  const [user, setUser] = useState<User | null>(initialUser);
  const [currentUser, setCurrentUser] = useState<DbUser | null>(
    initialCurrentUser
  );
  const [isLoading, setIsLoading] = useState(false);

  const supabaseRef = useRef(createClientBrowser());
  const supabase = supabaseRef.current;

  const isInitialSync = useRef(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (isInitialSync.current) {
        isInitialSync.current = false;
        return;
      }

      if (event === 'SIGNED_OUT') {
        setUser(null);
        setCurrentUser(null);
        resetAll();
        return;
      }

      if (event === 'SIGNED_IN' && session?.user) {
        setIsLoading(true);
        setUser(session.user);
        try {
          const dbUser = await getCurrentUser();
          setCurrentUser(dbUser || null);
        } finally {
          setIsLoading(false);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, resetAll]);

  const refreshCurrentUser = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const dbUser = await getCurrentUser();
      setCurrentUser(dbUser || null);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const handleLogout = useCallback(async () => {
    try {
      await logoutAction();
    } finally {
      setUser(null);
      setCurrentUser(null);
      resetAll();
    }
  }, [resetAll]);

  const value = useMemo(
    () => ({
      user,
      currentUser,
      isLoading,
      handleLogout,
      refreshCurrentUser,
    }),
    [user, currentUser, isLoading, handleLogout, refreshCurrentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
