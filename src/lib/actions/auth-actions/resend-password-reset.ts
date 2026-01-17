'use server';
import { supabaseAdmin } from '@/db/supabase/service';
import { redirect } from 'next/navigation';

import { assertEmailAvailability } from '../helpers/assertEmailAvailability';
import { ErrorKey } from '@/types/i18n/keys';

export const resendVerificationEmail = async (email: string) => {
  await assertEmailAvailability({ email, mode: 'reset' });

  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: 'magiclink',
    email,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/reset`,
    },
  });

  if (!data.user) {
    throw new Error(ErrorKey.USER_NOT_FOUND);
  }

  if (error) {
    throw new Error(ErrorKey.RESEND_FAILED);
  }

  redirect('/auth/reset-password?status=PASSWORD_RESET');
};
