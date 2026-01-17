import { getCurrentUser } from '@/lib/actions/prisma-actions/db-acitons';
import { getCountries } from '@/utils/getCountries';
import { UpdateProfileForm } from './UpdateProfileForm';
import { AccountDiv } from '../AccountDiv';

export const UpdateProfile = async () => {
  const [currentUser, countries] = await Promise.all([
    getCurrentUser(),
    getCountries(),
  ]);
  if (!currentUser) return null;
  return (
    <AccountDiv mode="settings">
      <UpdateProfileForm user={currentUser} countries={countries} />
    </AccountDiv>
  );
};
