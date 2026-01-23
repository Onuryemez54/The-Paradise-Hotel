import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { toastError } from '@/test/mocks/toast';
import { updatePasswordAction } from '@/lib/actions/auth-actions/update-password-action';
import ResetPasswordPage from '@/app/[locale]/auth/reset-password/page';
import userEvent from '@testing-library/user-event';

vi.mock('@/lib/actions/auth-actions/update-password-action', () => ({
  updatePasswordAction: vi.fn(),
}));

describe('Reset password flow', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    render(<ResetPasswordPage />);
  });

  test('submits new password on success', async () => {
    (updatePasswordAction as any).mockResolvedValueOnce(undefined);

    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    const newPasswordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];
    const submitButton = screen.getByRole('button', {
      name: /update_password/i,
    });

    await user.type(newPasswordInput, 'newStrongPass123');
    await user.type(confirmPasswordInput, 'newStrongPass123');
    await user.click(submitButton);

    expect(updatePasswordAction).toHaveBeenCalledWith({
      newPassword: 'newStrongPass123',
    });

    expect(toastError).not.toHaveBeenCalled();
  });

  test('shows error when update password fails', async () => {
    (updatePasswordAction as any).mockRejectedValueOnce(
      new Error('RESET_PASSWORD_FAILED')
    );

    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    const newPasswordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];
    const submitButton = screen.getByRole('button', {
      name: /update_password/i,
    });

    await user.type(newPasswordInput, 'newStrongPass123');
    await user.type(confirmPasswordInput, 'newStrongPass123');
    await user.click(submitButton);

    expect(updatePasswordAction).toHaveBeenCalledWith({
      newPassword: 'newStrongPass123',
    });

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith('RESET_PASSWORD_FAILED');
    });
  });

  test('shows validation error when passwords do not match', async () => {
    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    const newPasswordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];
    const submitButton = screen.getByRole('button', {
      name: /update_password/i,
    });

    await user.type(newPasswordInput, 'newStrongPass123');
    await user.type(confirmPasswordInput, 'differentPassword456');
    await user.click(submitButton);

    expect(updatePasswordAction).not.toHaveBeenCalled();

    expect(toastError).not.toHaveBeenCalled();

    expect(
      await screen.findByText(/form_password_mismatch/i)
    ).toBeInTheDocument();
  });
});
