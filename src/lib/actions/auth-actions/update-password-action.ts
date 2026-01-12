'use server';
import { createClient } from '@/db/supabase/server';
import { AppError } from '@/lib/errors/AppError';
import { redirect } from 'next/navigation';
import { ErrorKey, SuccessKey } from '@/types/i18n/keys';
import { cookies } from 'next/headers';

export const updatePasswordAction = async ({
  newPassword,
}: {
  newPassword: string;
}) => {
  const cookieStore = await cookies();
  const supabase = await createClient();
  const { error, data } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    if (error.code === 'same_password') {
      throw new AppError(ErrorKey.SAME_PASSWORD);
    }
    if (error.name === 'AuthSessionMissingError') {
      throw new AppError(ErrorKey.SESSION_EXPIRED);
    }
    throw new AppError(ErrorKey.PASSWORD_UPDATE_FAILED);
  }

  if (data.user && data.user.app_metadata.providers.includes('google')) {
    throw new AppError(ErrorKey.RESET_RESTRICTED);
  }

  //  after password update, remove the resetting password cookie
  if (cookieStore.has('reset_required')) cookieStore.delete('reset_required');

  redirect(`/account?status=${SuccessKey.PASSWORD_UPDATED}`);
};
