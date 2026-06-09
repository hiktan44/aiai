'use client';

import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './config';

/**
 * Tarayıcı (Client Component) Supabase istemcisi.
 * SADECE anon/public anahtar kullanılır — service_role asla client'a sızmaz (learnings).
 */
export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
