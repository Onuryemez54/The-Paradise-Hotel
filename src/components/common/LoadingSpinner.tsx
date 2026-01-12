'use client';
import { LoadingKey } from '@/types/i18n/keys';
import { useTranslations } from 'next-intl';

type LoadingSpinnerProps = {
  label?: LoadingKey;
  className?: string;
};

export const LoadingSpinner = ({
  label = LoadingKey.DEFAULT,
  className = '',
}: LoadingSpinnerProps) => {
  const t = useTranslations(LoadingKey.TITLE);
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center">
        <div className="relative h-12 w-12">
          <div className="border-primary-900/50 absolute inset-0 rounded-full border-4"></div>
          <div className="border-t-accent-400 absolute inset-0 animate-spin rounded-full border-4 border-r-transparent border-b-transparent border-l-transparent"></div>
        </div>
      </div>
      <p className={`text-primary-300 font-heading mt-1 ${className}`}>
        {t(label)}
      </p>
    </div>
  );
};
