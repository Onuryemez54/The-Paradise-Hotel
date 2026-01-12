'use server';
import { supabaseAdmin } from '@/db/supabase/service';
import { AppError } from '@/lib/errors/AppError';
import { ErrorKey } from '@/types/i18n/keys';

type Mode = 'login' | 'register' | 'resendVerification' | 'reset';

export const assertEmailAvailability = async ({
  email,
  mode,
}: {
  email: string;
  mode: Mode;
}) => {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    throw new AppError(ErrorKey.INTERNAL_ERROR);
  }

  const existingAuthUser = data.users.find((u) => u.email === email);
  const providers = existingAuthUser?.app_metadata?.providers ?? [];

  switch (mode) {
    case 'login':
      if (!existingAuthUser) {
        throw new AppError(ErrorKey.USER_NOT_FOUND);
      }
      if (!existingAuthUser.email_confirmed_at) {
        throw new AppError(ErrorKey.EMAIL_NOT_VERIFIED);
      }
      if (providers.includes('google')) {
        throw new AppError(ErrorKey.USER_EXISTS_OAUTH);
      }
      return;
    case 'register':
      if (!existingAuthUser) {
        return;
      }
      if (!existingAuthUser.email_confirmed_at) {
        throw new AppError(ErrorKey.USER_EXISTS_UNVERIFIED);
      }
      if (providers.includes('google')) {
        throw new AppError(ErrorKey.USER_EXISTS_OAUTH);
      }
      throw new AppError(ErrorKey.USER_EXISTS);
    case 'resendVerification':
      if (!existingAuthUser) {
        throw new AppError(ErrorKey.USER_NOT_FOUND);
      }
      if (existingAuthUser.email_confirmed_at) {
        throw new AppError(ErrorKey.EMAIL_ALREADY_VERIFIED);
      }
      if (providers.includes('google')) {
        throw new AppError(ErrorKey.USER_EXISTS_OAUTH);
      }
      return;
    case 'reset':
      if (!existingAuthUser) {
        throw new AppError(ErrorKey.USER_NOT_FOUND);
      }
      if (providers.includes('google')) {
        throw new AppError(ErrorKey.RESET_RESTRICTED);
      }
      return;
    default:
      throw new AppError(ErrorKey.INTERNAL_ERROR);
  }
};
