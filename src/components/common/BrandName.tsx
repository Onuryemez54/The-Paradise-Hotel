'use client';
import { BrandKey } from '@/types/i18n/keys';
import { cn } from '@/utils/utils';
import { useTranslations } from 'next-intl';

type Variant = 'main' | 'room' | 'footer';

const variantStyles: Record<Variant, string> = {
  main: 'hidden sm:inline-block text-nav-foreground text-lg lg:text-xl',
  room: '',
  footer: 'text-base md:text-lg text-footer-text',
};

const baseClass = 'font-heading font-semibold tracking-wide';

export const BrandName = ({ variant }: { variant: Variant }) => {
  const t = useTranslations(BrandKey.TITLE);
  const prefix = t(BrandKey.PREFIX);
  const name = t(BrandKey.NAME);
  const suffix = t(BrandKey.SUFFIX);
  return (
    <p className={cn(baseClass, variantStyles[variant])}>
      <span> {prefix && prefix + ' '}</span>
      <span className={cn(variant === 'main' ? 'text-accent-400' : '')}>
        {name}
      </span>
      <span>{suffix && ' ' + suffix}</span>
    </p>
  );
};
