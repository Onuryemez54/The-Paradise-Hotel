import { createClient } from '@/db/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db/prisma';
import { AppError } from '@/lib/errors/AppError';
import { ErrorKey, SuccessKey } from '@/types/i18n/keys';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    redirect(`/auth/login?status=${ErrorKey.NO_CODE}`);
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code!);

  if (error || !data.user) {
    redirect(`/auth/login?status=${ErrorKey.OAUTH_FAILED}`);
  }

  const { id: supabaseId, email, user_metadata } = data.user;

  try {
    const existingUser = await db.user.findFirst({
      where: { email },
    });

    if (!existingUser) {
      await db.user.create({
        data: {
          id: supabaseId,
          email: email!,
          name:
            user_metadata.full_name ||
            user_metadata.fullName ||
            user_metadata.name ||
            '',
          image: user_metadata.avatar_url || user_metadata.picture || '',
          emailVerified: new Date(),
        },
      });
    } else {
      await db.user.update({
        where: { email },
        data: {
          id: existingUser.id,
          name:
            existingUser.name ||
            user_metadata.fullName ||
            user_metadata.full_name ||
            '',
          image: existingUser.image || user_metadata.avatar_url || '',
        },
      });
    }
    revalidatePath('/');
  } catch (err) {
    throw new AppError(ErrorKey.INTERNAL_ERROR);
  }
  redirect(`/account?status=${SuccessKey.LOGGED_IN}`);
}
