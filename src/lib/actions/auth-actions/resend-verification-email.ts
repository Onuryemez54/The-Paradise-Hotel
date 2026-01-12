'use server';
import { supabaseAdmin } from '@/db/supabase/service';
import { AppError } from '@/lib/errors/AppError';
import { redirect } from 'next/navigation';

import { assertEmailAvailability } from '../helpers/assertEmailAvailability';
import { ErrorKey } from '@/types/i18n/keys';

export const resendVerificationEmail = async (email: string) => {
  await assertEmailAvailability({ email, mode: 'resendVerification' });

  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: 'magiclink',
    email,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/confirm`,
    },
  });

  if (!data.user) {
    throw new AppError(ErrorKey.USER_NOT_FOUND);
  }

  if (error) {
    throw new AppError(ErrorKey.RESEND_FAILED);
  }

  redirect('/auth/verify?status=EMAIL_VERIFICATION');
};
