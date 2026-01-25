import {
  getBookingsListByUserId,
  getCurrentUser,
} from '@/lib/actions/prisma-actions/db-acitons';
import { UserBookingsList } from './UserBookingsList';
import { AccountDiv } from '../AccountDiv';
import { CustomListItem } from '@/components/ui/custom-components/CustomListItem';
import { ButtonKey, ErrorKey, ListItemKey } from '@/types/i18n/keys';
import { CustomButton } from '@/components/ui/custom-components/CustomButton';
import { ArrowRight } from 'lucide-react';
import { FadeLeftToRight } from '@/components/common/animation/FadeLeftToRight';
import { AppError } from '@/lib/errors/AppError';

export const UserBookings = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new AppError(ErrorKey.AUTH_REQUIRED);

  const bookings = await getBookingsListByUserId(currentUser.id);

  const content =
    bookings.length === 0 ? (
      <FadeLeftToRight>
        <div className="flex gap-2" data-testid="empty-bookings">
          <CustomListItem i18nKey={ListItemKey.NO_BOOKINGS} />
          <CustomButton
            variant="underlined"
            href="/rooms"
            as="link"
            i18nKey={ButtonKey.EXPLORE}
            icon={<ArrowRight size={16} />}
          />
        </div>
      </FadeLeftToRight>
    ) : (
      <AccountDiv mode="bookings" testId="bookings-list">
        <UserBookingsList bookings={bookings} />
      </AccountDiv>
    );

  return content;
};
