'use server';
import { getCurrentUser } from '@/lib/actions/db-acitons';
import { createClient } from '@/db/supabase/server';
import { db } from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { ErrorKey } from '@/types/i18n/keys';

export const updateProfileAction = async (formData: FormData) => {
  const supabase = await createClient();
  const currentUser = await getCurrentUser();

  const name = formData.get('fullName') as string;
  const nationalID = formData.get('nationalID') as string;
  const nationality = formData.get('nationality') as string;
  const countryFlag = formData.get('countryFlag') as string;

  const imageFile = formData.get('profilePhoto') as File | null;

  let imageUrl = currentUser.image;

  // Upload new profile image if provided
  if (imageFile && imageFile.size > 0) {
    const fileName = `avatar-${currentUser.id}-${crypto.randomUUID()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, imageFile, {
        cacheControl: '3600',
        upsert: false,
        contentType: imageFile.type,
      });

    if (uploadError) throw new Error(ErrorKey.PROFILE_IMAGE_UPLOAD_FAILED);

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    imageUrl = publicUrlData.publicUrl;
  }

  // Update user profile in Supabase Auth
  const { error: updateAuthError } = await supabase.auth.updateUser({
    data: {
      avatar_url: imageUrl,
      fullName: name,
    },
  });

  if (updateAuthError) throw new Error(ErrorKey.PROFILE_UPDATE_AUTH_FAILED);

  // Update user profile in Prisma DB
  await db.user.update({
    where: { id: currentUser.id },
    data: {
      name,
      nationalID,
      nationality,
      countryFlag,
      image: imageUrl,
    },
  });

  revalidatePath('/account/settings');
};
