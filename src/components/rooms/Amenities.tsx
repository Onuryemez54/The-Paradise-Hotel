import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import { CustomTitle } from '../ui/custom-components/CustomTitle';
import { ScrollReveal } from '../common/animation/ScrollReveal';
import { AmenityItem } from '@/types/ui/amenitiesTypes';
import { AmenitiesKey, TitleKey } from '@/types/i18n/keys';

interface AmenitiesProps {
  items: AmenityItem[];
}

export const Amenities = async ({ items }: AmenitiesProps) => {
  const t = await getTranslations(AmenitiesKey.TITLE);
  const cardDivClass =
    'mx-auto mt-2 grid grid-cols-2 gap-2 sm:w-full md:grid-cols-3 md:gap-6 lg:grid-cols-4';
  const itemClassName = 'bg-primary-600/50 hover:bg-primary-600';

  const content = (
    <div className={cardDivClass}>
      {items.map(({ icon: Icon, key }) => {
        const card = (
          <div
            className={clsx(
              'flex items-center gap-3 rounded-xl px-3 py-3 transition',
              itemClassName
            )}
          >
            <Icon className="text-accent-400 h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
            <span className="font-body text-primary-200 text-xs sm:text-sm md:text-base">
              {t(key)}
            </span>
          </div>
        );

        return <div key={key}>{card}</div>;
      })}
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      <ScrollReveal delay={0.1}>
        <CustomTitle
          variant="subheading"
          className="mb-10 justify-center"
          i18nKey={TitleKey.AMENITIES}
        />
      </ScrollReveal>
      <ScrollReveal delay={0.2}>{content}</ScrollReveal>
    </div>
  );
};
