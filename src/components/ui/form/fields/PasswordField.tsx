'use client';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/shadcn/form';
import { Input } from '@/components/ui/shadcn/input';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FormKey } from '@/types/i18n/keys';
import { TranslatedFormMessage } from '../TranslatedFormMessage';
import { FormVariant } from '@/types/ui/formTypes';
import {
  errorInputClasses,
  inputClasses,
  labelClasses,
} from '@/types/ui/formStyles';
import { cn } from '@/utils/utils';

export const PasswordField = ({
  name,
  labelKey,
  variant = 'auth',
}: {
  name: string;
  labelKey: FormKey;
  variant?: FormVariant;
}) => {
  const [visible, setVisible] = useState(false);
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
            <div className="relative">
              <Input
                {...field}
                value={field.value ?? ''}
                type={visible ? 'text' : 'password'}
                placeholder={tPlaceholder(labelKey)}
                className={cn(
                  inputClasses[variant],
                  fieldState.error && errorInputClasses[variant]
                )}
              />
              <button
                type="button"
                onClick={() => setVisible((p) => !p)}
                className={cn(
                  'text-primary-300 absolute top-2.5 right-3 cursor-pointer focus:outline-none',
                  fieldState.error && 'text-accent-400/70'
                )}
              >
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </FormControl>
          <TranslatedFormMessage variant={variant} />
        </FormItem>
      )}
    />
  );
};
