import { CustomSubTitle } from '@/components/ui/custom-components/CustomSubTitle';
import { CustomTitle } from '@/components/ui/custom-components/CustomTitle';
import { AccountDiv } from '@/components/account/AccountDiv';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Suspense } from 'react';
import { LoadingKey, NavKey, SubTitleKey, TitleKey } from '@/types/i18n/keys';
import { UserBookings } from '@/components/account/bookings/UserBookings';
import { Metadata } from 'next';
import { getValidatedLocale } from '@/i18n/server';
import { getTranslations } from 'next-intl/server';
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
    title: t(NavKey.BOOKINGS),
  };
}

const UserBookingsPage = () => {
  return (
    <AccountDiv mode="main">
      <CustomTitle variant="account" i18nKey={TitleKey.BOOKINGS} />
      <CustomSubTitle variant="account" i18nKey={SubTitleKey.BOOKINGS} />
      <Suspense fallback={<LoadingSpinner label={LoadingKey.BOOKINGS} />}>
        <UserBookings />
      </Suspense>
    </AccountDiv>
  );
};

export default UserBookingsPage;
