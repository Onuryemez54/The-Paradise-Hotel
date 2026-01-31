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
        'border-border/50 fixed top-0 right-0 left-0 z-40 mx-auto max-w-480 border-b shadow-2xl transition-colors duration-300',
        scrolled ? 'bg-primary-900/80 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="flex items-center justify-between px-2 py-1 sm:px-6 sm:py-4 md:px-10 xl:px-16">
        {children}
      </div>
    </header>
  );
};
