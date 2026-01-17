'use client';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/shadcn/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/select';
import { useTranslations } from 'next-intl';
import { TranslatedFormMessage } from '../TranslatedFormMessage';
import { FormVariant } from '@/types/ui/formTypes';
import { cn } from '@/utils/utils';
import {
  inputClasses,
  errorInputClasses,
  labelClasses,
} from '@/types/ui/formStyles';
import { FormKey } from '@/types/i18n/keys';

type Option = {
  label: string;
  value: string;
};

interface SelectFieldProps {
  name: string;
  labelKey: FormKey;
  options: Option[];
  variant?: FormVariant;
  disabled?: boolean;
}

export const SelectField = ({
  name,
  labelKey,
  options,
  variant = 'auth',
  disabled = false,
}: SelectFieldProps) => {
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
            <Select
              value={field.value ?? ''}
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger
                className={cn(
                  inputClasses[variant],
                  fieldState.error && errorInputClasses[variant]
                )}
              >
                <SelectValue placeholder={tPlaceholder(labelKey) as string} />
              </SelectTrigger>

              <SelectContent className="bg-primary-700 border-primary-500 max-h-[300px] overflow-y-auto border">
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          <TranslatedFormMessage variant={variant} />
        </FormItem>
      )}
    />
  );
};
