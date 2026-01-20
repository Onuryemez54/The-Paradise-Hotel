'use client';
import { cn } from '@/utils/utils';
import { ReactNode, useEffect, useState } from 'react';

export const NavbarScrolled = ({ children }: { children: ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'border-border/50 sticky top-0 z-40 border-b px-2 py-2 shadow-2xl transition-colors duration-300 sm:px-10 sm:py-4 md:px-6',
        scrolled ? 'bg-primary-900/80 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      {children}
    </header>
  );
};
