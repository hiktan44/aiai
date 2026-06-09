import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from './config';

/**
 * Korunan path önekleri — yalnızca bunlar oturum gerektirir.
 * Blanket /api/* bypass YOK; explicit liste kullanılır (learnings).
 */
const PROTECTED_PREFIXES = [
  '/dashboard',
  '/links',
  '/analytics',
  '/qr-codes',
  '/domains',
  '/pixels',
  '/utm',
  '/team',
  '/billing',
  '/settings',
];

const AUTH_PATHS = ['/login', '/register'];

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

/**
 * Session yenileme + auth guard.
 * Supabase yapılandırılmamışsa (demo modu) yönlendirme yapılmaz — pano örnek
 * verilerle erişilebilir kalır.
 */
export async function updateSession(
  request: NextRequest,
): Promise<NextResponse> {
  let response = NextResponse.next({ request });

  if (!isSupabaseConfigured()) {
    return response;
  }

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: { name: string; value: string; options: CookieOptions }[],
      ) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // getUser() — cookie tabanlı session'ı sunucuda doğrular (learnings).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Giriş yapmamış kullanıcı korunan rotada → /login?redirectTo=...
  if (!user && isProtected(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(url);
  }

  // Giriş yapmış kullanıcı auth sayfasında → /dashboard
  if (user && AUTH_PATHS.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return response;
}
