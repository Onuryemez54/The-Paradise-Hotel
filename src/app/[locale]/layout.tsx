import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { AppLocale, routing } from '@/i18n/routing';
import '@/app/globals.css';
import { Metadata } from 'next';
import { NavbarSection } from '@/components/navbar/NavbarSection';
import { Footer } from '@/components/footer/Footer';
import { ToastProvider } from '@/context/ToastContext';
import { TitleKey } from '@/types/i18n/keys';
import { getExchangeRates } from '@/lib/actions/exchange-rates-action/exchange-rates';
import { PriceRatesProvider } from '@/context/PriceRatesContext';

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
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

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const rates = await getExchangeRates();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ToastProvider>
        <div className="from-primary-900 via-primary-700 to-primary-600 text-primary-50 relative mx-auto grid min-h-screen max-w-480 grid-rows-[auto_1fr_auto] bg-linear-to-b">
          <NavbarSection />
          <div className="grid flex-1 px-8 py-12">
            <main className="mx-auto w-full max-w-7xl">
              <PriceRatesProvider rates={rates}>{children}</PriceRatesProvider>
            </main>
          </div>
          <Footer />
        </div>
      </ToastProvider>
    </NextIntlClientProvider>
  );
}
