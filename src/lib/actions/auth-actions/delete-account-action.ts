'use server';
import { ActionResultType } from '@/lib/errors/helpers/handleAppError';
import { getCurrentUser } from '../prisma-actions/db-acitons';
import { ErrorKey } from '@/types/i18n/keys';
import { db } from '@/db/prisma';
import { supabaseAdmin } from '@/db/supabase/service';

export const deleteAccount = async (): Promise<ActionResultType> => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { ok: false, error: ErrorKey.AUTH_REQUIRED };
    }

    const { error: supabaseError } = await supabaseAdmin.auth.admin.deleteUser(
      currentUser.id
    );

    if (supabaseError) {
      console.error('Supabase delete error:', supabaseError);
      return { ok: false, error: ErrorKey.ACCOUNT_DELETE_FAILED };
    }

    await db.booking.deleteMany({
      where: { userId: currentUser.id },
    });

    await db.user.delete({
      where: { id: currentUser.id },
    });

    return { ok: true };
  } catch (error) {
    console.error('Delete account failed:', error);
    return { ok: false, error: ErrorKey.INTERNAL_ERROR };
  }
};
