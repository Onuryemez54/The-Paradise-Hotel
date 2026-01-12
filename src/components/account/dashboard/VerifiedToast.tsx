'use client';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SuccessKey } from '@/types/i18n/keys';
import { useStatusToast } from '@/hooks/useStatusToast';
import { useToast } from '@/context/ToastContext';

export const VerifiedToast = () => {
  const params = useSearchParams();
  const status = params.get('status');
  const toast = useToast();
  const t = useTranslations(SuccessKey.TITLE);

  useStatusToast({ status, t, toast, redirectTo: '/account' });

  return null;
};
