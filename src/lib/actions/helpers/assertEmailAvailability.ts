'use server';
import { supabaseAdmin } from '@/db/supabase/service';
import { ActionResultType } from '@/lib/errors/helpers/handleAppError';
import { ErrorKey } from '@/types/i18n/keys';

type Mode = 'login' | 'register' | 'resendEmailVerification' | 'reset';

export const assertEmailAvailability = async ({
  email,
  mode,
}: {
  email: string;
  mode: Mode;
}): Promise<ActionResultType> => {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    return { ok: false, error: ErrorKey.INTERNAL_ERROR };
  }

  const existingAuthUser = data.users.find((u) => u.email === email);
  const providers = existingAuthUser?.app_metadata?.providers ?? [];

  switch (mode) {
    case 'login':
      if (!existingAuthUser) {
        return { ok: false, error: ErrorKey.USER_NOT_FOUND };
      }
      if (!existingAuthUser.email_confirmed_at) {
        return { ok: false, error: ErrorKey.EMAIL_NOT_VERIFIED };
      }
      if (providers.includes('google')) {
        return { ok: false, error: ErrorKey.USER_EXISTS_OAUTH };
      }
      return { ok: true };
    case 'register':
      if (!existingAuthUser) {
        return { ok: true };
      }
      if (!existingAuthUser.email_confirmed_at) {
        return { ok: false, error: ErrorKey.USER_EXISTS_UNVERIFIED };
      }
      if (providers.includes('google')) {
        return { ok: false, error: ErrorKey.USER_EXISTS_OAUTH };
      }
      return { ok: false, error: ErrorKey.USER_EXISTS };
    case 'resendEmailVerification':
      if (!existingAuthUser) {
        return { ok: false, error: ErrorKey.USER_NOT_FOUND };
      }
      if (existingAuthUser.email_confirmed_at) {
        return { ok: false, error: ErrorKey.EMAIL_ALREADY_VERIFIED };
      }
      if (providers.includes('google')) {
        return { ok: false, error: ErrorKey.USER_EXISTS_OAUTH };
      }
      return { ok: true };
    case 'reset':
      if (!existingAuthUser) {
        return { ok: false, error: ErrorKey.USER_NOT_FOUND };
      }
      if (providers.includes('google')) {
        return { ok: false, error: ErrorKey.RESET_RESTRICTED };
      }
      return { ok: true };
    default:
      return { ok: false, error: ErrorKey.INTERNAL_ERROR };
  }
};
