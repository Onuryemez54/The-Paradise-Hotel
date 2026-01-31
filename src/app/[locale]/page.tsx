import { HeroSlider } from '@/components/home/HeroSlider';
import { Divider } from '@/components/common/Divider';
import { HOTEL_AMENITIES_GALLERY } from '@/constants/amenities.constants';
import { MapAndFeedback } from '@/components/home/MapAndFeedback';
import { FacilitiesShowcase } from '@/components/home/FacilitiesShowcase';
import { HotelDesc } from '@/components/home/HotelDesc';

const Home = () => {
  return (
    <>
      <HeroSlider />
      <main className="mx-auto mt-4 flex w-full max-w-7xl flex-col gap-8 px-8 py-12 xl:mt-6 xl:gap-14">
        <HotelDesc />
        <Divider />
        <FacilitiesShowcase items={HOTEL_AMENITIES_GALLERY} />
        <Divider />
        <MapAndFeedback />
      </main>
    </>
  );
};

export default Home;
