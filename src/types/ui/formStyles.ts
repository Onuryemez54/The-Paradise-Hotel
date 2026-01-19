import { FormVariant } from '@/types/ui/formTypes';

//input
export const inputClasses: Record<FormVariant, string> = {
  auth: `
    border-primary-500
    bg-primary-800
    text-primary-100
    text-sm md:text-base 3xl:text-lg
    focus:ring-primary-400
    placeholder:text-primary-300
    disabled:cursor-not-allowed
    disabled:opacity-60
    px-3 py-2
  `,
  booking: `
    border-primary-600
    bg-primary-700/70
    text-primary-100
    text-sm md:text-base 3xl:text-lg
    focus:ring-primary-300
    placeholder:text-primary-300
  `,
};

export const errorInputClasses: Record<FormVariant, string> = {
  auth: 'border-accent-500 focus:ring-accent-500',
  booking: 'border-red-500 focus:ring-red-500',
};

// label
export const labelClasses: Record<FormVariant, string> = {
  auth: 'text-primary-200',
  booking: 'text-primary-200',
};

//error message
export const errorClasses: Record<FormVariant, string> = {
  auth: 'text-accent-400',
  booking: 'text-red-400',
};

// checkbox wrapper

export const checkboxWrapperClasses: Record<FormVariant, string> = {
  auth: `
    flex items-start gap-3 rounded-lg border border-primary-600
    bg-primary-800 px-3 py-2
    hover:bg-primary-700/60
    transition
  `,
  booking: `
   dark:border-primary-700 hover:bg-primary-700/70 has-aria-checked:border-primary-400 has-aria-checked:bg-primary-700/70 dark:has-aria-checked:border-primary-400 dark:has-aria-checked:bg-primary-700/70 flex cursor-pointer items-start gap-3 rounded-lg border p-3
  `,
};

// checkbox label

export const checkboxLabelClasses: Record<FormVariant, string> = {
  auth: `
    text-sm text-primary-200 leading-snug cursor-pointer
  `,
  booking: `
    text-xs sm:text-sm text-primary-200 leading-snug cursor-pointer 
  `,
};

// checkbox error

export const checkboxErrorClasses: Record<FormVariant, string> = {
  auth: `
    border-accent-500
  `,
  booking: `
    border-accent-500
  `,
};

//  textarea
export const textareaClasses: Record<FormVariant, string> = {
  auth: `
    border-primary-500
    bg-primary-800
    text-primary-100
    text-sm md:text-base 3xl:text-lg
    focus:ring-primary-400
    placeholder:text-primary-300
    disabled:cursor-not-allowed 
    disabled:opacity-60
  `,
  booking: `
    border-primary-600  
    bg-primary-700/70
    text-primary-100
    text-sm md:text-base 3xl:text-lg
    focus:ring-primary-300
    placeholder:text-primary-300
  `,
};
