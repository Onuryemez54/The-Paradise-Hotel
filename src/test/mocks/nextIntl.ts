import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

vi.mock('use-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));
