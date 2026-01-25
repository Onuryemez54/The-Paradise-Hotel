'use server';
import { RegisterPayload } from '@/types/auth/authTypes';
import { assertEmailAvailability } from '../helpers/assertEmailAvailability';
import { createClient } from '@/db/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ErrorKey, TitleKey } from '@/types/i18n/keys';

export const registerAction = async ({
  email,
  password,
  fullName,
}: RegisterPayload) => {
  await assertEmailAvailability({ email, mode: 'register' });

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
    throw new Error(ErrorKey.REGISTER_FAILED);
  }

  revalidatePath('/');
  redirect(`/auth/verify?status=${TitleKey.VERIFY_EMAIL}`);
};
