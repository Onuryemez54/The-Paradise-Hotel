import { vi } from 'vitest';

export const handleAppError = vi.fn(({ err, toast }: any) => {
  if (err instanceof Error) {
    toast.error(err.message);
    return err.message;
  }

  toast.error('INTERNAL_ERROR');
  return 'INTERNAL_ERROR';
});
