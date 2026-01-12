'use client';
import { ResendForm } from '@/components/auth/resendForm';
import { CustomAuthModal } from '@/components/auth/CustomAuthModal';
import { requestPasswordReset } from '@/lib/actions/auth-actions/request-password-reset';

const ForgotPasswordPage = () => {
  return (
    <CustomAuthModal mode="reset">
      <ResendForm
        onSubmit={(email) => requestPasswordReset({ email })}
        mode="reset"
      />
    </CustomAuthModal>
  );
};
export default ForgotPasswordPage;
