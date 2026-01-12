import { LoginPayload } from '@/types/auth/authTypes';
import { createClient } from '@/db/supabase/client';
import { assertEmailAvailability } from '../helpers/assertEmailAvailability';
import { ErrorKey } from '@/types/i18n/keys';

export const loginAction = async ({ email, password }: LoginPayload) => {
  await assertEmailAvailability({ email, mode: 'login' });
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(ErrorKey.LOGIN_FAILED);
};
