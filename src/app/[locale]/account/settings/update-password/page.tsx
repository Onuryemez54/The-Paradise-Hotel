import { AccountDiv } from '@/components/account/AccountDiv';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { CustomSubTitle } from '@/components/ui/custom-components/CustomSubTitle';
import { CustomTitle } from '@/components/ui/custom-components/CustomTitle';
import { SubTitleKey, TitleKey } from '@/types/i18n/keys';

export const metadata = {
  title: 'Account Settings',
};

const UpdatePasswordPage = () => {
  return (
    <AccountDiv mode="main">
      <CustomTitle variant="account" i18nKey={TitleKey.PASSWORD} />
      <CustomSubTitle variant="account" i18nKey={SubTitleKey.PASSWORD} />
      <AccountDiv mode="updatePassword">
        <ResetPasswordForm />
      </AccountDiv>
    </AccountDiv>
  );
};

export default UpdatePasswordPage;
