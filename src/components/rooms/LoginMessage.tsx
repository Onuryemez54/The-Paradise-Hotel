import { CustomButton } from '@/components/ui/custom-components/CustomButton';
import { CustomListItem } from '@/components/ui/custom-components/CustomListItem';
import { Divider } from '@/components/common/Divider';
import { CustomSubTitle } from '@/components/ui/custom-components/CustomSubTitle';
import { ArrowRight } from 'lucide-react';
import { ButtonKey, ListItemKey, SubTitleKey } from '@/types/i18n/keys';

export const LoginMessage = () => {
  return (
    <div className="bg-primary-800/60 border-accent-600/50 flex flex-col justify-center rounded-2xl border px-4 py-2 shadow-lg lg:px-8">
      <CustomSubTitle
        variant="account"
        i18nKey={SubTitleKey.LOGIN_MESSAGE}
        className="border-accent-600/50 my-4 border-b pb-1 text-center"
      />
      <div className="text-primary-400 mt-4 flex flex-col">
        <p className="flex items-center justify-between">
          <CustomListItem i18nKey={ListItemKey.NO_ACCOUNT} variant="small" />
          <CustomButton
            variant="underlined"
            as="link"
            href={'/auth/register'}
            i18nKey={ButtonKey.REGISTER}
            className="ml-2"
            icon={<ArrowRight size={16} />}
          />
        </p>
        <Divider />
        <p className="flex items-center justify-between">
          <CustomListItem i18nKey={ListItemKey.HAVE_ACCOUNT} variant="small" />
          <CustomButton
            variant="underlined"
            as="link"
            href={'/auth/login'}
            i18nKey={ButtonKey.LOGIN}
            className="ml-2"
            icon={<ArrowRight size={16} />}
          />
        </p>
      </div>
    </div>
  );
};
