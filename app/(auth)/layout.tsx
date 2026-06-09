import Link from 'next/link';
import { Logo } from '@/components/layout/logo';

/** Auth grubu layout — ortalanmış minimal kimlik doğrulama kabuğu (Server Component). */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[560px] -translate-x-1/2 rounded-full bg-primary/15 blur-[130px]"
        aria-hidden
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/" aria-label="Ana sayfaya dön">
            <Logo />
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-elevated">
          {children}
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          Devam ederek{' '}
          <Link href="/terms" className="text-foreground underline-offset-4 hover:underline">
            Kullanım Koşulları
          </Link>{' '}
          ve{' '}
          <Link href="/privacy" className="text-foreground underline-offset-4 hover:underline">
            Gizlilik Politikası
          </Link>
          ’nı kabul etmiş olursunuz.
        </p>
      </div>
    </div>
  );
}
