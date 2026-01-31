import { CustomSubTitle } from '@/components/ui/custom-components/CustomSubTitle';
import { CustomTitle } from '@/components/ui/custom-components/CustomTitle';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { FilterOperations } from '@/components/rooms/FilterOperations';
import { RoomList } from '@/components/rooms/RoomList';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import {
  FilterValue,
  LoadingKey,
  NavKey,
  RoomsKey,
  SubTitleKey,
  TitleKey,
} from '@/types/i18n/keys';
import { Metadata } from 'next';
import { BookingReminder } from '@/components/rooms/BookingReminder';
import { getValidatedLocale } from '@/i18n/server';
import { MetadataProps } from '@/types/metadataPropsType';
import { PageContainer } from '@/components/common/PageContainer';

interface RoomsPageProps {
  searchParams: Promise<{
    capacity: string;
  }>;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const locale = await getValidatedLocale(params);

  const t = await getTranslations({
    locale,
    namespace: NavKey.TITLE,
  });

  return {
    title: t(NavKey.ROOMS),
  };
}

const RoomsPage = async ({ searchParams }: RoomsPageProps) => {
  const { capacity } = await searchParams;
  const t = await getTranslations(RoomsKey.TITLE);
  const filter = capacity ?? FilterValue.ALL;

  return (
    <PageContainer>
      <CustomTitle variant="section" i18nKey={TitleKey.ROOMS} />
      <CustomSubTitle variant="main" i18nKey={SubTitleKey.ROOMS} />

      <div className="mb-8 flex justify-end">
        <FilterOperations
          options={[
            { value: FilterValue.ALL, label: t(RoomsKey.CATEGORY_ALL) },
            { value: FilterValue.SMALL, label: t(RoomsKey.CATEGORY_N2) },
            { value: FilterValue.MEDIUM, label: t(RoomsKey.CATEGORY_N4) },
            { value: FilterValue.LARGE, label: t(RoomsKey.CATEGORY_N6) },
            { value: FilterValue.X_LARGE, label: t(RoomsKey.CATEGORY_N8) },
          ]}
          activeFilter={filter}
        />
      </div>

      <Suspense
        fallback={<LoadingSpinner label={LoadingKey.ROOMS} />}
        key={filter}
      >
        <RoomList filter={filter} />
        <BookingReminder />
      </Suspense>
    </PageContainer>
  );
};

export default RoomsPage;
