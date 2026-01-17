'use client';
import { UserProfile } from './UserProfile';
import Image from 'next/image';
import { AuthenticationLinks } from './AuthhenticationLinks';
import { useAuth } from '@/context/AuthContext';

interface AuthSectionProps {
  setIsOpen?: (isOpen: boolean) => void;
}

export const AuthSection = ({ setIsOpen }: AuthSectionProps) => {
  const { currentUser, isLoading } = useAuth();

  return (
    <>
      {currentUser ? (
        isLoading ? (
          <Image
            width={40}
            height={40}
            className="border-primary-300 cursor-pointer rounded-full border-2"
            src={'/default-user.jpg'}
            alt={'User Avatar'}
          />
        ) : (
          <UserProfile user={currentUser} setNavOpen={setIsOpen} />
        )
      ) : isLoading ? (
        <Image
          width={40}
          height={40}
          className="border-primary-300 cursor-pointer rounded-full border-2"
          src={'/default-user.jpg'}
          alt={'User Avatar'}
        />
      ) : (
        <AuthenticationLinks />
      )}
    </>
  );
};
