'use client';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/utils';
import { BrandLogo } from '../common/BrandLogo';
import { NavLinks } from './NavLinks';
import { AuthSection } from '../auth/AuthSection';

export const MobileSidebarPortal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        'bg-mobile-nav-bg/50 fixed inset-0 z-60 flex transition-opacity duration-300 md:hidden',
        isOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      )}
      onClick={() => setIsOpen(false)}
    >
      <ul
        className={cn(
          'animate-in slide-in-from-left from-primary-300 to-primary-900 text-primary-50 fixed top-0 left-0 z-70 flex h-dvh w-40 flex-col items-center justify-between overflow-y-auto rounded-r-xl bg-linear-to-br py-16 shadow-2xl transition-transform duration-300 ease-in-out'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-center gap-6">
          <li>
            <BrandLogo setIsOpen={setIsOpen} />
          </li>
          <NavLinks setIsOpen={setIsOpen} />
        </div>
        <AuthSection setIsOpen={setIsOpen} />
      </ul>
    </div>,
    document.body
  );
};
