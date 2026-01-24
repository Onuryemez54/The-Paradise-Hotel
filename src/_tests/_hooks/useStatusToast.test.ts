import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { MockedFunction } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useStatusToast } from '@/hooks/useStatusToast';
import { routerMock } from '@/test/mocks/nextNavigation';
import {
  toastSuccess,
  toastError,
  toastWarning,
  toastInfo,
} from '@/test/mocks/toast';
import { ErrorKey, SuccessKey } from '@/types/i18n/keys';
import { getSeverityByCode } from '@/lib/toast-severity/getSeverityByCode';
import { ToastType } from '@/types/toast/toastTypes';

vi.mock('@/lib/toast-severity/getSeverityByCode', () => ({
  getSeverityByCode: vi.fn(),
}));

const mockedGetSeverity = getSeverityByCode as MockedFunction<
  typeof getSeverityByCode
>;

describe('useStatusToast', () => {
  const tMock = (key: ErrorKey | SuccessKey) => key;

  const toastMock = {
    success: toastSuccess,
    error: toastError,
    info: toastInfo,
    warning: toastWarning,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does nothing when status is undefined', () => {
    renderHook(() =>
      useStatusToast({
        status: undefined,
        t: tMock,
        toast: toastMock as any,
        redirectTo: '/login',
      })
    );

    expect(toastSuccess).not.toHaveBeenCalled();
    expect(toastError).not.toHaveBeenCalled();
    expect(routerMock.replace).not.toHaveBeenCalled();
  });

  it('shows success toast and redirects when status is success code', () => {
    mockedGetSeverity.mockReturnValue(ToastType.SUCCESS);

    renderHook(() =>
      useStatusToast({
        status: SuccessKey.BOOKING_CREATED,
        t: tMock,
        toast: toastMock as any,
        redirectTo: '/account/bookings',
      })
    );

    expect(toastSuccess).toHaveBeenCalledTimes(1);
    expect(toastSuccess.mock.calls[0][0]).toBe(SuccessKey.BOOKING_CREATED);

    expect(routerMock.replace).toHaveBeenCalledWith('/account/bookings', {
      scroll: false,
    });
  });

  it('shows error toast when severity is error', () => {
    mockedGetSeverity.mockReturnValue(ToastType.ERROR);

    renderHook(() =>
      useStatusToast({
        status: ErrorKey.NO_CODE,
        t: tMock,
        toast: toastMock as any,
        redirectTo: '/login',
      })
    );

    expect(toastError).toHaveBeenCalledTimes(1);
    expect(toastError.mock.calls[0][0]).toBe(ErrorKey.NO_CODE);

    expect(routerMock.replace).toHaveBeenCalledWith('/login', {
      scroll: false,
    });
  });

  it('calls onStatusLogout when provided', () => {
    mockedGetSeverity.mockReturnValue(ToastType.WARNING);

    const logoutMock = vi.fn();

    renderHook(() =>
      useStatusToast({
        status: ErrorKey.SESSION_EXPIRED,
        t: tMock,
        toast: toastMock as any,
        redirectTo: '/login',
        onStatusLogout: logoutMock,
      })
    );

    expect(toastWarning).toHaveBeenCalledTimes(1);
    expect(toastWarning.mock.calls[0][0]).toBe(ErrorKey.SESSION_EXPIRED);
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });

  it('does not show toast more than once for the same status', () => {
    mockedGetSeverity.mockReturnValue(ToastType.INFO);

    const { rerender } = renderHook((props) => useStatusToast(props), {
      initialProps: {
        status: ErrorKey.SAME_PASSWORD,
        t: tMock,
        toast: toastMock as any,
        redirectTo: '/reset-password',
      },
    });

    expect(toastInfo).toHaveBeenCalledTimes(1);
    expect(toastInfo.mock.calls[0][0]).toBe(ErrorKey.SAME_PASSWORD);
    expect(routerMock.replace).toHaveBeenCalledWith('/reset-password', {
      scroll: false,
    });

    rerender({
      status: ErrorKey.SAME_PASSWORD,
      t: tMock,
      toast: toastMock as any,
      redirectTo: '/reset-password',
    });

    expect(toastInfo).toHaveBeenCalledTimes(1);
  });

  it('shows toast again when status changes', () => {
    mockedGetSeverity.mockReturnValue(ToastType.INFO);

    const { rerender } = renderHook((props) => useStatusToast(props), {
      initialProps: {
        status: ErrorKey.SAME_PASSWORD,
        t: tMock,
        toast: toastMock as any,
        redirectTo: '/reset-password',
      },
    });

    expect(toastInfo).toHaveBeenCalledTimes(1);
    expect(toastInfo.mock.calls[0][0]).toBe(ErrorKey.SAME_PASSWORD);

    rerender({
      status: ErrorKey.USER_EXISTS,
      t: tMock,
      toast: toastMock as any,
      redirectTo: '/reset-password',
    });

    expect(toastInfo).toHaveBeenCalledTimes(2);
    expect(toastInfo.mock.calls[1][0]).toBe(ErrorKey.USER_EXISTS);
  });
});
