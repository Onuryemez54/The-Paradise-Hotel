import { FadeUp } from '@/components/common/animation/FadeUp';
import { CustomButton } from '@/components/ui/custom-components/CustomButton';
import { CustomSubTitle } from '@/components/ui/custom-components/CustomSubTitle';
import { CustomTitle } from '@/components/ui/custom-components/CustomTitle';
import { ButtonKey, SubTitleKey, TitleKey } from '@/types/i18n/keys';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <FadeUp>
      <div className="flex flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="text-accent-400 text-3xl font-extrabold tracking-wide sm:text-5xl md:text-6xl">
          404
        </h1>

        <CustomTitle
          variant="section"
          className="text-primary-100"
          i18nKey={TitleKey.NOT_FOUND}
        />

        <CustomSubTitle variant="section" i18nKey={SubTitleKey.NOT_FOUND} />

        <CustomButton
          variant="bordered"
          href="/"
          className="mt-6 gap-3"
          i18nKey={ButtonKey.HOME}
          as="link"
          icon={<Home size={16} />}
        />
      </div>
    </FadeUp>
  );
};

export default NotFoundPage;
