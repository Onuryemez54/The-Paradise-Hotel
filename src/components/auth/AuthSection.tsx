'use client';
import { UserProfile } from './UserProfile';
import { AuthenticationLinks } from './AuthhenticationLinks';
import { useAuth } from '@/context/AuthContext';

interface AuthSectionProps {
  setIsOpen?: (isOpen: boolean) => void;
}

export const AuthSection = ({ setIsOpen }: AuthSectionProps) => {
  const { user, currentUser, isLoading } = useAuth();

  if (!user) {
    return <AuthenticationLinks setIsOpen={setIsOpen} />;
  }

  if (isLoading || !currentUser) {
    return (
      <div className="border-primary-300 h-10 w-10 animate-pulse rounded-full border-2 bg-gray-200" />
    );
  }

  return <UserProfile user={currentUser} setNavOpen={setIsOpen} />;
};
