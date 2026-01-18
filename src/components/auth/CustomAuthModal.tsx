'use client';
import { ArrowRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';
import { CustomListItem } from '../ui/custom-components/CustomListItem';
import { CustomTitle } from '../ui/custom-components/CustomTitle';
import { ButtonKey, ListItemKey, TitleKey } from '@/types/i18n/keys';
import { CustomButton } from '../ui/custom-components/CustomButton';

interface CustomAuthModalProps {
  children: ReactNode;
  mode: 'login' | 'register' | 'forgot' | 'reset';
}

export const CustomAuthModal = ({ children, mode }: CustomAuthModalProps) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-toast-root]')) {
        return;
      }
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        router.push('/');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-primary-900/90 border-primary-600 text-primary-100 animate-in zoom-in relative max-h-[90vh] w-[90%] max-w-md overflow-y-auto rounded-2xl border p-4 text-center shadow-2xl duration-400 ease-in-out sm:p-8"
      >
        <CustomTitle
          variant="subheading"
          i18nKey={TitleKey.WELCOME_BACK}
          className="justify-center py-2"
        />
        <span
          className="text-primary-400 hover:text-accent-400 absolute top-4 right-4 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <X size={20} />
        </span>
        <div className="space-y-2">
          {children}
          {mode === 'forgot' ? (
            <p className="text-primary-400 mt-4 flex items-center justify-center">
              <CustomListItem
                i18nKey={ListItemKey.REMEMBER_PASSWORD}
                variant="small"
              />
              <CustomButton
                variant="underlined"
                as="link"
                href="/auth/login"
                i18nKey={ButtonKey.LOGIN}
                className="ml-2"
                icon={<ArrowRight size={16} />}
              />
            </p>
          ) : mode !== 'reset' ? (
            <>
              <CustomButton variant="google" i18nKey={ButtonKey.GOOGLE} />
              <p className="text-primary-400 mt-4 flex items-center justify-center">
                <CustomListItem
                  i18nKey={
                    mode === 'login'
                      ? ListItemKey.NO_ACCOUNT
                      : ListItemKey.HAVE_ACCOUNT
                  }
                  variant="small"
                />
                <CustomButton
                  variant="underlined"
                  as="link"
                  href={mode === 'login' ? '/auth/register' : '/auth/login'}
                  i18nKey={
                    mode === 'login' ? ButtonKey.REGISTER : ButtonKey.LOGIN
                  }
                  className="ml-2"
                  icon={<ArrowRight size={16} />}
                />
              </p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
