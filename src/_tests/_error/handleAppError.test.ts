import { handleAppError } from '@/test/mocks/handleAppError';
import { ErrorKey } from '@/types/i18n/keys';
import { expect, test, vi } from 'vitest';

test('maps error to correct toast severity', () => {
  const toast = {
    error: vi.fn(),
    success: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  };

  const t = (key: ErrorKey) => key;

  const result = handleAppError({
    err: new Error(ErrorKey.LOGIN_FAILED),
    t,
    toast,
  });

  expect(result).toBe(ErrorKey.LOGIN_FAILED);
  expect(toast.error).toHaveBeenCalledWith(ErrorKey.LOGIN_FAILED);
});
