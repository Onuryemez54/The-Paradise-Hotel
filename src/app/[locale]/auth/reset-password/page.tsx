'use client';
import { CustomAuthModal } from '@/components/auth/CustomAuthModal';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <CustomAuthModal mode="reset">
      <ResetPasswordForm />
    </CustomAuthModal>
  );
}
