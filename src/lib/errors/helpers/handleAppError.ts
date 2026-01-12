import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { ToastContextValue } from '@/context/ToastContext';
import { ErrorKey } from '@/types/i18n/keys';
import { getSeverityByCode } from '@/lib/toast-severity/getSeverityByCode';

type HandleAppErrorParams = {
  err: unknown;
  t: (key: ErrorKey) => string;
  toast: ToastContextValue;
};

export const isValidErrorCode = (value: string): value is ErrorKey =>
  Object.values(ErrorKey).includes(value as ErrorKey);

export const handleAppError = ({
  err,
  t,
  toast,
}: HandleAppErrorParams): ErrorKey | null => {
  if (isRedirectError(err)) {
    return null;
  }
  const code =
    err instanceof Error && isValidErrorCode(err.message)
      ? (err.message as ErrorKey)
      : ErrorKey.INTERNAL_ERROR;

  const message = t(code);

  const severity = getSeverityByCode(code);
  toast[severity](message);

  return code;
};
