import { Amenities } from '@/components/common/Amenities';
import { HeroSlider } from '@/components/home/HeroSlider';
import { Divider } from '@/components/common/Divider';
import { HOTEL_AMENITIES } from '@/constants/amenities.constants';
import { MapAndFeedback } from '@/components/home/MapAndFeedback';

export default async function Home() {
  return (
    <div className="flex flex-col gap-10">
      <main className="mt-24 -mb-50 h-screen w-full">
        <HeroSlider />
      </main>
      <Amenities items={HOTEL_AMENITIES} animated container="section" />
      <Divider />
      <MapAndFeedback />
    </div>
  );
}
