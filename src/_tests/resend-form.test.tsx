import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResendForm } from '@/components/auth/resendForm';
import { toastError } from '@/test/mocks/toast';

vi.mock('@/lib/errors/helpers/handleAppError', () => ({
  handleAppError: ({ err, toast }: any) => {
    toast.error(err.message);
  },
}));

describe('ResendForm', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setup = (mode: 'reset' | 'resendReset' | 'resendVerification') => {
    const onSubmit = vi.fn();
    render(<ResendForm onSubmit={onSubmit} mode={mode} />);
    return { onSubmit };
  };

  test('submits email in reset mode', async () => {
    const { onSubmit } = setup('reset');

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const submitButton = screen.getByRole('button');

    await user.type(emailInput, 'test@test.com');
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith('test@test.com');

    expect(toastError).not.toHaveBeenCalled();
  });

  test('shows error when reset submit fails', async () => {
    const { onSubmit } = setup('resendReset');

    onSubmit.mockRejectedValueOnce(new Error('RESEND_RESET_PASSWORD_FAILED'));

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const submitButton = screen.getByRole('button');

    await user.type(emailInput, 'test@test.com');
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith('test@test.com');

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith('RESEND_RESET_PASSWORD_FAILED');
    });
  });

  test('shows error on resend verification failure', async () => {
    const { onSubmit } = setup('resendVerification');

    onSubmit.mockRejectedValueOnce(new Error('RESEND_VERIFY_EMAIL_FAILED'));

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const submitButton = screen.getByRole('button');

    await user.type(emailInput, 'verify@test.com');
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith('verify@test.com');
    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith('RESEND_VERIFY_EMAIL_FAILED');
    });
  });

  test('shows login link when email already verified', async () => {
    const { onSubmit } = setup('resendVerification');

    onSubmit.mockRejectedValueOnce(new Error('EMAIL_ALREADY_VERIFIED'));

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const submitButton = screen.getByRole('button');

    await user.type(emailInput, 'verified@test.com');
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith('verified@test.com');

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith('EMAIL_ALREADY_VERIFIED');
    });

    await waitFor(() => {
      expect(screen.getByText(/please_login/i)).toBeInTheDocument();
    });

    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });

  test('shows login link when user exists with oauth', async () => {
    const { onSubmit } = setup('resendVerification');

    onSubmit.mockRejectedValueOnce(new Error('USER_EXISTS_OAUTH'));

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const submitButton = screen.getByRole('button');

    await user.type(emailInput, 'oauth@test.com');
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith('oauth@test.com');

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith('USER_EXISTS_OAUTH');
    });

    await waitFor(() => {
      expect(screen.getByText(/please_login/i)).toBeInTheDocument();
    });
  });
});
