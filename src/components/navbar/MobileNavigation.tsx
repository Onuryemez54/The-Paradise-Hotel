'use client';
import { cn } from '@/utils/utils';
import { Menu, X } from 'lucide-react';
import { MobileSidebarPortal } from './MobileSidebarPortal';
import { useEffect, useState } from 'react';

export const MobileNavigation = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsOpen(false);
      }
    };

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="flex md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'hover:text-nav-hover-foreground text-nav-foreground cursor-pointer p-1 transition duration-300 ease-in-out hover:scale-105',
          isOpen ? 'rotate-90' : 'rotate-0'
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <MobileSidebarPortal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
