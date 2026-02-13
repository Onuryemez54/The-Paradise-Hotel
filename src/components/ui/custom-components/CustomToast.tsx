'use client';
import { JSX, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  InfoIcon,
  LucideMessageCircleWarning,
} from 'lucide-react';
import { cn } from '@/utils/utils';
import { ToastItemType, ToastType } from '@/types/toast/toastTypes';

export const CustomToast = ({
  type,
  message,
  duration,
  progress,
  leaving,
  onRequestClose,
  onRemove,
}: ToastItemType) => {
  const isError = type === 'error';
  const isSuccess = type === 'success';

  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(() => {
      onRemove();
    }, 200);
    return () => clearTimeout(timer);
  }, [onRemove, leaving]);

  const toastTypeStyles: Record<ToastType, string> = {
    success:
      'bg-toast-success-bg border-toast-success-border text-toast-success-foreground',
    error:
      'bg-toast-error-bg border-toast-error-border text-toast-error-foreground',
    info: 'bg-toast-info-bg border-toast-info-border text-toast-info-foreground',
    warning:
      'bg-toast-warning-bg border-toast-warning-border text-toast-warning-foreground',
  };

  const toastIconContainerStyles: Record<ToastType, string> = {
    success: 'bg-emerald-500/20 text-emerald-500 animate-success-icon',
    error: 'bg-red-500/20 animate-error-icon',
    info: 'bg-blue-500/20 text-blue-500 animate-bounce',
    warning: 'bg-amber-500/20 text-amber-500 animate-pulse',
  };

  const toastIcon: Record<ToastType, JSX.Element> = {
    success: <CheckCircle2 className="h-5 w-5 lg:h-6 lg:w-6" />,
    error: <AlertCircle className="h-5 w-5 lg:h-6 lg:w-6" />,
    info: <InfoIcon className="h-5 w-5 lg:h-6 lg:w-6" />,
    warning: <LucideMessageCircleWarning className="h-5 w-5 lg:h-6 lg:w-6" />,
  };

  const hoverStyles: Record<ToastType, string> = {
    success: 'hover:bg-emerald-500/20',
    error: 'hover:bg-red-500/20',
    info: 'hover:bg-blue-500/20',
    warning: 'hover:bg-amber-500/20',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'font-body pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl border-2 shadow-lg backdrop-blur',
        toastTypeStyles[type],
        leaving
          ? !isError
            ? 'animate-toast-out'
            : 'animate-toast-error-container'
          : 'animate-toast-in'
      )}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div
          className={cn(
            'flex h-8 w-8 min-w-8 items-center justify-center rounded-lg',
            toastIconContainerStyles[type]
          )}
        >
          {toastIcon[type]}
        </div>

        <p className="3xl:text-base flex-1 text-xs font-semibold md:text-sm">
          {message}
        </p>

        <button
          type="button"
          onClick={onRequestClose}
          className={cn('rounded-lg p-1', hoverStyles[type])}
          aria-label="Close toast"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {progress && isSuccess && (
        <div className="h-1 w-full overflow-hidden rounded-b-2xl bg-emerald-500/20">
          <div
            className="animate-toast-progress h-full bg-emerald-500/70"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      )}
    </div>
  );
};
