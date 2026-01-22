import { vi } from 'vitest';

export const toastSuccess = vi.fn();
export const toastError = vi.fn();
export const toastInfo = vi.fn();
export const toastWarning = vi.fn();

vi.mock('@/context/ToastContext', () => ({
  useToast: () => ({
    success: toastSuccess,
    error: toastError,
    info: toastInfo,
    warning: toastWarning,
  }),
}));
