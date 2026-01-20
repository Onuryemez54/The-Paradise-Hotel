import { FacilityDescKey, FacilityTitleKey } from '@/types/i18n/keys';
import { useTranslations } from 'next-intl';

interface FacilitiesImageTextProps {
  title: FacilityTitleKey;
  desc: FacilityDescKey;
}

export const FacilitiesImageText = ({
  title,
  desc,
}: FacilitiesImageTextProps) => {
  const tTitle = useTranslations(FacilityTitleKey.TITLE);
  const tDesc = useTranslations(FacilityDescKey.TITLE);
  return (
    <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black via-black/30 to-transparent p-5">
      <h3 className="text-sm font-bold tracking-wide text-white">
        {tTitle(title)}
      </h3>
      <p className="mt-1 mb-2.5 text-xs font-medium text-white/80 lg:mb-0">
        {tDesc(desc)}
      </p>
    </div>
  );
};
