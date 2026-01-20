import { HeroSlider } from '@/components/home/HeroSlider';
import { Divider } from '@/components/common/Divider';
import { HOTEL_AMENITIES_GALLERY } from '@/constants/amenities.constants';
import { MapAndFeedback } from '@/components/home/MapAndFeedback';
import { FacilitiesShowcase } from '@/components/home/FacilitiesShowcase';
import { HotelDesc } from '@/components/home/HotelDesc';

export default async function Home() {
  return (
    <div className="flex flex-col gap-10">
      <main className="mt-24 -mb-50 h-screen w-full">
        <HeroSlider />
      </main>
      <HotelDesc />
      <Divider />
      <FacilitiesShowcase items={HOTEL_AMENITIES_GALLERY} />
      <Divider />
      <MapAndFeedback />
    </div>
  );
}
