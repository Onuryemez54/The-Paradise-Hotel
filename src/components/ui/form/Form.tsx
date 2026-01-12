'use client';
import { Form as ShadcnForm } from '@/components/ui/shadcn/form';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';
import { cn } from '@/utils/utils';

type RHFFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  children: ReactNode;
  className?: string;
};

export function Form<T extends FieldValues>(props: RHFFormProps<T>) {
  const { form, onSubmit, children } = props;

  return (
    <ShadcnForm {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col gap-3', props.className)}
      >
        {children}
      </form>
    </ShadcnForm>
  );
}
