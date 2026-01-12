'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/select';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/shadcn/form';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type SelectOption = {
  label: string;
  value: string;
};

interface SelectFieldProps {
  /** form field name (FormFieldKey veya string) */
  name: string;

  /** i18n key (FORM.FIELD altında) */
  labelKey: string;

  /** i18n key (FORM.PLACEHOLDER altında) */
  placeholderKey?: string;

  /** seçenekler */
  options: SelectOption[];

  /** server action için default value */
  defaultValue?: string;

  /** server action kullanımı */
  useHiddenInput?: boolean;

  /** RHF kullanımı (opsiyonel) */
  value?: string;
  onChange?: (value: string) => void;
}

export const ActionSelectField = ({
  name,
  labelKey,
  placeholderKey,
  options,
  defaultValue = '',
  useHiddenInput = true,
  value,
  onChange,
}: SelectFieldProps) => {
  const tField = useTranslations('FORM.FIELD');
  const tPlaceholder = useTranslations('FORM.PLACEHOLDER');

  const isControlled = value !== undefined && onChange !== undefined;

  const [internalValue, setInternalValue] = useState(defaultValue);

  const selectedValue = isControlled ? value : internalValue;

  const handleChange = (val: string) => {
    if (isControlled && onChange) {
      onChange(val);
    } else {
      setInternalValue(val);
    }
  };

  return (
    <FormItem>
      <FormLabel>{tField(labelKey)}</FormLabel>
      <FormControl>
        <Select value={selectedValue} onValueChange={handleChange}>
          <SelectTrigger className="bg-primary-800 border-primary-600 text-primary-50 focus:ring-primary-400 w-full rounded-lg border px-4 py-2 focus:ring-1 focus:outline-none">
            <SelectValue
              placeholder={
                placeholderKey ? tPlaceholder(placeholderKey) : undefined
              }
            />
          </SelectTrigger>

          <SelectContent
            className="bg-primary-700 border-primary-500 max-h-[300px] overflow-y-auto border"
            position="popper"
          >
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>

      {useHiddenInput && (
        <input type="hidden" name={name} value={selectedValue || ''} />
      )}

      <FormMessage />
    </FormItem>
  );
};
