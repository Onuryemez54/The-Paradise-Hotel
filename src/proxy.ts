import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { type NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const getSupabaseSession = (request: NextRequest) => {
  return request.cookies.getAll().find((c) => c.name.includes('auth-token'));
};

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

  const PUBLIC_ROUTES = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
  ];

  const isResetAllowed = RESET_ALLOWED_ROUTES.some((r) => pathname.includes(r));
  const isPublic = PUBLIC_ROUTES.some((r) => pathname.includes(r));
  const isAccountRoute = pathname.includes('/account');

  const userToken = getSupabaseSession(request);

  if (resetRequired && !isResetAllowed) {
    const url = request.nextUrl.clone();
    const locale = url.pathname.split('/')[1] || routing.defaultLocale;
    url.pathname = `/${locale}/auth/login`;
    url.searchParams.set('status', 'PASSWORD_RESET_REQUIRED');
    const response = NextResponse.redirect(url);

    cookies
      .getAll()
      .filter((c) => c.name.includes('auth-token'))
      .forEach((c) => response.cookies.delete(c.name));

    response.cookies.delete('reset_required');

    return response;
  }

  if (isAccountRoute && !userToken) {
    const url = request.nextUrl.clone();
    const locale = url.pathname.split('/')[1] || routing.defaultLocale;
    url.pathname = `/${locale}/auth/login`;
    return NextResponse.redirect(url);
  }

  if (isPublic && userToken) {
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
