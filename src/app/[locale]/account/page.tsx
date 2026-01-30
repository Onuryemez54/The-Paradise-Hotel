import { CustomSubTitle } from '@/components/ui/custom-components/CustomSubTitle';
import { CustomTitle } from '@/components/ui/custom-components/CustomTitle';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Suspense } from 'react';
import { VerifiedToast } from '@/components/account/dashboard/VerifiedToast';
import { LoadingKey, NavKey, SubTitleKey, TitleKey } from '@/types/i18n/keys';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AccountDiv } from '@/components/account/AccountDiv';
import { AccountDashboard } from '@/components/account/dashboard/AccountDashboard';
import { getValidatedLocale } from '@/i18n/server';
import { MetadataProps } from '@/types/metadataPropsType';

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const locale = await getValidatedLocale(params);

  const t = await getTranslations({
    locale,
    namespace: NavKey.TITLE,
  });

  return {
    title: t(NavKey.PROFILE),
  };
}
const AccountPage = () => {
  return (
    <AccountDiv mode="main">
      <CustomTitle variant="account" i18nKey={TitleKey.DASHBOARD} />
      <CustomSubTitle
        variant="account"
        className="mb-8"
        i18nKey={SubTitleKey.DASHBOARD}
      />
      <Suspense fallback={<LoadingSpinner label={LoadingKey.DASHBOARD} />}>
        <AccountDashboard />
      </Suspense>
      <VerifiedToast />
    </AccountDiv>
  );
};

export default AccountPage;
