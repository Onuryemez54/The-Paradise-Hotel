'use server';
import { createClient } from '@/db/supabase/server';
import { redirect } from 'next/navigation';
import { assertEmailAvailability } from '../helpers/assertEmailAvailability';
import { ErrorKey, TitleKey } from '@/types/i18n/keys';

export const requestPasswordReset = async ({ email }: { email: string }) => {
  await assertEmailAvailability({ email, mode: 'reset' });

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/reset`,
  });

  if (error) {
    console.error('Error resending password reset email:', error.message);
    throw new Error(ErrorKey.RESET_PASSWORD_FAILED);
  }

  redirect(`/auth/verify?status=${TitleKey.RESET_PASSWORD}`);
};
