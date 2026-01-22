import { vi } from 'vitest';
import { routerMock } from './nextNavigation';

vi.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    Link: ({ children }: any) => children,
    redirect: vi.fn(),
    usePathname: () => '/en/auth/login',
    useRouter: () => routerMock,
    getPathname: () => '/en/auth/login',
  }),
}));
