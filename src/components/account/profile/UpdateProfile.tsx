import { getCurrentUser } from '@/lib/actions/prisma-actions/db-acitons';
import { getCountries } from '@/utils/getCountries';
import { UpdateProfileForm } from './UpdateProfileForm';
import { AccountDiv } from '../AccountDiv';
import { AppError } from '@/lib/errors/AppError';
import { ErrorKey } from '@/types/i18n/keys';

export const UpdateProfile = async () => {
  const [currentUser, countries] = await Promise.all([
    getCurrentUser(),
    getCountries(),
  ]);
  if (!currentUser) throw new AppError(ErrorKey.AUTH_REQUIRED);

  return (
    <AccountDiv mode="settings">
      <UpdateProfileForm user={currentUser} countries={countries} />
    </AccountDiv>
  );
};
