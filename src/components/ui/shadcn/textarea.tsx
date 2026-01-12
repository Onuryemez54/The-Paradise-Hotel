import * as React from 'react';

import { cn } from '@/utils/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-xs focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm sm:placeholder:text-sm',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
