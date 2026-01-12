'use client';
import { createClient } from '@/db/supabase/client';

export const logout = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
};
