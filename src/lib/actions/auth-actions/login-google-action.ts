'use server';
import { createClient } from '@/db/supabase/server';
import { ErrorKey } from '@/types/i18n/keys';
import { redirect } from 'next/navigation';

export const loginWithGoogle = async () => {
  const supabase = await createClient();

  const origin = process.env.NEXT_PUBLIC_APP_URL;
  const redirectTo = `${origin}/api/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectTo,
    },
  });

  if (error || !data.url) {
    throw new Error(ErrorKey.OAUTH_FAILED);
  }
  redirect(data.url);
};
