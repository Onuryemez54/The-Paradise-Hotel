'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/shadcn/select';

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'tr', label: 'TR' },
  { code: 'de', label: 'DE' },
];

export const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (nextLocale: string) => {
    if (nextLocale === locale) return;

    router.replace(pathname, { locale: nextLocale });
    router.refresh();
  };

  return (
    <Select value={locale} onValueChange={(value) => handleChange(value)}>
      <SelectTrigger className="text-nav-foreground w-fit px-1 py-1 md:px-2 md:py-2">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LOCALES.map((l) => (
          <SelectItem
            className="text-nav-foreground"
            key={l.code}
            value={l.code}
          >
            {l.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
