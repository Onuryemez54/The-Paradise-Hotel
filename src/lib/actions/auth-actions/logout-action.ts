'use server';
import { createClient } from '@/db/supabase/server';
import { cookies } from 'next/headers';

export const logout = async () => {
  const cookieStore = await cookies();
  const supabase = await createClient();
  await supabase.auth.signOut();

  //  after logout, remove the resetting if password cookie exists
  if (cookieStore.has('reset_required')) cookieStore.delete('reset_required');
};
