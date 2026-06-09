import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import type { CurrentUser } from '@/lib/types';

/**
 * Oturum açmış kullanıcıyı döndürür (Server Component / Action).
 * getUser() ile cookie tabanlı session sunucuda doğrulanır (learnings).
 * Supabase yapılandırılmamışsa demo kullanıcı döner (demo modu).
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (!isSupabaseConfigured()) {
    return {
      id: 'demo-user',
      email: 'demo@linkspark.app',
      name: 'Demo Kullanıcı',
      isDemo: true,
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    id: user.id,
    email: user.email ?? '',
    name:
      (user.user_metadata?.name as string | undefined) ??
      user.email?.split('@')[0] ??
      'Kullanıcı',
    isDemo: false,
  };
}
