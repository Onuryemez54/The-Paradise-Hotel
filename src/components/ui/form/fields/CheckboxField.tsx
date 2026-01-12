'use client';
import { useTranslations } from 'next-intl';
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from '@/components/ui/shadcn/form';
import { Checkbox } from '@/components/ui/shadcn/checkbox';
import { TranslatedFormMessage } from '../TranslatedFormMessage';
import { FormVariant } from '@/types/ui/formTypes';
import { cn } from '@/utils/utils';
import {
  checkboxWrapperClasses,
  checkboxLabelClasses,
  checkboxErrorClasses,
} from '@/config/form/formStyles';
import { FormKey } from '@/types/i18n/keys';
import { Label } from '../../shadcn/label';

interface CheckboxFieldProps {
  name: string;
  labelKey: FormKey;
  labelValues?: Record<string, string | number>;
  variant?: FormVariant;
  disabled?: boolean;
}

export const CheckboxField = ({
  name,
  labelKey,
  variant = 'auth',
  disabled = false,
  labelValues,
}: CheckboxFieldProps) => {
  const tField = useTranslations('FORM.FIELD');

  const resolvedLabel = tField.rich(labelKey, {
    ...labelValues,
    highlight: (chunks) => (
      <span className="text-accent-500 font-semibold">{chunks}</span>
    ),
  });

  return (
    <FormField
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Label
              className={cn(
                checkboxWrapperClasses[variant],
                fieldState.error && checkboxErrorClasses[variant],
                disabled && 'cursor-not-allowed opacity-60'
              )}
            >
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
                className="data-[state=checked]:bg-primary-600 dark:data-[state=checked]:border-accent-600 dark:data-[state=checked]:bg-accent-400 data-[state=checked]:text-gray-100"
              />

              <span
                className={cn(
                  checkboxLabelClasses[variant],
                  'pointer-events-auto cursor-pointer'
                )}
              >
                {resolvedLabel}
              </span>
            </Label>
          </FormControl>

          <TranslatedFormMessage variant={variant} />
        </FormItem>
      )}
    />
  );
};
