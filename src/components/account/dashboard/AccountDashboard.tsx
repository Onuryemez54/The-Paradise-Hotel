import { CustomButton } from '../../ui/custom-components/CustomButton';
import { CustomTitle } from '../../ui/custom-components/CustomTitle';
import { DashboardCard } from './DashboardCard ';
import { ButtonKey, TitleKey } from '@/types/i18n/keys';
import { UserImage } from '@/components/common/UserImage';
import {
  getCurrentUser,
  getDashboardBookingsByUserId,
} from '@/lib/actions/prisma-actions/db-acitons';
import { AccountDiv } from '../AccountDiv';

export const AccountDashboard = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  const bookings = await getDashboardBookingsByUserId(currentUser.id);
  return (
    <AccountDiv mode="dashboard">
      <div className="mx-auto">
        <div className="mb-10 flex flex-col items-center justify-between gap-2 sm:flex-row">
          <CustomTitle variant="subheading" i18nKey={TitleKey.GREETING}>
            <span className="border-border/80 border-b pb-1">
              {currentUser.name || 'Guest'}
            </span>
          </CustomTitle>
          <div className="flex items-center gap-3">
            <UserImage
              image={currentUser.image || '/icons/default-user.png'}
              size="medium"
              borderColor="accent-border"
            />
            <div className="text-sm">
              <p className="text-primary-300 font-semibold">
                {currentUser?.name || 'Guest'}
              </p>
              <p className="text-footer-foreground">{currentUser?.email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <div className="flex flex-row gap-2 md:flex-row lg:gap-4 2xl:gap-6">
            <DashboardCard title="STATISTICS" bookings={bookings} />
            <DashboardCard title="RECENT_ACTIVITY" bookings={bookings} />
          </div>
          <div className="flex flex-row items-center justify-center gap-2 md:flex-col">
            <CustomButton
              variant="ghost"
              href="/account/bookings"
              className="border-primary-400 hover:bg-primary-400"
              i18nKey={ButtonKey.BOOKINGS}
            />
            <CustomButton
              variant="ghost"
              href="/rooms"
              className="border-accent-400 hover:bg-accent-400"
              i18nKey={ButtonKey.NEW}
            />
            <CustomButton
              variant="ghost"
              href="/account/settings"
              className="border-primary-400 hover:bg-primary-400"
              i18nKey={ButtonKey.EDIT}
            />
          </div>
        </div>
      </div>
    </AccountDiv>
  );
};
