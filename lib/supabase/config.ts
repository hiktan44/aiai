/**
 * Supabase ortam yapılandırması.
 *
 * Anahtarlar tanımlı değilse uygulama "demo modunda" çalışır: kimlik doğrulama
 * atlanır ve panolar örnek verilerle render edilir. Production'da .env.local
 * (veya Coolify ortam değişkenleri) ile gerçek Supabase projesine bağlanır.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

/** Supabase env anahtarları tanımlı mı? */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}
