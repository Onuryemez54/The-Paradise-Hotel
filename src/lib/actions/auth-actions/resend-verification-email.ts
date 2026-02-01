'use server';
import { supabaseAdmin } from '@/db/supabase/service';
import { assertEmailAvailability } from '../helpers/assertEmailAvailability';
import { ErrorKey } from '@/types/i18n/keys';
import { ActionResultType } from '@/lib/errors/helpers/handleAppError';

export const resendVerificationEmail = async (
  email: string
): Promise<ActionResultType> => {
  const emailCheck = await assertEmailAvailability({
    email,
    mode: 'resendEmailVerification',
  });

  if (!emailCheck.ok) {
    return emailCheck;
  }

  const { error } = await supabaseAdmin.auth.resend({
    type: 'signup',
    email,
  });

  if (error) {
    console.error('Error resending verification email:', error.message);
    if (error.message.includes('security purposes')) {
      return { ok: false, error: ErrorKey.TOO_MANY_REQUESTS };
    }
    return { ok: false, error: ErrorKey.RESEND_VERIFY_EMAIL_FAILED };
  }

  return { ok: true };
};
