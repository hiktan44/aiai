import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';

/**
 * Açık yönlendirme (open redirect) önlemi: yalnızca uygulama içi path'lere izin ver.
 * `next=.evil.com`, `//evil.com` veya `https://...` gibi harici hedefleri reddet.
 * (actions/auth.ts'deki safeRedirect ile aynı korumayı callback hot-path'ine taşır.)
 */
function safeNext(next: string | null): string {
  if (next && next.startsWith('/') && !next.startsWith('//')) {
    return next;
  }
  return '/dashboard';
}

/**
 * Supabase auth callback — OAuth/e-posta doğrulama sonrası code → session değişimi.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = safeNext(searchParams.get('next'));

  if (code && isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
