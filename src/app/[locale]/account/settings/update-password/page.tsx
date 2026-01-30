import { AccountDiv } from '@/components/account/AccountDiv';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { CustomSubTitle } from '@/components/ui/custom-components/CustomSubTitle';
import { CustomTitle } from '@/components/ui/custom-components/CustomTitle';
import { NavKey, SubTitleKey, TitleKey } from '@/types/i18n/keys';
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
    title: t(NavKey.UPDATE_PASSWORD),
  };
}

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
