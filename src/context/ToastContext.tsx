'use client';
import {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
} from 'react';
import { ToastItemType, ToastType } from '@/types/toast/toastTypes';
import { CustomToast } from '@/components/ui/custom-components/CustomToast';
import { nanoid } from 'nanoid';

export type ToastContextValue = {
  success: (message: string, duration?: number, progress?: boolean) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const MAX_TOAST = 3;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItemType[]>([]);

  const requestCloseToast = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id && !t.leaving ? { ...t, leaving: true } : t))
    );
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, duration = 3000, progress = false) => {
      setToasts((prev) => {
        const alreadyExists = prev.some(
          (t) => t.message === message && t.type === type && !t.leaving
        );
        if (alreadyExists) return prev;

        if (prev.length >= MAX_TOAST) return prev;

        const id = nanoid();

        const newToast: ToastItemType = {
          id,
          type,
          message,
          duration,
          progress,
          leaving: false,
          onRequestClose: () => requestCloseToast(id),
          onRemove: () => removeToast(id),
        };

        setTimeout(() => requestCloseToast(id), duration);

        return [...prev, newToast];
      });
    },
    [removeToast, requestCloseToast]
  );

  const value: ToastContextValue = {
    success: (msg, d, p) => showToast(ToastType.SUCCESS, msg, d, p),
    error: (msg, d) => showToast(ToastType.ERROR, msg, d),
    info: (msg, d) => showToast(ToastType.INFO, msg, d),
    warning: (msg, d) => showToast(ToastType.WARNING, msg, d),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        data-toast-root
        className="fixed top-10 left-1/2 z-100 flex w-full max-w-xl -translate-x-1/2 flex-col items-center gap-3 px-4"
      >
        {toasts.map((toast) => (
          <CustomToast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used inside ToastProvider');
  }
  return ctx;
}
