import { createClient } from '@/db/supabase/server';

export const getSupabaseUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
