import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Metadata } from 'next';
import { NavbarSection } from '@/components/navbar/NavbarSection';
import { Footer } from '@/components/footer/Footer';
import { ToastProvider } from '@/context/ToastContext';
import { TitleKey } from '@/types/i18n/keys';
import { getExchangeRates } from '@/lib/actions/exchange-rates-action/exchange-rates';
import { PriceRatesProvider } from '@/context/PriceRatesContext';
import { getValidatedLocale } from '@/i18n/server';
import { MetadataProps } from '@/types/metadataPropsType';
import '@/app/globals.css';

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const locale = await getValidatedLocale(params);

  const t = await getTranslations({
    locale,
    namespace: TitleKey.TITLE,
  });

  return {
    title: {
      template: `%s / ${t(TitleKey.BRAND)}`,
      default: `${t(TitleKey.GREETING)} / ${t(TitleKey.BRAND)}`,
    },
    description:
      'Discover Paradise Hotel — a luxury forest retreat offering elegant rooms for 2 to 10 guests, blending comfort, nature, and serenity in perfect harmony.',
  };
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const LocaleLayout = async ({ children, params }: LayoutProps) => {
  const locale = await getValidatedLocale(params);

  setRequestLocale(locale);

  const rates = await getExchangeRates();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ToastProvider>
        <div className="from-primary-900 via-primary-700 to-primary-600 text-primary-50 relative mx-auto grid min-h-screen max-w-480 grid-rows-[auto_1fr_auto] overflow-x-hidden bg-linear-to-b">
          <NavbarSection />

          <PriceRatesProvider rates={rates}>{children}</PriceRatesProvider>

          <Footer />
        </div>
      </ToastProvider>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
