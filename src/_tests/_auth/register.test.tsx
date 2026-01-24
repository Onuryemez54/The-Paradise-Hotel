import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { registerAction } from '@/lib/actions/auth-actions/register-action';
import { toastError } from '@/test/mocks/toast';
import userEvent from '@testing-library/user-event';
import RegisterPage from '@/app/[locale]/auth/register/page';

vi.mock('@/lib/actions/auth-actions/register-action', () => ({
  registerAction: vi.fn(),
}));

describe('Register flow', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    render(<RegisterPage />);
  });

  test('submits correct payload on successful register', async () => {
    (registerAction as any).mockResolvedValueOnce(undefined);

    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];
    const submitButton = screen.getByRole('button', { name: /register/i });

    await user.type(nameInput, 'Onur Test');
    await user.type(emailInput, 'onur@test.com');
    await user.type(passwordInput, '12345678');
    await user.type(confirmPasswordInput, '12345678');

    await user.click(submitButton);

    expect(registerAction).toHaveBeenCalledWith({
      email: 'onur@test.com',
      password: '12345678',
      fullName: 'Onur Test',
    });

    expect(toastError).not.toHaveBeenCalled();
  });

  test('shows error when register fails', async () => {
    (registerAction as any).mockRejectedValueOnce(new Error('REGISTER_FAILED'));

    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];
    const submitButton = screen.getByRole('button', { name: /register/i });

    await user.type(nameInput, 'Onur Test');
    await user.type(emailInput, 'onur@test.com');
    await user.type(passwordInput, '12345678');
    await user.type(confirmPasswordInput, '12345678');

    await user.click(submitButton);

    expect(registerAction).toHaveBeenCalledWith({
      email: 'onur@test.com',
      password: '12345678',
      fullName: 'Onur Test',
    });

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith('REGISTER_FAILED');
    });
  });

  test('shows have account message and register link', async () => {
    const haveAccountText = screen.getByText(/have_account/i);
    expect(haveAccountText).toBeInTheDocument();

    const haveAccountLink = screen.getByRole('link', { name: /login/i });
    expect(haveAccountLink).toBeInTheDocument();

    expect(haveAccountLink).toHaveAttribute('href', '/auth/login');
  });
});
