import { ToastContextValue } from '@/context/ToastContext';
import { ErrorKey } from '@/types/i18n/keys';
import { getSeverityByCode } from '@/lib/toast-severity/getSeverityByCode';

export type ActionResultType = { ok: true } | { ok: false; error: ErrorKey };

type HandleAppErrorParams = {
  result: ActionResultType;
  t: (key: ErrorKey) => string;
  toast: ToastContextValue;
};

export const handleAppError = ({
  result,
  t,
  toast,
}: HandleAppErrorParams): ErrorKey | null => {
  if (!result.ok) {
    const message = t(result.error);
    const severity = getSeverityByCode(result.error);
    toast[severity](message);
    return result.error;
  }

  return null;
};
