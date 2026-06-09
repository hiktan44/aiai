'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signUp } from '@/actions/auth';
import type { ActionResponse } from '@/lib/types';

/** RegisterForm — yeni hesap oluşturma (Client Component). */
export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResponse | null>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      setResult(await signUp(formData));
    });
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">
        Hesabınızı oluşturun
      </h1>
      <p className="mt-1.5 text-sm text-muted">
        Saniyeler içinde başlayın — kredi kartı gerekmez.
      </p>

      <form action={handleSubmit} className="mt-7 space-y-4" noValidate>
        <Input
          label="Ad Soyad"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Ada Lovelace"
          required
          error={result?.errors?.name?.[0]}
        />
        <Input
          label="E-posta"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="siz@sirket.com"
          required
          error={result?.errors?.email?.[0]}
        />
        <Input
          label="Şifre"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="En az 8 karakter"
          required
          hint="En az 8 karakter kullanın."
          error={result?.errors?.password?.[0]}
        />

        {result && !result.success && result.message && (
          <p className="text-sm text-error" role="alert">
            {result.message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Hesap oluşturuluyor…' : 'Ücretsiz kaydol'}
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-muted">
        Zaten hesabınız var mı?{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Giriş yapın
        </Link>
      </p>
    </div>
  );
}
