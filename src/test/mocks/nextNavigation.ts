import { vi } from 'vitest';

export const redirectMock = vi.fn(() => {
  throw new Error('NEXT_REDIRECT');
});

export const routerMock = {
  push: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
};

vi.mock('next/navigation', () => ({
  useRouter: () => routerMock,
  usePathname: () => '/en/auth/register',
  useSearchParams: () => new URLSearchParams(),

  redirect: redirectMock,
}));
