'use client';
import { CustomAuthModal } from '@/components/auth/CustomAuthModal';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <CustomAuthModal mode="reset">
      <ResetPasswordForm />
    </CustomAuthModal>
  );
};

export default ResetPasswordPage;
