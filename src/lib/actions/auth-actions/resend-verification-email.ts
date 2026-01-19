'use server';
import { supabaseAdmin } from '@/db/supabase/service';
import { redirect } from 'next/navigation';
import { assertEmailAvailability } from '../helpers/assertEmailAvailability';
import { ErrorKey, TitleKey } from '@/types/i18n/keys';

export const resendVerificationEmail = async (email: string) => {
  await assertEmailAvailability({ email, mode: 'resendEmailVerification' });

  const { error } = await supabaseAdmin.auth.resend({
    type: 'signup',
    email,
  });

  if (error) {
    console.error('Error resending verification email:', error.message);
    if (error.message.includes('security purposes')) {
      throw new Error(ErrorKey.TOO_MANY_REQUESTS);
    }
    throw new Error(ErrorKey.RESEND_VERIFY_EMAIL_FAILED);
  }

  redirect(`/auth/verify?status=${TitleKey.VERIFY_EMAIL}`);
};
