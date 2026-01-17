'use client';
import { NavLinks } from './NavLinks';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/utils';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { AuthSection } from '../auth/AuthSection';

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [isOpen]);

  return (
    <div className="relative z-50 md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'hover:text-nav-hover-foreground text-nav-foreground cursor-pointer p-1 transition duration-300 ease-in-out hover:scale-105',
          isOpen ? 'rotate-90' : 'rotate-0'
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div
        className={cn(
          'bg-mobile-nav-bg/50 fixed inset-0 transition-opacity duration-300',
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsOpen(false)}
      >
        <ul
          className={cn(
            'animate-in slide-in-from-left from-primary-300 to-primary-900 text-primary-50 fixed top-0 left-0 z-50 flex h-screen w-40 flex-col items-center justify-between overflow-y-auto rounded-r-xl bg-linear-to-br py-16 shadow-2xl transition-transform duration-300 ease-in-out'
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
      </div>
    </div>
  );
};
