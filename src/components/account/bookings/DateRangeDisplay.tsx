'use client';
import { enUS, de, tr } from 'date-fns/locale';
import { Redo } from 'lucide-react';
import { format, formatDistance, isToday, Locale, parseISO } from 'date-fns';
import { useLocale } from 'next-intl';

const localeMap = {
  en: enUS,
  de: de,
  tr: tr,
};

export const formatDistanceFromNow = (date: Date | string, locale: Locale) => {
  const parsed = date instanceof Date ? date : parseISO(date);

  return formatDistance(parsed, new Date(), {
    addSuffix: true,
    locale,
  }).replace(/^about\s/, '');
};

type DateRangeDisplayProps = {
  startDate: Date | string;
  endDate: Date | string;
};

export const DateRangeDisplay = ({
  startDate,
  endDate,
}: DateRangeDisplayProps) => {
  const locale = useLocale();
  const start = startDate instanceof Date ? startDate : parseISO(startDate);
  const end = endDate instanceof Date ? endDate : parseISO(endDate);
  const dateLocale = localeMap[locale as keyof typeof localeMap] ?? enUS;

  const startLong = format(start, 'PPpp', { locale: dateLocale });
  const startShort = format(start, 'PP', { locale: dateLocale });

  const endLong = format(end, 'PPpp', { locale: dateLocale });
  const endShort = format(end, 'PP', { locale: dateLocale });
  const relativeStart = isToday(start)
    ? locale === 'tr'
      ? 'Bugün'
      : locale === 'de'
        ? 'Heute'
        : 'Today'
    : formatDistanceFromNow(start, dateLocale);

  return (
    <p className="text-primary-200 3xl:text-lg text-xs lg:text-sm">
      <span className="hidden lg:inline">{startLong}</span>
      <span className="inline lg:hidden">{startShort}</span>

      <span className="mx-1">({relativeStart})</span>

      <Redo className="mx-1 inline h-4 w-4" />

      <span className="hidden lg:inline">{endLong}</span>
      <span className="inline lg:hidden">{endShort}</span>
    </p>
  );
};
