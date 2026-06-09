'use client';

import { ErrorFallback } from '@/components/shared/error-fallback';

export default function AuthError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorFallback
      title="Kimlik doğrulama hatası"
      description="Giriş işlemi sırasında bir sorun oluştu. Lütfen tekrar deneyin."
      reset={reset}
    />
  );
}
