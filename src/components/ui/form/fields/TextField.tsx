'use client';
import { useTranslations } from 'next-intl';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/shadcn/form';
import { Input } from '@/components/ui/shadcn/input';
import { FormKey } from '@/types/i18n/keys';
import { TranslatedFormMessage } from '../TranslatedFormMessage';
import { FormVariant } from '@/types/ui/formTypes';
import { cn } from '@/utils/utils';
import {
  errorInputClasses,
  inputClasses,
  labelClasses,
} from '@/types/ui/formStyles';

interface TextFieldProps {
  name: string;
  type?: 'text' | 'email';
  labelKey: FormKey;
  variant?: FormVariant;
  disabled?: boolean;
  autoComplete?: string;
  readOnly?: boolean;
}

export const TextField = ({
  name,
  type = 'text',
  labelKey,
  variant = 'auth',
  disabled = false,
  autoComplete,
  readOnly = false,
}: TextFieldProps) => {
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
            <Input
              {...field}
              autoComplete={autoComplete}
              placeholder={tPlaceholder(labelKey)}
              value={field.value ?? ''}
              type={type}
              disabled={disabled}
              className={cn(
                inputClasses[variant],
                fieldState.error && errorInputClasses[variant]
              )}
              readOnly={readOnly}
            />
          </FormControl>
          <TranslatedFormMessage variant={variant} />
        </FormItem>
      )}
    />
  );
};
