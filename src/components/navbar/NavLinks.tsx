'use client';
import { useMemo } from 'react';
import { cn } from '@/utils/utils';
import { AuthSection } from '../auth/AuthSection';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { NavKey } from '@/types/i18n/keys';

interface NavLinksProps {
  setIsOpen?: (isOpen: boolean) => void;
}

export const NavLinks = ({ setIsOpen }: NavLinksProps) => {
  const t = useTranslations(NavKey.TITLE);

  const navLinks = useMemo(
    () => [
      { href: '/' as const, label: t(NavKey.HOME) },
      { href: '/rooms' as const, label: t(NavKey.ROOMS) },
      { href: '/about' as const, label: t(NavKey.ABOUT) },
    ],
    [t]
  );

  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        const linkClass = isActive
          ? 'text-nav-active-foreground font-bold'
          : !setIsOpen
            ? 'text-nav-foreground hover:text-nav-hover-foreground'
            : 'text-primary-200 hover:text-accent-400';
        return (
          <li key={link.href} onClick={() => setIsOpen && setIsOpen(false)}>
            <Link
              href={link.href}
              className={cn(
                'font-body relative px-1 py-2 text-[18px] font-semibold tracking-wide transition-all duration-300 md:px-2 lg:px-3 lg:text-xl',
                linkClass
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
      <div className="hidden md:flex">
        <AuthSection />
      </div>
    </>
  );
};
