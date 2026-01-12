'use server';
import { createClient } from '@/db/supabase/server';
import { AppError } from '../../errors/AppError';
import { redirect } from 'next/navigation';
import { assertEmailAvailability } from '../helpers/assertEmailAvailability';
import { ErrorKey } from '@/types/i18n/keys';

export const requestPasswordReset = async ({ email }: { email: string }) => {
  await assertEmailAvailability({ email, mode: 'reset' });

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/reset`,
  });

  if (error) {
    throw new AppError(ErrorKey.RESET_MAIL_FAILED);
  }

  redirect('/auth/verify?status=PASSWORD_RESET');
};
