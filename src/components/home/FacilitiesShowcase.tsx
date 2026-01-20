'use client';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import { Facility } from '@/types/ui/amenitiesTypes';
import { HomeWrapper } from './HomeWrapper';
import { CustomTitle } from '../ui/custom-components/CustomTitle';
import { SubTitleKey, TitleKey } from '@/types/i18n/keys';
import { CustomSubTitle } from '../ui/custom-components/CustomSubTitle';
import { ScrollReveal } from '../common/animation/ScrollReveal';
import { FacilitiesImageText } from './FacilitiesImageText';
import 'swiper/css';
import 'swiper/css/pagination';
import 'yet-another-react-lightbox/styles.css';

type FacilitiesShowcaseProps = {
  items: Facility[];
};

export const FacilitiesShowcase = ({ items }: FacilitiesShowcaseProps) => {
  const { theme } = useTheme();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isDark = theme === 'dark';
  const imageClass = `border-accent-border/60 rounded-3xl border-2 object-cover shadow-2xl transition-transform duration-700 group-hover:scale-110 ${isDark ? 'brightness-90 contrast-110' : 'brightness-95 contrast-105'}`;
  const overlayClass = `absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-100 ${isDark ? 'bg-black/20' : 'bg-white/20'}`;

  return (
    <HomeWrapper>
      <CustomTitle
        variant="subheading"
        className="mb-2 justify-center"
        i18nKey={TitleKey.FACILITIES}
      />

      <CustomSubTitle
        variant="account"
        i18nKey={SubTitleKey.FACILITIES}
        className="mb-10"
      />
      <div className="mx-auto max-w-7xl">
        <div className="hidden grid-cols-4 gap-6 lg:grid">
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl shadow-2xl"
            >
              <ScrollReveal delay={i * 0.2}>
                <div className="relative h-80 w-full">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className={imageClass}
                  />
                </div>

                <div className={overlayClass} />
                <FacilitiesImageText
                  title={item.title}
                  desc={item.description}
                />
              </ScrollReveal>
            </div>
          ))}
        </div>

        <div className="relative w-full overflow-hidden lg:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={12}
            slidesPerView={1}
            className="facilities-swiper w-full"
          >
            {items.map((item, i) => (
              <SwiperSlide key={i} className="w-full!">
                <div
                  onClick={() => setLightboxIndex(i)}
                  className="group relative w-full cursor-pointer overflow-hidden rounded-3xl shadow-2xl"
                >
                  <div className="relative h-72 w-full">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="100vw"
                      className={imageClass}
                    />
                  </div>

                  <div className={overlayClass} />

                  <FacilitiesImageText
                    title={item.title}
                    desc={item.description}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          open
          close={() => setLightboxIndex(null)}
          index={lightboxIndex}
          slides={items.map((i) => ({ src: i.src }))}
          styles={{
            container: {
              backgroundColor: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              padding: 'clamp(16px, 5vw, 64px)',
            },
            slide: {
              maxWidth: '900px',
              margin: '0 auto',
              overflow: 'hidden',
            },
          }}
        />
      )}
    </HomeWrapper>
  );
};
