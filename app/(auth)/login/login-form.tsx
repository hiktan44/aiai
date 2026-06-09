'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn } from '@/actions/auth';
import type { ActionResponse } from '@/lib/types';

/**
 * LoginForm — e-posta/şifre girişi (Client Component).
 * useSearchParams() kullandığı için page.tsx içinde <Suspense> ile sarılır (Next.js 15).
 * redirectTo hidden field ile taşınır; oturum sonrası kullanıcı geldiği yere döner.
 */
export function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '';
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResponse | null>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await signIn(formData);
      setResult(res);
      // Build aşamasında signIn başarıda redirect() yapar; burada UI geri bildirimi.
    });
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">
        Tekrar hoş geldiniz
      </h1>
      <p className="mt-1.5 text-sm text-muted">
        Hesabınıza giriş yapın ve kaldığınız yerden devam edin.
      </p>

      <form action={handleSubmit} className="mt-7 space-y-4" noValidate>
        <input type="hidden" name="redirectTo" value={redirectTo} />

        <Input
          label="E-posta"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="siz@sirket.com"
          required
          error={result?.errors?.email?.[0]}
        />
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="text-sm font-medium text-foreground">
              Şifre
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              Şifremi unuttum
            </Link>
          </div>
          <Input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
            error={result?.errors?.password?.[0]}
          />
        </div>

        {result && !result.success && result.message && (
          <p className="text-sm text-error" role="alert">
            {result.message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Giriş yapılıyor…' : 'Giriş yap'}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3" aria-hidden>
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted">veya</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button variant="outline" className="w-full" type="button">
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M21.35 11.1h-9.18v2.92h5.27c-.23 1.37-1.6 4.02-5.27 4.02-3.17 0-5.76-2.62-5.76-5.86s2.59-5.86 5.76-5.86c1.8 0 3.01.77 3.7 1.43l2.52-2.43C17.13 3.4 14.97 2.4 12.17 2.4 6.97 2.4 2.75 6.62 2.75 11.82s4.22 9.42 9.42 9.42c5.44 0 9.04-3.82 9.04-9.2 0-.62-.07-1.09-.16-1.94Z"
          />
        </svg>
        Google ile devam et
      </Button>

      <p className="mt-7 text-center text-sm text-muted">
        Hesabınız yok mu?{' '}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Ücretsiz kaydolun
        </Link>
      </p>
    </div>
  );
}
