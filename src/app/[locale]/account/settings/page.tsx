import { CustomSubTitle } from '@/components/ui/custom-components/CustomSubTitle';
import { CustomTitle } from '@/components/ui/custom-components/CustomTitle';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Suspense } from 'react';
import { LoadingKey, NavKey, SubTitleKey, TitleKey } from '@/types/i18n/keys';
import { AccountDiv } from '@/components/account/AccountDiv';
import { UpdateProfile } from '@/components/account/profile/UpdateProfile';
import { AccountMetadata } from '../page';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: AccountMetadata): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: NavKey.TITLE,
  });

  return {
    title: t(NavKey.SETTINGS),
  };
}

const UserSettingsPage = async () => {
  return (
    <AccountDiv mode="main">
      <CustomTitle variant="account" i18nKey={TitleKey.SETTINGS} />
      <CustomSubTitle variant="account" i18nKey={SubTitleKey.SETTINGS} />
      <Suspense fallback={<LoadingSpinner label={LoadingKey.SETTINGS} />}>
        <UpdateProfile />
      </Suspense>
    </AccountDiv>
  );
};

export default UserSettingsPage;
