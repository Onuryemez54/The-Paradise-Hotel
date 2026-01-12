'use client';
import { useEffect, useRef } from 'react';
import { ErrorKey, SuccessKey } from '@/types/i18n/keys';
import { ToastContextValue } from '@/context/ToastContext';
import { getSeverityByCode } from '@/lib/toast-severity/getSeverityByCode';
import { useRouter } from 'next/navigation';

type Params = {
  status?: string | null;
  t: (key: ErrorKey | SuccessKey) => string;
  toast: ToastContextValue;
  redirectTo: string;
  onStatusLogout?: () => void;
};

export const useStatusToast = ({
  status,
  t,
  toast,
  redirectTo,
  onStatusLogout,
}: Params) => {
  const router = useRouter();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!status || hasShownToast.current) return;

    hasShownToast.current = true;

    const code = status as ErrorKey | SuccessKey;
    const severity = getSeverityByCode(code);
    const message = t(code);

    toast[severity](message);

    onStatusLogout?.();

    router.replace(redirectTo, { scroll: false });
  }, [status, toast, t, redirectTo, onStatusLogout]);
};
