'use client';

import { Button } from '@/components/ui/button';

interface ErrorFallbackProps {
  title?: string;
  description?: string;
  reset: () => void;
}

/** Tüm error.tsx sınırlarının paylaştığı ortak hata UI’ı. */
export function ErrorFallback({
  title = 'Bir şeyler ters gitti',
  description = 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin; sorun devam ederse bizimle iletişime geçin.',
  reset,
}: ErrorFallbackProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-error/10 text-error">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        </svg>
      </div>
      <h2 className="font-display text-xl font-semibold text-foreground">{title}</h2>
      <p className="max-w-md text-sm text-muted">{description}</p>
      <Button onClick={reset} className="mt-2">
        Tekrar dene
      </Button>
    </div>
  );
}
