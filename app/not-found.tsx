import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { buttonClassName } from '@/components/ui/button';

/** Global 404 sayfası (Server Component). */
export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div className="relative">
        <Logo />
        <p className="mt-10 font-display text-7xl font-bold text-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-foreground">
          Sayfa bulunamadı
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className={buttonClassName()}>
            Ana sayfa
          </Link>
          <Link href="/dashboard" className={buttonClassName({ variant: 'outline' })}>
            Panele git
          </Link>
        </div>
      </div>
    </div>
  );
}
