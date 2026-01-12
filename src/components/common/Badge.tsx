'use client';
import { BadgeKey } from '@/types/i18n/keys';
import { cn } from '@/utils/utils';
import { useTranslations } from 'next-intl';

type Variant = 'primary' | 'secondary' | 'tertiary';
type I18nKey = BadgeKey;

interface BadgeProps {
  variant: Variant;
  i18nKey: I18nKey;
  className?: string;
}
const baseClass =
  'flex h-5 sm:h-7 items-center rounded-full px-1 sm:px-3 text-[8px] font-bold uppercase sm:text-xs';

const modeStyles: Record<Variant, string> = {
  primary: 'bg-green-600 text-green-200',
  secondary: 'bg-yellow-600 text-yellow-200',
  tertiary: 'bg-red-600 text-red-200',
};
export const Badge = ({ variant, className, i18nKey }: BadgeProps) => {
  const t = useTranslations(BadgeKey.TITLE);
  return (
    <span className={cn(baseClass, modeStyles[variant], className)}>
      {t(i18nKey)}
    </span>
  );
};
