import { getRoomCount } from '@/lib/actions/prisma-actions/db-acitons';
import { HomeWrapper } from './HomeWrapper';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ButtonKey, HomeDescKey } from '@/types/i18n/keys';
import { CustomButton } from '../ui/custom-components/CustomButton';
import { ArrowRight } from 'lucide-react';

export const HotelDesc = async () => {
  const roomCount = await getRoomCount();
  const t = await getTranslations(HomeDescKey.TITLE);
  return (
    <HomeWrapper>
      <div className="mx-auto mb-8 grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-7 md:items-center md:gap-24">
        <div className="md:col-span-3">
          <div className="flex flex-col items-start gap-10">
            <div className="flex gap-10">
              <div className="space-y-3">
                <div className="text-primary-300 text-5xl font-bold">5</div>
                <div className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  {t(HomeDescKey.STARS)}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-primary-300 text-5xl font-bold">
                  {roomCount}
                </div>
                <div className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  {t(HomeDescKey.ROOMS)}
                </div>
              </div>
            </div>

            <p className="text-primary-300 text-sm leading-relaxed sm:text-base xl:text-lg">
              {t(HomeDescKey.DESC)}
            </p>

            <CustomButton
              as="link"
              href="/about"
              variant="underlined"
              i18nKey={ButtonKey.MORE_ABOUT_US}
              className="ml-2"
              icon={<ArrowRight size={16} />}
            />
          </div>
        </div>
        <div className="md:col-span-4">
          <div className="relative h-96 w-full">
            <Image
              src="/about/reception.webp"
              alt="Hotel Reception"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 60vw"
              className="border-border rounded-3xl border-2 object-cover shadow-2xl"
            />
            <div className="3xl:w-[300px] absolute -bottom-16 -left-16 z-30 hidden h-36 w-56 md:flex lg:h-44 lg:w-64 2xl:h-52 2xl:w-72">
              <div className="relative h-full w-full">
                <Image
                  src="/about/lobby.webp"
                  alt="Hotel Lobby"
                  fill
                  sizes="(max-width: 768px) 224px, (max-width: 1024px) 256px,(max-width: 1536px) 288px, 300px"
                  className="border-accent-500 rounded-2xl border object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeWrapper>
  );
};
