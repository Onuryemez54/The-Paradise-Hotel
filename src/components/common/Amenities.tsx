import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import { CustomTitle } from '../ui/custom-components/CustomTitle';
import { ScrollReveal } from './animation/ScrollReveal';
import { AmenityItem } from '@/types/amenitiesTypes';
import { AmenitiesKey, TitleKey } from '@/types/i18n/keys';

type ConteinerType = 'section' | 'div';
interface AmenitiesProps {
  items: AmenityItem[];
  animated?: boolean;
  container?: ConteinerType;
}

const containerStyles: Record<ConteinerType, string> = {
  section: 'px-6 md:px-20',
  div: 'flex flex-col gap-2',
};

export const Amenities = async ({
  items,
  animated = false,
  container = 'div',
}: AmenitiesProps) => {
  const t = await getTranslations(AmenitiesKey.TITLE);
  const Wrapper = container;
  const CardDiv = 'div';
  const cardDivClass =
    container === 'div'
      ? 'mx-auto mt-2 grid grid-cols-2 gap-2 sm:w-full md:grid-cols-3 md:gap-6 lg:grid-cols-4'
      : 'grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-10';
  const itemClassName =
    container === 'div'
      ? 'bg-primary-600/50 hover:bg-primary-600'
      : 'justify-center bg-transparent shadow hover:shadow-lg';

  const content = (
    <CardDiv className={cardDivClass}>
      {items.map(({ icon: Icon, key }, i) => {
        const card = (
          <div
            className={clsx(
              'flex items-center gap-3 rounded-xl px-3 py-3 transition',
              itemClassName
            )}
          >
            <Icon
              className={clsx(
                'text-accent-400 h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8'
              )}
            />
            <span
              className={clsx(
                'font-body text-primary-200 text-xs sm:text-sm md:text-base'
              )}
            >
              {t(key)}
            </span>
          </div>
        );

        return animated ? (
          <ScrollReveal key={key} delay={i * 0.1}>
            {card}
          </ScrollReveal>
        ) : (
          <div key={key}>{card}</div>
        );
      })}
    </CardDiv>
  );

  return (
    <Wrapper className={containerStyles[container]}>
      <ScrollReveal delay={0.1}>
        <CustomTitle
          variant="subheading"
          className="mb-10 justify-center"
          i18nKey={TitleKey.AMENITIES}
        />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>{content}</ScrollReveal>
    </Wrapper>
  );
};
