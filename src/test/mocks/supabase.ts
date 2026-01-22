import { vi } from 'vitest';

//  SERVER SUPABASE
vi.mock('@/db/supabase/server', () => ({
  createClient: () => ({
    auth: {
      signUp: vi.fn().mockResolvedValue({
        data: {
          user: { id: '1', email: 'onur@test.com' },
        },
        error: null,
      }),
    },
  }),
}));

//  SERVICE SUPABASE
vi.mock('@/db/supabase/service', () => ({
  supabaseAdmin: {
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: vi.fn().mockResolvedValue({
            data: null,
            error: null,
          }),
        }),
      }),
    }),
  },
}));

//  CLIENT SUPABASE
vi.mock('@/db/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({
        data: {
          user: { id: '1', email: 'onur@test.com' },
          error: null,
        },
      }),
    },
  }),
}));
