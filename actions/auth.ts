'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import type { ActionResponse } from '@/lib/types';

const emailSchema = z.string().email('Geçerli bir e-posta adresi girin.');
const passwordSchema = z.string().min(8, 'Şifre en az 8 karakter olmalıdır.');

const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Şifre gereklidir.'),
});

const signUpSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır.'),
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Açık yönlendirme (open redirect) önlemi: yalnızca uygulama içi path'lere izin ver.
 * `//evil.com` veya `https://...` gibi harici hedefleri reddet (learnings).
 */
function safeRedirect(redirectTo: string | null | undefined): string {
  if (redirectTo && redirectTo.startsWith('/') && !redirectTo.startsWith('//')) {
    return redirectTo;
  }
  return '/dashboard';
}

export async function signIn(formData: FormData): Promise<ActionResponse> {
  const parsed = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: 'Lütfen form alanlarını kontrol edin.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const redirectTo = safeRedirect(formData.get('redirectTo') as string | null);

  // Demo modu: Supabase yapılandırılmamışsa doğrudan panoya geç.
  if (!isSupabaseConfigured()) {
    redirect(redirectTo);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { success: false, message: 'E-posta veya şifre hatalı.' };
  }

  redirect(redirectTo);
}

export async function signUp(formData: FormData): Promise<ActionResponse> {
  const parsed = signUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: 'Lütfen form alanlarını kontrol edin.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!isSupabaseConfigured()) {
    redirect('/dashboard');
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: { data: { name: parsed.data.name } },
  });

  if (error) {
    return {
      success: false,
      message:
        error.message === 'User already registered'
          ? 'Bu e-posta zaten kayıtlı. Giriş yapmayı deneyin.'
          : 'Kayıt sırasında bir sorun oluştu. Lütfen tekrar deneyin.',
    };
  }

  redirect('/dashboard');
}

/** Form action uyumluluğu için Promise<void> döner (learnings). */
export async function signOut(): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect('/login');
}
