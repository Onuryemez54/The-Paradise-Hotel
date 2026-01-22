import { vi } from 'vitest';

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    currentUser: null,
    isLoading: false,
    handleLogout: vi.fn(),
  }),
}));
