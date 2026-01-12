import { FadeUp } from '@/components/common/animation/FadeUp';
import { CustomButton } from '@/components/ui/custom-components/CustomButton';
import { CustomSubTitle } from '@/components/ui/custom-components/CustomSubTitle';
import { CustomTitle } from '@/components/ui/custom-components/CustomTitle';
import { ButtonKey, SubTitleKey, TitleKey } from '@/types/i18n/keys';
import { Home, HomeIcon } from 'lucide-react';
import Link from 'next/link';

enum Status {
  VERIFICATION = 'EMAIL_VERIFICATION',
  RESET = 'PASSWORD_RESET',
}

interface VerifyEmailPageProps {
  searchParams: Promise<{
    status: Status;
  }>;
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  const { status } = await searchParams;
  const keyTitle =
    status === Status.VERIFICATION
      ? TitleKey.VERIFY_EMAIL
      : TitleKey.RESET_PASSWORD;
  const keySubTitle =
    status === Status.VERIFICATION
      ? SubTitleKey.VERIFY_EMAIL
      : SubTitleKey.RESET_PASSWORD;

  return (
    <FadeUp>
      <div className="flex h-screen flex-col items-center justify-start text-center">
        <Link href="/" className="mb-4 text-blue-500">
          <HomeIcon size={48} />
        </Link>
        <CustomTitle variant="section" i18nKey={keyTitle} />

        <CustomSubTitle variant="section" i18nKey={keySubTitle} />

        {status === Status.VERIFICATION ? (
          <CustomButton
            variant="bordered"
            href="/"
            className="mt-6 gap-3"
            i18nKey={ButtonKey.HOME}
            as="link"
            icon={<Home size={16} />}
          />
        ) : null}
      </div>
    </FadeUp>
  );
};

export default VerifyEmailPage;
