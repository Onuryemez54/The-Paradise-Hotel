import { vi } from 'vitest';

export const push = vi.fn();

export const routerMock = {
  push,
  replace: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
};

vi.mock('next/navigation', () => ({
  useRouter: () => routerMock,
  usePathname: () => '/en/auth/login',
  useSearchParams: () => new URLSearchParams(),
}));
