import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { type NextRequest, NextResponse } from 'next/server';
import { getSupabaseSession } from './lib/actions/helpers/getSupabaseSession';

const intlMiddleware = createMiddleware(routing);

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const cookies = request.cookies;

  const resetRequired = cookies.get('reset_required')?.value === 'true';

  const RESET_ALLOWED_ROUTES = [
    '/auth/reset-password',
    '/auth/verify',
    '/auth/login',
    '/api/auth/reset',
  ];

  const isResetAllowed = RESET_ALLOWED_ROUTES.some((r) => pathname.includes(r));
  const isAuthRoute = pathname.includes('/auth');
  const isAccountRoute = pathname.includes('/account');

  const userToken = getSupabaseSession(request);

  if (resetRequired && !isResetAllowed) {
    const url = request.nextUrl.clone();
    const locale = url.pathname.split('/')[1] || routing.defaultLocale;
    url.pathname = `/${locale}/auth/login`;
    url.searchParams.set('status', 'PASSWORD_RESET_REQUIRED');
    const response = NextResponse.redirect(url);

    return response;
  }

  if (isAccountRoute && !userToken) {
    const url = request.nextUrl.clone();
    const locale = url.pathname.split('/')[1] || routing.defaultLocale;
    url.pathname = `/${locale}/auth/login`;
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && userToken && !resetRequired) {
    const url = request.nextUrl.clone();
    const locale = url.pathname.split('/')[1] || routing.defaultLocale;
    url.pathname = `/${locale}/account`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
};

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
