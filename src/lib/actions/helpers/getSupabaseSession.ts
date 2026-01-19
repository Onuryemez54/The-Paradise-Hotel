import { type NextRequest } from 'next/server';

export const getSupabaseSession = (request: NextRequest) => {
  return request.cookies
    .getAll()
    .find(
      (c) => c.name.includes('auth-token') && !c.name.includes('code-verifier')
    );
};
