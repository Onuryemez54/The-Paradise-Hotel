import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { LoadingKey } from '@/types/i18n/keys';

const Loading = () => {
  return <LoadingSpinner label={LoadingKey.ACCOUNT} />;
};

export default Loading;
