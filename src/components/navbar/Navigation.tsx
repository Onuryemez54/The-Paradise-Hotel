'use client';
import { ThemeToggleButton } from './ThemeToggleButton';
import { DesktopNavigation } from './DesktopNavigation';
import { LocaleSwitcher } from './LocaleSwitcher';
import { MobileNavigation } from './MobileNavigation';

export const Navigation = () => {
  return (
    <nav className="flex items-center justify-center gap-1 sm:gap-2">
      <DesktopNavigation />
      <MobileNavigation />
      <ThemeToggleButton />
      <LocaleSwitcher />
    </nav>
  );
};
