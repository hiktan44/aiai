'use client';

import { ErrorFallback } from '@/components/shared/error-fallback';

/** Global root error boundary (Client Component — Next.js App Router). */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorFallback
      title="Bir şeyler ters gitti"
      description="Beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin veya tekrar deneyin."
      reset={reset}
    />
  );
}
