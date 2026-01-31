import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { PageContainer } from '@/components/common/PageContainer';
import { LoadingKey } from '@/types/i18n/keys';

const Loading = () => {
  return (
    <PageContainer>
      <LoadingSpinner label={LoadingKey.ROOM} />
    </PageContainer>
  );
};

export default Loading;
