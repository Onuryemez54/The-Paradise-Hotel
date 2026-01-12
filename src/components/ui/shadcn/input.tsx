import * as React from 'react';

import { cn } from '@/utils/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'font-body w-full rounded-md border px-2 py-1 focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:py-2',
        className
      )}
      {...props}
    />
  );
}

export { Input };
