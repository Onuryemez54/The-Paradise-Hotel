'use client';
import { useToast } from '@/context/ToastContext';
import { useStatusToast } from '@/hooks/useStatusToast';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { CustomAuthModal } from '@/components/auth/CustomAuthModal';
import { ResendForm } from '@/components/auth/resendForm';
import { ErrorKey } from '@/types/i18n/keys';
import { requestPasswordReset } from '@/lib/actions/auth-actions/request-password-reset';

const ResendResetPage = () => {
  const toast = useToast();
  const tE = useTranslations(ErrorKey.TITLE);
  const params = useSearchParams();
  const status = params.get('status');

  // status check should run only once
  useStatusToast({
    status,
    t: tE,
    toast,
    redirectTo: '/auth/resend-reset',
  });

  return (
    <CustomAuthModal mode="reset">
      <ResendForm
        onSubmit={(email) => requestPasswordReset({ email })}
        mode="resendReset"
      />
    </CustomAuthModal>
  );
};
export default ResendResetPage;
