import { LoginPayload } from '@/types/auth/authTypes';
import { createClient } from '@/db/supabase/client';
import { assertEmailAvailability } from '../helpers/assertEmailAvailability';
import { ErrorKey } from '@/types/i18n/keys';
import { ActionResultType } from '@/lib/errors/helpers/handleAppError';

export const loginAction = async ({
  email,
  password,
}: LoginPayload): Promise<ActionResultType> => {
  const emailCheck = await assertEmailAvailability({ email, mode: 'login' });

  if (!emailCheck.ok) {
    return emailCheck;
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Login Action Error:', error?.message);
    return { ok: false, error: ErrorKey.LOGIN_FAILED };
  }

  return { ok: true };
};
