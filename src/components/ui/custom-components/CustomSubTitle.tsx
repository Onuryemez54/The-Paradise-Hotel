'use client';
import { SubTitleKey } from '@/types/i18n/keys';
import { RoomType } from '@/types/rooms/room';
import { getRoomContent } from '@/utils/room-helpers/getRoomContent';
import { cn } from '@/utils/utils';
import { useTranslations } from 'next-intl';
import { HTMLAttributes, ReactNode } from 'react';

type Variant = 'main' | 'section' | 'account';

type i18nKey = SubTitleKey;

interface CustomSubTitleProps extends HTMLAttributes<HTMLParagraphElement> {
  variant: Variant;
  children?: ReactNode;
  className?: string;
  i18nKey: i18nKey;
  roomType?: RoomType;
  values?: Record<string, string | number>;
}

const variantStyles: Record<Variant, string> = {
  main: 'mb-8 text-sm md:text-base 2xl:text-lg text-primary-300',
  section: 'text-sm sm:text-lg text-primary-200',
  account:
    'text-center text-primary-200/80 mb-4 text-sm sm:text-base lg:text-lg',
};

const baseClass = 'font-light font-body leading-relaxed ';

export const CustomSubTitle = ({
  variant,
  className,
  i18nKey,
  roomType,
  values,
}: CustomSubTitleProps) => {
  const t = useTranslations(SubTitleKey.TITLE);

  if (i18nKey === SubTitleKey.DETAIL) {
    const { description } = getRoomContent(roomType!);
    return (
      <p className={cn(baseClass, variantStyles[variant], className)}>
        {description}
      </p>
    );
  }

  if (i18nKey === SubTitleKey.LOCATION) {
    return (
      <p className={cn(baseClass, variantStyles[variant], className)}>
        {t.rich(i18nKey, {
          strong: (chunk) => (
            <span className="text-accent-300 font-semibold">{chunk}</span>
          ),
        })}
      </p>
    );
  }

  if (i18nKey === SubTitleKey.ABOUT || i18nKey === SubTitleKey.STORY) {
    const paragraphs = t.raw(i18nKey) as string[];

    return (
      <div className={cn(baseClass, variantStyles[variant], 'space-y-6')}>
        {paragraphs.map((text, index) => (
          <p key={index}>
            {index === 0 && values
              ? text.replace('{count}', String(values.count))
              : text}
          </p>
        ))}
      </div>
    );
  }

  return (
    <p className={cn(baseClass, variantStyles[variant], className)}>
      {t(i18nKey)}
    </p>
  );
};
