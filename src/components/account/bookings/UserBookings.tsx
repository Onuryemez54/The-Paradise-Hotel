import {
  getBookingsListByUserId,
  getCurrentUser,
} from '@/lib/actions/prisma-actions/db-acitons';
import { UserBookingsList } from './UserBookingsList';
import { AccountDiv } from '../AccountDiv';
import { CustomListItem } from '@/components/ui/custom-components/CustomListItem';
import { ButtonKey, ListItemKey } from '@/types/i18n/keys';
import { CustomButton } from '@/components/ui/custom-components/CustomButton';
import { ArrowRight } from 'lucide-react';
import { FadeLeftToRight } from '@/components/common/animation/FadeLeftToRight';

export const UserBookings = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  const bookings = await getBookingsListByUserId(currentUser.id);

  const content =
    bookings.length === 0 ? (
      <FadeLeftToRight>
        <div className="flex gap-2">
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
      <AccountDiv mode="bookings">
        <UserBookingsList bookings={bookings} />
      </AccountDiv>
    );

  return content;
};
