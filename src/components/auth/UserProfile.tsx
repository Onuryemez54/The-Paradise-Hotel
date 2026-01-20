'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarCheck, LogOutIcon, SettingsIcon, User } from 'lucide-react';
import { cn } from '@/utils/utils';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ButtonKey, NavKey } from '@/types/i18n/keys';
import { CustomButton } from '../ui/custom-components/CustomButton';
import { UserImage } from '../common/UserImage';
import { User as DbUser } from '@prisma/client';

interface UserProfileProps {
  user: DbUser;
  setNavOpen?: (isOpen: boolean) => void;
}

const DEFAULT_AVATAR = '/icons/default-user.png';

export const UserProfile = ({ user, setNavOpen }: UserProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState<string>(user.image || DEFAULT_AVATAR);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations(NavKey.TITLE);
  const pathname = usePathname();

  useEffect(() => {
    if (user.image && user.image.trim().length > 0) {
      setAvatar(user.image);
    }
  }, [user.image]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (
        dropdownRef.current &&
        target &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const profileItems = useMemo(
    () => [
      {
        label: t(NavKey.PROFILE),
        href: '/account' as const,
        icon: <User size={16} />,
      },
      {
        label: t(NavKey.SETTINGS),
        href: '/account/settings' as const,
        icon: <SettingsIcon size={16} />,
      },
      {
        label: t(NavKey.BOOKINGS),
        href: '/account/bookings' as const,
        icon: <CalendarCheck size={16} />,
      },
    ],
    [t]
  );

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  return (
    <div key={avatar} ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="cursor-pointer rounded-full"
      >
        <UserImage image={avatar} />
      </button>

      <div
        className={cn(
          'bg-primary-800 border-border/50 absolute -top-38 -right-15 rounded-lg border shadow-lg transition-all duration-300 sm:-top-44 md:top-12 md:right-0',
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        <ul onClick={handleClose} className="space-y-1 text-xs sm:text-sm">
          {profileItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setNavOpen?.(false)}
                  className={cn(
                    'group font-body flex cursor-pointer items-center gap-2 px-4 py-2 font-medium transition-colors duration-300',
                    item.label === t(NavKey.PROFILE) ? 'rounded-t-lg' : '',
                    isActive
                      ? 'text-sidebar-active-foreground bg-sidebar-active-bg'
                      : 'hover:bg-sidebar-hover-bg hover:text-sidebar-hover-foreground text-sidebar-foreground'
                  )}
                >
                  <span className="group-hover:text-sidebar-active-foreground">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}

          <CustomButton
            variant="logout"
            mode="nav"
            as="li"
            onAction={() => setNavOpen?.(false)}
            className="font-normal"
            i18nKey={ButtonKey.LOGOUT}
            icon={<LogOutIcon size={16} />}
          />
        </ul>
      </div>
    </div>
  );
};
