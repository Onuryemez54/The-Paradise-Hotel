'use server';
import { createClient } from '@/db/supabase/server';
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
      throw new Error(ErrorKey.SAME_PASSWORD);
    }
    if (error.name === 'AuthSessionMissingError') {
      throw new Error(ErrorKey.SESSION_EXPIRED);
    }
    throw new Error(ErrorKey.PASSWORD_UPDATE_FAILED);
  }

  if (data.user && data.user.app_metadata.providers.includes('google')) {
    throw new Error(ErrorKey.RESET_RESTRICTED);
  }

  //  after password update, remove the resetting if password cookie exists
  if (cookieStore.has('reset_required')) cookieStore.delete('reset_required');

  redirect(`/account?status=${SuccessKey.PASSWORD_UPDATED}`);
};
