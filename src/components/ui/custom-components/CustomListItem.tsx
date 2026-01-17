'use client';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import {
  MapPin,
  EyeOff,
  Users,
  Phone,
  Mail,
  Linkedin,
  SlashIcon,
  MessageCircleWarningIcon,
  User2,
  Users2,
  UploadCloudIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { enUS, de, tr } from 'date-fns/locale';
import { useLocale } from 'next-intl';
import { ListItemKey } from '@/types/i18n/keys';

const localeMap = {
  en: enUS,
  de: de,
  tr: tr,
};

type Variant = 'title' | 'small' | 'large' | 'link' | 'xs';

type i18nKey = ListItemKey;

interface Props {
  className?: string;
  variant?: Variant;
  maxGuests?: number;
  wrap?: boolean;
  i18nKey?: i18nKey;
  href?: string;
  created?: Date;
  numGuests?: number;
}

const variantStyles: Record<Variant, string> = {
  title: 'text-sm sm:text-base lg:text-lg  font-bold',
  small: 'text-xs md:text-sm',
  large: 'text-sm sm:text-base text-primary-300',
  link: 'hover:text-accent-400 transition',
  xs: 'text-[8px] sm:text-[10px] text-primary-200 text-center',
};

export const CustomListItem = ({
  variant = 'large',
  maxGuests,
  wrap = false,
  i18nKey,
  className,
  href,
  created,
  numGuests,
}: Props) => {
  const iconClass =
    'text-primary-500 group-hover:text-accent-400 h-4 w-4 transition';
  let icon: ReactNode = null;
  let content: ReactNode = null;
  let keys: string[] = [];
  let values: (string | number)[] = [];

  switch (i18nKey) {
    case ListItemKey.ADDRESS:
      icon = <MapPin className={iconClass} />;
      keys = [
        ListItemKey.ADDRESS_LINE1,
        ListItemKey.ADDRESS_LINE2,
        ListItemKey.ADDRESS_LINE3,
      ];
      break;

    case ListItemKey.PRIVACY:
      icon = <EyeOff className={iconClass} />;
      keys = [ListItemKey.PRIVACY_LINE1, ListItemKey.PRIVACY_LINE2];
      values = ['100 %'];
      break;

    case ListItemKey.GUEST:
      icon = <Users className={iconClass} />;
      keys = [ListItemKey.GUEST_PREFIX, ListItemKey.GUEST_SUFFIX];
      values = [maxGuests ?? 1];
      break;
    case ListItemKey.INVALID_CREDENTIALS:
      icon = <MessageCircleWarningIcon className="h-4 w-4" />;
      keys = [ListItemKey.INVALID_CREDENTIALS];
      break;
    case ListItemKey.UPDATE_PROFILE:
      icon = (
        <UploadCloudIcon
          className={cn(iconClass, 'sm:h-5 sm:w-5 lg:h-6 lg:w-6')}
        />
      );
      keys = [ListItemKey.UPDATE_PROFILE];
      break;
    case ListItemKey.EMAIL:
      icon = <Mail className={iconClass} />;
      content = (
        <Link href="mailto:info@paradisehotel.com" className="hover:underline">
          info@paradisehotel.com
        </Link>
      );
      break;
    case ListItemKey.PHONE:
      icon = <Phone className={iconClass} />;
      content = (
        <Link href="tel:+49123456789" className="hover:underline">
          +49 123 456 789
        </Link>
      );
      break;
    case ListItemKey.MAIL_TO:
      icon = <Mail size={20} />;
      break;
    case ListItemKey.LINKED_IN:
      icon = <Linkedin size={20} />;
      break;
    case ListItemKey.TAGLINE:
      keys = [ListItemKey.TAGLINE];
      break;

    case ListItemKey.RIGHTS:
      keys = [ListItemKey.RIGHTS];
      break;

    case ListItemKey.DESIGNED:
      keys = [ListItemKey.DESIGNED];
      break;
    case ListItemKey.CONTACT:
      keys = [ListItemKey.CONTACT];
      break;
    case ListItemKey.FOLLOW_US:
      keys = [ListItemKey.FOLLOW_US];
      break;
    case ListItemKey.NO_ACCOUNT:
      keys = [ListItemKey.NO_ACCOUNT];
      break;
    case ListItemKey.HAVE_ACCOUNT:
      keys = [ListItemKey.HAVE_ACCOUNT];
      break;
    case ListItemKey.PLEASE_LOGIN:
      keys = [ListItemKey.PLEASE_LOGIN];
      break;
    case ListItemKey.REMEMBER_PASSWORD:
      keys = [ListItemKey.REMEMBER_PASSWORD];
      break;
    case ListItemKey.NO_BOOKINGS:
      keys = [ListItemKey.NO_BOOKINGS];
      break;
    case ListItemKey.NOT_CHANGED:
      keys = [ListItemKey.NOT_CHANGED];
      break;
    case ListItemKey.BOOKED:
      keys = [ListItemKey.BOOKED];
      break;
    case ListItemKey.GUEST_SINGLE:
      icon = <User2 className={iconClass} />;
      keys = [ListItemKey.GUEST_SINGLE];
      break;
    case ListItemKey.GUEST_MULTIPLE:
      icon = <Users2 className={iconClass} />;
      keys = [ListItemKey.GUEST_MULTIPLE];
      break;
    case ListItemKey.WHERE_FROM:
      icon = <MapPin className={iconClass} />;
      keys = [ListItemKey.WHERE_FROM];
      break;
    default:
      break;
  }

  if (content) {
    return (
      <li
        className={cn(
          'font-body group flex items-center gap-3',
          variantStyles[variant],
          className
        )}
      >
        {icon}
        {content}
      </li>
    );
  }

  if (href) {
    return (
      <Link href={href} target="_blank" className={variantStyles[variant]}>
        {icon}
      </Link>
    );
  }

  const t = useTranslations(ListItemKey.TITLE);

  const renderText = () => {
    const items: ReactNode[] = [];

    keys.forEach((key, index) => {
      let text = t(key);

      if (
        i18nKey === ListItemKey.ADDRESS &&
        key === ListItemKey.ADDRESS_LINE3
      ) {
        text = `(${text})`;
      }

      items.push(
        <span key={key} className={cn(index > 0 ? 'mx-1' : '', 'inline-block')}>
          {text}
        </span>
      );

      if (index === 0 && values.length > 0) {
        items.push(
          <span key="val" className="mr-0.5 ml-1 font-semibold">
            {values[0]}
          </span>
        );
      }
    });

    if (i18nKey === ListItemKey.RIGHTS) {
      items.unshift(
        <span key="copyright">
          &copy; 2025
          <span className="font-body mx-1 font-semibold">Paradise Hotel.</span>
        </span>
      );
    }

    if (i18nKey === ListItemKey.BOOKED) {
      const locale = useLocale();
      const dateLocale = localeMap[locale as keyof typeof localeMap] ?? enUS;

      items.push(
        <span key="created" className="text-accent-400/60 ml-1">
          / {format(created!, 'PPpp', { locale: dateLocale })}
        </span>
      );
    }

    if (
      i18nKey === ListItemKey.GUEST_SINGLE ||
      i18nKey === ListItemKey.GUEST_MULTIPLE
    ) {
      items.unshift(
        <span key="numGuests" className="mr-1 font-semibold">
          {numGuests}
        </span>
      );
    }

    return items;
  };

  return (
    <li
      className={cn(
        'font-body group flex items-center gap-2 text-center sm:text-left',
        variantStyles[variant],
        className
      )}
    >
      {icon && icon}

      <span
        className={cn('flex items-center', wrap ? 'flex-wrap' : 'flex-nowrap')}
      >
        {renderText()}
      </span>
    </li>
  );
};
