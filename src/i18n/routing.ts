import { defineRouting } from 'next-intl/routing';

export enum Locale {
  EN = 'en',
  TR = 'tr',
  DE = 'de',
}
export const routing = defineRouting({
  locales: Object.values(Locale),

  defaultLocale: Locale.EN,
  pathnames: {
    '/': '/',
    '/rooms': '/rooms',
    '/about': '/about',

    '/account': '/account',
    '/account/settings': '/account/settings',
    '/account/bookings': '/account/bookings',
    '/account/settings/update-password': '/account/settings/update-password',

    '/auth/login': '/auth/login',
    '/auth/register': '/auth/register',
    '/auth/forgot-password': '/auth/forgot-password',
    '/auth/reset-password': '/auth/reset-password',
    '/auth/resend-verification': '/auth/resend-verification',
    '/auth/verify': '/auth/verify',
  },
});

export type AppLocale = (typeof routing.locales)[number];
