'use server';
import { createClient } from '@/db/supabase/server';
import { assertEmailAvailability } from '../helpers/assertEmailAvailability';
import { ErrorKey } from '@/types/i18n/keys';
import { ActionResultType } from '@/lib/errors/helpers/handleAppError';

export const requestPasswordReset = async ({
  email,
}: {
  email: string;
}): Promise<ActionResultType> => {
  const emailCheck = await assertEmailAvailability({ email, mode: 'reset' });

  if (!emailCheck.ok) {
    return emailCheck;
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/reset`,
  });

  if (error) {
    console.error('Error resending password reset email:', error.message);
    if (error.message.includes('security purposes')) {
      return { ok: false, error: ErrorKey.TOO_MANY_REQUESTS };
    }
    return { ok: false, error: ErrorKey.RESET_PASSWORD_FAILED };
  }

  return { ok: true };
};
