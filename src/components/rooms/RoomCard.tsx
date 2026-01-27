import { ScrollReveal } from '@/components/common/animation/ScrollReveal';
import { CustomButton } from '@/components/ui/custom-components/CustomButton';
import { CustomTitle } from '@/components/ui/custom-components/CustomTitle';
import { Divider } from '@/components/common/Divider';
import { CustomListItem } from '@/components/ui/custom-components/CustomListItem';
import { ArrowRight } from 'lucide-react';
import { ButtonKey, ListItemKey, TitleKey } from '@/types/i18n/keys';
import Image from 'next/image';
import { RoomType } from '@/types/rooms/room';
import { RoomListItem } from '@/lib/actions/prisma-actions/db-acitons';
import { assertDescriptionType } from '@/utils/room-helpers/assertDescriptionType';
import { RoomPrice } from './RoomPrice';

interface RoomCardProps {
  room: RoomListItem;
}

export const RoomCard = async ({ room }: RoomCardProps) => {
  const { id, image, maxCapacity, regularPrice, discount, type } = room;
  const roomType = assertDescriptionType(type as RoomType);

  return (
    <ScrollReveal>
      <div
        data-testid="room-card"
        className="font-body border-accent-border/70 bg-primary-600 hover:border-accent-border hover:shadow-primary-500 cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-md"
      >
        <div className="relative h-64 w-full md:h-72">
          <Image
            src={image || ''}
            alt={type || 'TypeA'}
            fill
            sizes="
            (max-width: 640px) 100vw,
            (max-width: 768px) 100vw,
            (max-width: 1024px) 100vw,
            100vw
            "
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="px-6">
          <CustomTitle
            variant="subheading"
            className="mt-4"
            i18nKey={TitleKey.CARD}
            roomType={roomType}
          />

          <CustomListItem i18nKey={ListItemKey.GUEST} maxGuests={maxCapacity} />

          <Divider color="primary-400" m />

          <RoomPrice regularPrice={regularPrice} discount={discount || 0} />
        </div>

        <Divider color="primary-400" />

        <div className="mx-6 flex justify-end px-4 pb-4">
          <CustomButton
            variant="details"
            i18nKey={ButtonKey.VIEW}
            as="link"
            href={`/rooms/${id}`}
            icon={<ArrowRight size={16} />}
          />
        </div>
      </div>
    </ScrollReveal>
  );
};
