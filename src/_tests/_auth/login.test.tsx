import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { routerMock } from '@/test/mocks/nextNavigation';
import { loginAction } from '@/lib/actions/auth-actions/login-action';
import { toastError, toastSuccess } from '@/test/mocks/toast';
import userEvent from '@testing-library/user-event';
import LoginPage from '@/app/[locale]/auth/login/page';

vi.mock('@/lib/actions/auth-actions/login-action', () => ({
  loginAction: vi.fn(),
}));

describe('Login flow', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    render(<LoginPage />);
  });

  test('successful login redirects to /account', async () => {
    (loginAction as any).mockResolvedValueOnce(undefined);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, '123456');
    await user.click(submitButton);

    expect(loginAction).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '123456',
    });

    expect(routerMock.push).toHaveBeenCalledWith('/account');
  });

  test('shows success message when login succeeds', async () => {
    (loginAction as any).mockResolvedValueOnce(undefined);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, '123456');
    await user.click(submitButton);

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith('LOGGED_IN');
    });
  });

  test('shows error message when login fails', async () => {
    (loginAction as any).mockRejectedValueOnce(new Error('USER_NOT_FOUND'));

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'wrong@test.com');
    await user.type(passwordInput, 'wrongpass');
    await user.click(submitButton);

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith('USER_NOT_FOUND');
    });

    expect(await screen.findByText(/invalid_credentials/i)).toBeInTheDocument();
  });
});
