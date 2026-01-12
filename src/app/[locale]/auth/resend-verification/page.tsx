'use client';
import { useToast } from '@/context/ToastContext';
import { useStatusToast } from '@/hooks/useStatusToast';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { CustomAuthModal } from '@/components/auth/CustomAuthModal';
import { ResendForm } from '@/components/auth/resendForm';
import { resendVerificationEmail } from '@/lib/actions/auth-actions/resend-verification-email';
import { ErrorKey } from '@/types/i18n/keys';

const ResendVerificationPage = () => {
  const params = useSearchParams();
  const status = params.get('status');
  const toast = useToast();
  const tE = useTranslations(ErrorKey.TITLE);

  // status check should run only once
  useStatusToast({
    status,
    t: tE,
    toast,
    redirectTo: '/auth/resend-verification',
  });

  return (
    <CustomAuthModal mode="verify">
      <ResendForm
        onSubmit={(email) => resendVerificationEmail(email)}
        mode="verify"
      />
    </CustomAuthModal>
  );
};
export default ResendVerificationPage;
