'use client';

import { ErrorFallback } from '@/components/shared/error-fallback';

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorFallback
      title="Pano yüklenemedi"
      description="Verileriniz alınırken bir sorun oluştu. Lütfen tekrar deneyin."
      reset={reset}
    />
  );
}
