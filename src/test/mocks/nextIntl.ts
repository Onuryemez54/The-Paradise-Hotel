import { vi } from 'vitest';

export const useLocaleMock = vi.fn(() => 'en');

vi.mock('next-intl', () => ({
  useTranslations: () => {
    const t = (key: string, values?: any) => key;

    t.rich = (key: string, values?: any) => {
      return key;
    };

    t.raw = (key: string) => key;

    return t;
  },
  useLocale: () => useLocaleMock(),
}));

vi.mock('use-intl', () => ({
  useTranslations: () => {
    const t = (key: string, values?: any) => key;

    t.rich = (key: string, values?: any) => key;
    t.raw = (key: string) => key;

    return t;
  },
  useLocale: () => useLocaleMock(),
}));
