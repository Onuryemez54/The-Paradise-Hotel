import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';
import { createClient } from '@/db/supabase/server';
import { redirect } from 'next/navigation';
import { db } from '@/db/prisma';
import { ErrorKey, SuccessKey } from '@/types/i18n/keys';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;

  if (!token_hash || !type) {
    redirect(`/auth/resend-verification?status=${ErrorKey.NO_CODE}`);
  }

  if (type !== 'signup') {
    redirect(`/auth/resend-verification?status=${ErrorKey.INVALID_LINK}`);
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  });

  const user = data.user;

  if (!user) {
    if (error?.code === 'otp_expired') {
      redirect(`/auth/resend-verification?status=${ErrorKey.INVALID_LINK}`);
    }
    redirect(
      `/auth/resend-verification?status=${ErrorKey.EMAIL_VERIFICATION_FAILED}`
    );
  }

  const existingUser = await db.user.findFirst({
    where: { email: user.email },
  });

  if (!existingUser) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.full_name || '',
        image: user.user_metadata?.avatar_url || '',
        emailVerified: new Date(),
      },
    });
  }
  redirect(`/account?status=${SuccessKey.EMAIL_VERIFIED}`);
}
