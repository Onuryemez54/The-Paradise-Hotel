import { CustomSubTitle } from '@/components/ui/custom-components/CustomSubTitle';
import { CustomTitle } from '@/components/ui/custom-components/CustomTitle';
import { AccountDiv } from '@/components/account/AccountDiv';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Suspense } from 'react';
import { LoadingKey, SubTitleKey, TitleKey } from '@/types/i18n/keys';
import { UserBookings } from '@/components/account/bookings/UserBookings';

export const metadata = {
  title: 'Bookings',
};

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
