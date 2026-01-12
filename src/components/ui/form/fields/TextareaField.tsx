'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/shadcn/form';
import { Textarea } from '@/components/ui/shadcn/textarea';
import { useTranslations } from 'next-intl';
import { TranslatedFormMessage } from '../TranslatedFormMessage';
import { FormKey } from '@/types/i18n/keys';
import { FormVariant } from '@/types/ui/formTypes';
import { cn } from '@/utils/utils';
import {
  textareaClasses,
  errorInputClasses,
  labelClasses,
} from '@/config/form/formStyles';

interface TextareaFieldProps {
  name: string;
  labelKey: FormKey;
  placeholderKey?: FormKey;
  rows?: number;
  variant?: FormVariant;
  disabled?: boolean;
}

export const TextareaField = ({
  name,
  labelKey,
  placeholderKey,
  rows = 4,
  variant = 'auth',
  disabled = false,
}: TextareaFieldProps) => {
  const tField = useTranslations('FORM.FIELD');
  const tPlaceholder = useTranslations('FORM.PLACEHOLDER');

  return (
    <FormField
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className={cn(labelClasses[variant])}>
            {tField(labelKey)}
          </FormLabel>

          <FormControl>
            <Textarea
              {...field}
              rows={rows}
              disabled={disabled}
              value={field.value ?? ''}
              placeholder={
                placeholderKey ? tPlaceholder(placeholderKey) : undefined
              }
              className={cn(
                textareaClasses[variant],
                fieldState.error && errorInputClasses[variant],
                disabled && 'cursor-not-allowed opacity-60'
              )}
            />
          </FormControl>

          <TranslatedFormMessage variant={variant} />
        </FormItem>
      )}
    />
  );
};
