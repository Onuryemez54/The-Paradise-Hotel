'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomButton } from '../ui/custom-components/CustomButton';
import { useToast } from '@/context/ToastContext';
import {
  ButtonKey,
  ErrorKey,
  SubTitleKey,
  SuccessKey,
  TitleKey,
} from '@/types/i18n/keys';
import { deleteAccount } from '@/lib/actions/auth-actions/delete-account-action';
import { CustomTitle } from '../ui/custom-components/CustomTitle';
import { X } from 'lucide-react';
import { CustomSubTitle } from '../ui/custom-components/CustomSubTitle';
import { handleAppError } from '@/lib/errors/helpers/handleAppError';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const DeleteAccountModal = ({ open, onClose }: Props) => {
  const router = useRouter();
  const toast = useToast();
  const tE = useTranslations(ErrorKey.TITLE);
  const tS = useTranslations(SuccessKey.TITLE);
  const { handleLogout } = useAuth();

  const [isDeleting, setIsDeleting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-toast-root]')) {
        return;
      }
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [router]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteAccount();

      const error = handleAppError({
        result,
        t: tE,
        toast,
      });
      if (error) return;

      await handleLogout();

      toast.success(tS(SuccessKey.ACCOUNT_DELETED));
      router.push('/');
      router.refresh();
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur">
      <div
        ref={modalRef}
        className="bg-primary-700/90 border-primary-600 text-primary-200 animate-in fade-in slide-in-from-bottom-4 relative max-h-[90svh] w-[90%] max-w-md overflow-y-auto rounded-2xl border p-4 text-center shadow-2xl duration-400 ease-in-out sm:p-8"
      >
        <CustomTitle
          variant="subheading"
          i18nKey={TitleKey.DELETE_ACCOUNT}
          className="justify-center"
        />
        <span
          className="text-primary-400 hover:text-accent-400 absolute top-4 right-4 cursor-pointer"
          onClick={onClose}
        >
          <X size={20} />
        </span>
        <CustomSubTitle
          variant="section"
          i18nKey={SubTitleKey.DELETE_ACCOUNT}
          className="mb-4"
        />

        <div className="flex justify-between gap-3">
          <CustomButton
            variant="tertiary"
            i18nKey={ButtonKey.CANCEL}
            onAction={onClose}
          />
          <CustomButton
            variant="primary"
            i18nKey={ButtonKey.DELETE_ACCOUNT}
            isLoading={isDeleting}
            onAction={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};
