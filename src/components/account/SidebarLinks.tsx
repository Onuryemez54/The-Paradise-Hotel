'use client';
import {
  CalendarCog,
  HomeIcon,
  LogOutIcon,
  RotateCcwKey,
  UserCog,
} from 'lucide-react';
import { CustomButton } from '../ui/custom-components/CustomButton';
import { cn } from '@/utils/utils';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ButtonKey, NavKey } from '@/types/i18n/keys';
import { useMemo } from 'react';

export const SidebarLinks = () => {
  const pathName = usePathname();
  const t = useTranslations(NavKey.TITLE);

  const navLinks = useMemo(
    () => [
      {
        href: '/account' as const,
        icon: <HomeIcon />,
        label: t(NavKey.DASHBOARD),
      },
      {
        href: '/account/settings' as const,
        icon: <UserCog />,
        label: t(NavKey.SETTINGS),
      },
      {
        href: '/account/settings/update-password' as const,
        icon: <RotateCcwKey />,
        label: t(NavKey.UPDATE_PASSWORD),
      },
      {
        href: '/account/bookings' as const,
        icon: <CalendarCog />,
        label: t(NavKey.BOOKINGS),
      },
    ],
    [t]
  );

  return (
    <div className="flex h-full w-full flex-row flex-wrap items-center justify-between sm:flex-col sm:items-stretch sm:gap-4">
      <ul className="flex gap-4 sm:flex-col sm:gap-3">
        {navLinks.map((link) => {
          const isActive = pathName === link.href;
          return (
            <Link key={link.href} href={link.href} className="w-full">
              <li
                title={link.label}
                key={link.href}
                className={cn(
                  'group flex items-center justify-center gap-3 rounded-xl p-2 text-sm font-medium transition-all duration-300 lg:px-4 lg:py-3 lg:text-base xl:text-lg',
                  isActive
                    ? 'text-sidebar-active-foreground bg-sidebar-active-bg'
                    : 'hover:bg-sidebar-hover-bg hover:text-sidebar-hover-foreground text-sidebar-foreground'
                )}
              >
                <span className="group-hover:text-sidebar-active-foreground">
                  {link.icon}
                </span>
                <span className="hidden flex-1 sm:inline-block">
                  {link.label}
                </span>
              </li>
            </Link>
          );
        })}
      </ul>
      <CustomButton
        variant="logout"
        mode="account"
        i18nKey={ButtonKey.LOGOUT}
        as="li"
        icon={<LogOutIcon size={20} />}
      />
    </div>
  );
};
