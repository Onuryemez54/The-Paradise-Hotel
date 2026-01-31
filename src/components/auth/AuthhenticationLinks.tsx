'use client';
import { ButtonKey } from '@/types/i18n/keys';
import { CustomButton } from '../ui/custom-components/CustomButton';

export const AuthenticationLinks = ({
  setIsOpen,
}: {
  setIsOpen?: (isOpen: boolean) => void;
}) => {
  return (
    <div className="mb-4 flex flex-col items-center justify-center gap-4 md:mb-0 md:flex-row md:gap-2">
      <CustomButton
        variant="login"
        href="/auth/login"
        className="py-1"
        i18nKey={ButtonKey.LOGIN}
        as="link"
        setIsOpen={setIsOpen}
      />
      <CustomButton
        variant="register"
        href="/auth/register"
        className="py-1"
        i18nKey={ButtonKey.REGISTER}
        as="link"
        setIsOpen={setIsOpen}
      />
    </div>
  );
};
