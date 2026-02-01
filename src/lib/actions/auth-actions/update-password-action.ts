'use server';
import { createClient } from '@/db/supabase/server';
import { ErrorKey } from '@/types/i18n/keys';
import { cookies } from 'next/headers';
import { ActionResultType } from '@/lib/errors/helpers/handleAppError';

export const updatePasswordAction = async ({
  newPassword,
}: {
  newPassword: string;
}): Promise<ActionResultType> => {
  const cookieStore = await cookies();

  const supabase = await createClient();

  const { error, data } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    if (error.code === 'same_password') {
      return { ok: false, error: ErrorKey.SAME_PASSWORD };
    }
    if (error.name === 'AuthSessionMissingError') {
      return { ok: false, error: ErrorKey.SESSION_EXPIRED };
    }
    return { ok: false, error: ErrorKey.PASSWORD_UPDATE_FAILED };
  }

  if (data.user && data.user.app_metadata.providers.includes('google')) {
    return { ok: false, error: ErrorKey.RESET_RESTRICTED };
  }

  //  after password update, remove the resetting if password cookie exists
  if (cookieStore.has('reset_required')) cookieStore.delete('reset_required');

  return { ok: true };
};
