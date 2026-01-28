import { createClient } from '@/db/supabase/server';

export const getSupabaseSession = async () => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};
