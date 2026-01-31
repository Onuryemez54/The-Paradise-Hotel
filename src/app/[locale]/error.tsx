'use client';
import { CustomButton } from '@/components/ui/custom-components/CustomButton';
import { ButtonKey, ErrorKey } from '@/types/i18n/keys';
import { appErrorStatusMap } from '@/types/errors/appErrorStatus';
import { Home } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FadeUp } from '@/components/common/animation/FadeUp';
import { PageContainer } from '@/components/common/PageContainer';

type ErrorWithMeta = Error & {
  code?: string;
  status?: number;
  digest?: string;
};

const Error = ({ error }: { error: ErrorWithMeta }) => {
  const t = useTranslations(ErrorKey.TITLE);

  const errorKey: ErrorKey =
    (error.code && t.has(error.code) && (error.code as ErrorKey)) ||
    (t.has(error.message) && (error.message as ErrorKey)) ||
    ErrorKey.UNKNOWN;

  const status = error.status ?? appErrorStatusMap[errorKey] ?? 500;

  const handleReset = () => {
    window.location.href = '/';
  };

  return (
    <PageContainer>
      <FadeUp>
        <main className="flex min-h-[50vh] w-full flex-col items-center justify-start gap-4 p-16 lg:gap-8">
          <h1 className="text-accent-500 font-heading text-center text-xl font-extrabold sm:text-2xl md:text-4xl lg:text-5xl">
            {status}
          </h1>

          <h3 className="font-heading text-primary-200 animate-pulse text-center text-sm font-semibold tracking-wide sm:text-base md:text-lg lg:text-2xl 2xl:text-3xl">
            {t(errorKey)}
          </h3>

          <CustomButton
            onAction={handleReset}
            i18nKey={ButtonKey.HOME}
            variant="bordered"
            className="font-heading"
            icon={<Home size={16} />}
          />
        </main>
      </FadeUp>
    </PageContainer>
  );
};

export default Error;
