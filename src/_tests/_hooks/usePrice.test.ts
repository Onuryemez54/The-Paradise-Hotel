import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePrice } from '@/hooks/usePrice';
import { useLocaleMock } from '@/test/mocks/nextIntl';

const rates = {
  USD: 1,
  EUR: 0.85,
  TRY: 43.4,
};

describe('usePrice', () => {
  beforeEach(() => {
    useLocaleMock.mockReturnValue('en');
  });

  it('returns loading state when rates are not provided', () => {
    const { result } = renderHook(() => usePrice(100, undefined as any));

    expect(result.current.isLoading).toBe(true);
  });

  it('formats price in USD for EN locale', () => {
    useLocaleMock.mockReturnValue('en');

    const { result } = renderHook(() => usePrice(100, rates));

    const formatted = result.current.formatPrice();

    expect(formatted).toContain('$');
    expect(formatted).toContain('100');
  });

  it('converts and formats price for TR locale', () => {
    useLocaleMock.mockReturnValue('tr');

    const { result } = renderHook(() => usePrice(100, rates));

    const formatted = result.current.formatPrice();

    expect(formatted).toContain('₺');
    expect(formatted).toContain('4.340');
  });

  it('converts and formats price for DE locale (EUR)', () => {
    useLocaleMock.mockReturnValue('de');

    const { result } = renderHook(() => usePrice(100, rates));

    const formatted = result.current.formatPrice();

    expect(formatted).toContain('€');
    expect(formatted).toContain('85');
  });

  it('falls back to EN locale when locale is unsupported', () => {
    useLocaleMock.mockReturnValue('xx');

    const { result } = renderHook(() => usePrice(100, rates));

    const formatted = result.current.formatPrice();

    expect(formatted).toContain('$');
    expect(formatted).toContain('100');
  });

  it('formats custom value when passing argument to formatPrice', () => {
    const rates = {
      USD: 1,
      EUR: 1,
      TRY: 1,
    };

    useLocaleMock.mockReturnValue('en');

    const { result } = renderHook(() => usePrice(100, rates));

    const formatted = result.current.formatPrice(250);

    expect(formatted).toContain('$');
    expect(formatted).toContain('250');
  });
});
