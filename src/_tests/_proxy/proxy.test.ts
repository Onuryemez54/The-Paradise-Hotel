import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseUser } from '@/lib/actions/helpers/getSupabaseUser';
import { proxy } from '@/proxy';

vi.mock('next-intl/middleware', () => {
  return {
    default: () => () => NextResponse.next(),
  };
});

vi.mock('@/lib/actions/helpers/getSupabaseUser', () => ({
  getSupabaseUser: vi.fn(),
}));

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
  it('redirects to login if reset is required and route is not allowed', async () => {
    (getSupabaseUser as any).mockResolvedValue(null);
    const request = createRequest('http://localhost:3000/en/account', {
      reset_required: 'true',
      'code-verifier': 'token-45242',
    });

    const response = await proxy(request);

    expect(response.status).toBe(307);

    const location = response.headers.get('location');
    expect(location).toContain('/en/auth/login');
    expect(location).toContain('PASSWORD_RESET_REQUIRED');

    const deletedCookie = response.cookies.get('reset_required');

    expect(deletedCookie).not.toBeDefined();
  });

  it('allows reset routes when reset is required', async () => {
    (getSupabaseUser as any).mockResolvedValue(null);
    const request = createRequest(
      'http://localhost:3000/en/auth/reset-password',
      { reset_required: 'true' }
    );

    const response = await proxy(request);

    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
  });

  it('redirects to login if account route and no auth token', async () => {
    (getSupabaseUser as any).mockResolvedValue(null);

    const request = createRequest('http://localhost:3000/en/account');

    const response = await proxy(request);
    expect(response.status).toBe(307);

    const location = response.headers.get('location');
    expect(location).toContain('/en/auth/login');
  });

  it('redirects authenticated user away from auth routes to account', async () => {
    (getSupabaseUser as any).mockResolvedValue({
      user: { id: '1' },
    });
    const request = createRequest('http://localhost:3000/en/auth/login', {
      'auth-token-1': 'token-46456456',
    });

    const response = await proxy(request);

    expect(response.status).toBe(307);

    const location = response.headers.get('location');
    expect(location).toContain('/en/account');
  });

  it('passes through normal routes without redirect', async () => {
    (getSupabaseUser as any).mockResolvedValue(null);
    const request = createRequest('http://localhost:3000/en');

    const response = await proxy(request);

    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
  });
});
