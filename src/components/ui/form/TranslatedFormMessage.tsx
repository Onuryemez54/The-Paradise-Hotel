'use client';
import { useFormField } from '@/components/ui/shadcn/form';
import { useTranslations } from 'next-intl';
import { ErrorKey, FormKey } from '@/types/i18n/keys';
import { FormVariant } from '@/types/ui/formTypes';
import { cn } from '@/utils/utils';
import { errorClasses } from '@/config/form/formStyles';

const baseErrorClass = 'text-xs sm:text-sm text-left';
export const TranslatedFormMessage = ({
  variant = 'auth',
}: {
  variant: FormVariant;
}) => {
  const { error } = useFormField();
  const t = useTranslations(ErrorKey.TITLE);

  if (!error?.message) return null;

  return (
    <p role="alert" className={cn(baseErrorClass, errorClasses[variant])}>
      {t(error.message as FormKey)}
    </p>
  );
};
