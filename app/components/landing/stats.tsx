import Link from 'next/link';
import { buttonClassName } from '@/components/ui/button';

/** Stats — kapanış CTA bandı (Server Component, ISR ile cache’lenebilir). */
export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-surface px-6 py-16 text-center">
        <div
          className="pointer-events-none absolute inset-0 bg-grid opacity-30"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[520px] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]"
          aria-hidden
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Bugüne kadar <span className="text-gradient">milyonlarca tıklama</span>{' '}
            LinkSpark ile izlendi
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Pazarlama ekibinizi veriyle güçlendirin. Birkaç dakikada kurun, ilk
            kampanyanızı bugün optimize edin.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className={buttonClassName({ size: 'lg', className: 'w-full sm:w-auto' })}
            >
              Ücretsiz hesabını oluştur
            </Link>
            <Link
              href="/login"
              className={buttonClassName({
                variant: 'ghost',
                size: 'lg',
                className: 'w-full sm:w-auto',
              })}
            >
              Giriş yap
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
