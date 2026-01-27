import Image from 'next/image';
import { FadeLeftToRight } from '@/components/common/animation/FadeLeftToRight';
import { FadeRightToLeft } from '@/components/common/animation/FadeRightToLeft';
import { CustomButton } from '@/components/ui/custom-components/CustomButton';
import { CustomTitle } from '@/components/ui/custom-components/CustomTitle';
import { CustomSubTitle } from '@/components/ui/custom-components/CustomSubTitle';
import { Divider } from '@/components/common/Divider';
import { BrandName } from '@/components/common/BrandName';
import { CustomListItem } from '@/components/ui/custom-components/CustomListItem';
import { ArrowDown } from 'lucide-react';
import { Amenities } from '@/components/rooms/Amenities';
import { ROOM_AMENITIES } from '@/constants/amenities.constants';
import { RoomType } from '@/types/rooms/room';
import {
  ButtonKey,
  ListItemKey,
  SubTitleKey,
  TitleKey,
} from '@/types/i18n/keys';
import { assertDescriptionType } from '@/utils/room-helpers/assertDescriptionType';
import { RoomDetailType } from '@/lib/actions/prisma-actions/db-acitons';
import { RoomPrice } from './RoomPrice';

interface RoomDetailProps {
  room: RoomDetailType;
}

export const RoomDetail = async ({ room }: RoomDetailProps) => {
  const { maxCapacity, image, regularPrice, discount, type } = room;
  const roomType = assertDescriptionType(type as RoomType);

  return (
    <section className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[3fr_4fr]">
        <FadeLeftToRight>
          <div
            data-testid="room-image"
            className="border-accent-600/80 shadow-accent-900/30 relative overflow-hidden rounded-2xl border-4 shadow-lg"
          >
            {image && (
              <Image
                priority
                src={image}
                alt={type || 'TypeA'}
                width={800}
                height={600}
                className="h-[350px] w-full object-cover md:h-full"
              />
            )}
          </div>
        </FadeLeftToRight>

        <FadeRightToLeft>
          <div className="flex flex-col justify-center">
            <div className="mb-6 space-y-4">
              <CustomTitle
                variant="subheading"
                i18nKey={TitleKey.DETAIL}
                roomType={roomType}
              >
                <BrandName variant="room" />
              </CustomTitle>

              <RoomPrice regularPrice={regularPrice} discount={discount || 0} />
            </div>

            <CustomSubTitle
              variant="section"
              i18nKey={SubTitleKey.DETAIL}
              roomType={roomType}
            />

            <Divider />

            <ul className="text-primary-200 flex flex-col gap-4">
              <CustomListItem
                i18nKey={ListItemKey.GUEST}
                maxGuests={maxCapacity}
              />
              <CustomListItem i18nKey={ListItemKey.ADDRESS} wrap />
              <CustomListItem i18nKey={ListItemKey.PRIVACY} />
            </ul>

            <div className="flex justify-end px-4 py-4">
              <CustomButton
                variant="bordered"
                i18nKey={ButtonKey.BOOK}
                icon={<ArrowDown size={16} />}
              />
            </div>
          </div>
        </FadeRightToLeft>
      </div>
      <Divider />
      <Amenities items={ROOM_AMENITIES} />
    </section>
  );
};
