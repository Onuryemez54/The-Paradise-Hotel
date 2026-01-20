import Image from 'next/image';
import about1 from '@/../public/about/about-1.webp';
import about2 from '@/../public/about/about-2.webp';
import { ScrollReveal } from '@/components/common/animation/ScrollReveal';
import { FadeLeftToRight } from '@/components/common/animation/FadeLeftToRight';
import { FadeRightToLeft } from '@/components/common/animation/FadeRightToLeft';
import { CustomSubTitle } from '@/components/ui/custom-components/CustomSubTitle';
import { CustomTitle } from '@/components/ui/custom-components/CustomTitle';
import { CustomButton } from '@/components/ui/custom-components/CustomButton';
import { ButtonKey, NavKey, SubTitleKey, TitleKey } from '@/types/i18n/keys';
import { getRoomCount } from '@/lib/actions/prisma-actions/db-acitons';
import { AppLocale } from '@/i18n/routing';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface MetadataProps {
  params: Promise<{
    locale: AppLocale;
  }>;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: NavKey.TITLE,
  });

  return {
    title: t(NavKey.ABOUT),
  };
}

const AboutPage = async () => {
  const roomCount = await getRoomCount();

  return (
    <div className="grid grid-cols-5 items-center gap-x-10 gap-y-10 sm:gap-x-24 md:gap-y-24 lg:gap-y-32">
      <div className="col-span-5 md:col-span-3">
        <FadeLeftToRight delay={0.2}>
          <CustomTitle
            variant="section"
            className="mb-4 lg:mb-6 xl:mb-10"
            i18nKey={TitleKey.ABOUT}
          />
          <CustomSubTitle
            variant="section"
            className="text-center"
            i18nKey={SubTitleKey.ABOUT}
            values={{ count: roomCount }}
          />
        </FadeLeftToRight>
      </div>

      <div className="hidden md:col-span-2 md:grid">
        <FadeRightToLeft delay={0.2}>
          <Image
            src={about1}
            alt="Family sitting around a fire pit in front of cabin"
            placeholder="blur"
            width={400}
            height={400}
            className="rounded-full"
          />
        </FadeRightToLeft>
      </div>

      <div className="hidden md:col-span-2 md:grid">
        <ScrollReveal delay={0.2}>
          <Image
            src={about2}
            alt="Family that manages The Paradise Hotel"
            placeholder="blur"
            width={600}
            height={600}
            className="rounded-2xl"
          />
        </ScrollReveal>
      </div>

      <div className="col-span-5 md:col-span-3">
        <ScrollReveal delay={0.2}>
          <CustomTitle
            variant="section"
            className="mb-4 lg:mb-6 xl:mb-10"
            i18nKey={TitleKey.STORY}
          />

          <CustomSubTitle
            variant="section"
            className="text-center"
            i18nKey={SubTitleKey.STORY}
          />

          <div className="mt-8 flex w-full items-center justify-center">
            <CustomButton
              variant="explore"
              href="/rooms"
              as="link"
              isAnimated
              i18nKey={ButtonKey.EXPLORE}
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default AboutPage;
