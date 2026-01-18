import { createClient } from '@/db/supabase/server';
import { ErrorKey } from '@/types/i18n/keys';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    redirect(`/auth/resend-reset?status=${ErrorKey.NO_CODE}`);
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (!data.user) {
    if (error?.code === 'validation_failed') {
      redirect(`/auth/resend-reset?status=${ErrorKey.INVALID_LINK}`);
    } else {
      redirect(`/auth/resend-reset?status=${ErrorKey.SESSION_FAILED}`);
    }
  }

  const cookieStore = await cookies();
  cookieStore.set('reset_required', 'true', {
    maxAge: 60 * 15,
    httpOnly: true,
    secure: true,
    path: '/',
  });

  redirect('/auth/reset-password');
}
