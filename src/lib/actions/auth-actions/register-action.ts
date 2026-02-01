'use server';
import { RegisterPayload } from '@/types/auth/authTypes';
import { assertEmailAvailability } from '../helpers/assertEmailAvailability';
import { createClient } from '@/db/supabase/server';
import { revalidatePath } from 'next/cache';
import { ErrorKey } from '@/types/i18n/keys';
import { ActionResultType } from '@/lib/errors/helpers/handleAppError';

export const registerAction = async ({
  email,
  password,
  fullName,
}: RegisterPayload): Promise<ActionResultType> => {
  const emailCheck = await assertEmailAvailability({
    email,
    mode: 'register',
  });

  if (!emailCheck.ok) {
    return emailCheck;
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL;
  const redirectTo = `${origin}/api/auth/confirm`;
  const supabase = await createClient();

  const { data: signupData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectTo,
      data: { full_name: fullName },
    },
  });

  if (error || !signupData.user) {
    console.error('Register Action Error:', error?.message);
    return { ok: false, error: ErrorKey.REGISTER_FAILED };
  }

  revalidatePath('/');
  return { ok: true };
};
