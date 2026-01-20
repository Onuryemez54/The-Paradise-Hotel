import { FadeUp } from '@/components/common/animation/FadeUp';
import { CustomButton } from '@/components/ui/custom-components/CustomButton';
import { CustomSubTitle } from '@/components/ui/custom-components/CustomSubTitle';
import { CustomTitle } from '@/components/ui/custom-components/CustomTitle';
import { ButtonKey, SubTitleKey, TitleKey } from '@/types/i18n/keys';
import { Home, HomeIcon } from 'lucide-react';
import Link from 'next/link';

interface VerifyEmailPageProps {
  searchParams: Promise<{
    status: TitleKey.VERIFY_EMAIL | TitleKey.RESET_PASSWORD;
  }>;
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  const { status } = await searchParams;
  const keyTitle = TitleKey[status];
  const keySubTitle = SubTitleKey[status];

  return (
    <FadeUp>
      <div className="flex h-screen flex-col items-center justify-start text-center">
        <Link href="/" className="text-primary-400 mb-4">
          <HomeIcon size={48} />
        </Link>
        <CustomTitle variant="section" i18nKey={keyTitle} />

        <CustomSubTitle variant="section" i18nKey={keySubTitle} />

        {status === TitleKey.VERIFY_EMAIL ? (
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
