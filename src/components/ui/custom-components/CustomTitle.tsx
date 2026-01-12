'use client';
import { TitleKey } from '@/types/i18n/keys';
import { RoomType } from '@/types/rooms/room';
import { getRoomContent } from '@/utils/room-helpers/getRoomContent';
import { cn } from '@/utils/utils';
import { HandHeartIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { HTMLAttributes, ReactNode } from 'react';

type Variant = 'main' | 'section' | 'subheading' | 'account';
type i18nKey = TitleKey;

interface CustomTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  variant: Variant;
  children?: ReactNode;
  className?: string;
  i18nKey: i18nKey;
  roomType?: RoomType;
}

const variantStyles: Record<Variant, string> = {
  main: ' tracking-widest duration-700 ease-out sm:text-xl md:text-2xl lg:text-3xl 3xl:text-4xl animate-color-wave',
  section: ' sm:text-2xl lg:text-3xl 2xl:text-4xl text-accent-400',
  subheading: 'sm:text-xl md:text-2xl text-accent-400',
  account: 'text-center text-primary-400 sm:text-2xl lg:text-3xl',
};

const baseClass = 'text-lg font-bold mb-4 font-heading flex items-center gap-1';

export const CustomTitle = ({
  variant,
  children,
  className,
  i18nKey,
  roomType,
}: CustomTitleProps) => {
  const t = useTranslations(TitleKey.TITLE);

  if (i18nKey === TitleKey.CARD || i18nKey === TitleKey.DETAIL) {
    const { name } = getRoomContent(roomType!);
    return (
      <h2 className={cn(baseClass, variantStyles[variant], className)}>
        {name} {children && <>{children}</>}
      </h2>
    );
  }

  if (i18nKey === TitleKey.GREETING) {
    return (
      <h2 className={cn(baseClass, variantStyles[variant], className)}>
        {t(i18nKey!)}
        <span className="ml-1 hidden lg:inline-block">{children}</span>
      </h2>
    );
  }

  if (
    i18nKey === TitleKey.WELCOME_BACK ||
    i18nKey === TitleKey.UPDATE_PROFILE
  ) {
    return (
      <h2 className={cn(baseClass, variantStyles[variant], className)}>
        {t(i18nKey!)} <HandHeartIcon className="mb-1 ml-2 inline-block" />
      </h2>
    );
  }

  return (
    <h2 className={cn(baseClass, variantStyles[variant], className)}>
      {t(i18nKey)}
    </h2>
  );
};
