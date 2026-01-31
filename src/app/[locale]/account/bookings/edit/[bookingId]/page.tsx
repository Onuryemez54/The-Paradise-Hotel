import { CustomTitle } from '@/components/ui/custom-components/CustomTitle';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Suspense } from 'react';
import { CustomSubTitle } from '@/components/ui/custom-components/CustomSubTitle';
import { LoadingKey, NavKey, SubTitleKey, TitleKey } from '@/types/i18n/keys';
import { AccountDiv } from '@/components/account/AccountDiv';
import { EditBooking } from '@/components/account/bookings/EditBooking';
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
    title: t(NavKey.EDIT_BOOKING),
  };
}

interface EditBookingPageProps {
  params: Promise<{
    bookingId: string;
  }>;
}

const EditBookingPage = async ({ params }: EditBookingPageProps) => {
  const { bookingId } = await params;
  return (
    <AccountDiv mode="main">
      <CustomTitle variant="account" i18nKey={TitleKey.EDIT} className="mb-0" />
      <CustomSubTitle variant="account" i18nKey={SubTitleKey.EDIT} />
      <Suspense fallback={<LoadingSpinner label={LoadingKey.BOOK} />}>
        <div data-testid="booking-edit-client">
          <EditBooking bookingId={bookingId} />
        </div>
      </Suspense>
    </AccountDiv>
  );
};

export default EditBookingPage;
