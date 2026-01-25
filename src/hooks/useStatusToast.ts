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
  onStatusLogout?: () => Promise<void>;
};

export const useStatusToast = ({
  status,
  t,
  toast,
  redirectTo,
  onStatusLogout,
}: Params) => {
  const router = useRouter();
  const lastStatusRef = useRef<string | null>(null);

  useEffect(() => {
    if (!status) return;
    if (lastStatusRef.current === status) return;

    lastStatusRef.current = status;

    const run = async () => {
      const code = status as ErrorKey | SuccessKey;
      const severity = getSeverityByCode(code);
      const message = t(code);

      toast[severity](message);

      if (onStatusLogout) {
        await onStatusLogout();
      }

      router.replace(redirectTo, { scroll: false });
    };

    run();
  }, [status, toast, t, redirectTo, onStatusLogout]);
};
