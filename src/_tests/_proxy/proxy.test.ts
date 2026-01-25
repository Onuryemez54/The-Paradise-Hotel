import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { proxy } from '@/proxy';

vi.mock('next-intl/middleware', () => {
  return {
    default: () => () => NextResponse.next(),
  };
});

const createRequest = (url: string, cookies: Record<string, string> = {}) => {
  const request = new NextRequest(new URL(url));

  Object.entries(cookies).forEach(([key, value]) => {
    request.cookies.set(key, value);
  });

  return request;
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('proxy middleware', () => {
  it('redirects to login if reset is required and route is not allowed', () => {
    const request = createRequest('http://localhost:3000/en/account', {
      reset_required: 'true',
      'code-verifier': 'token-45242',
    });

    const response = proxy(request);

    expect(response.status).toBe(307);

    const location = response.headers.get('location');
    expect(location).toContain('/en/auth/login');
    expect(location).toContain('PASSWORD_RESET_REQUIRED');

    const deletedCookie = response.cookies.get('reset_required');

    expect(deletedCookie).not.toBeDefined();
  });

  it('allows reset routes when reset is required', () => {
    const request = createRequest(
      'http://localhost:3000/en/auth/reset-password',
      { reset_required: 'true' }
    );

    const response = proxy(request);

    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
  });

  it('redirects to login if account route and no auth token', () => {
    const request = createRequest('http://localhost:3000/en/account');

    const response = proxy(request);

    expect(response.status).toBe(307);

    const location = response.headers.get('location');
    expect(location).toContain('/en/auth/login');
  });

  it('redirects authenticated user away from auth routes to account', () => {
    const request = createRequest('http://localhost:3000/en/auth/login', {
      'auth-token-1': 'token-46456456',
    });

    const response = proxy(request);

    expect(response.status).toBe(307);

    const location = response.headers.get('location');
    expect(location).toContain('/en/account');
  });

  it('passes through normal routes without redirect', () => {
    const request = createRequest('http://localhost:3000/en');

    const response = proxy(request);

    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
  });
});
