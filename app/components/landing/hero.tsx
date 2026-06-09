import Link from 'next/link';
import { buttonClassName } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCompactNumber } from '@/lib/utils';

interface HeroProps {
  stats: { totalLinks: number; totalClicks: number };
}

/** Hero — yüksek dönüşümlü açılış bölümü (Server Component). */
export function Hero({ stats }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Arka plan: ızgara + radyal glow */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-28 text-center sm:pt-36">
        <Badge tone="primary" className="mb-6">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden />
          Yapay zeka destekli kampanya optimizasyonu
        </Badge>

        <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl">
          Linklerinizi <span className="text-gradient">akıllı dönüşüm</span>{' '}
          makinesine dönüştürün
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Markalı kısa linkler, gerçek zamanlı analitik, dinamik QR kodları ve
          AI destekli UTM sihirbazı — pazarlama ekibiniz için tek platformda.
          Sunucu kurulumu yok, sadece sonuç var.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className={buttonClassName({ size: 'lg', className: 'w-full sm:w-auto' })}
          >
            Ücretsiz başla
          </Link>
          <Link
            href="#pricing"
            className={buttonClassName({
              variant: 'outline',
              size: 'lg',
              className: 'w-full sm:w-auto',
            })}
          >
            Planları gör
          </Link>
        </div>

        <p className="mt-4 text-xs text-muted">
          Kredi kartı gerekmez · Free tier sınırsız süre
        </p>

        {/* Sosyal kanıt metrikleri */}
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          <div className="bg-surface p-6">
            <dt className="text-sm text-muted">İzlenen tıklama</dt>
            <dd className="mt-1 font-display text-3xl font-bold text-foreground">
              {formatCompactNumber(stats.totalClicks)}+
            </dd>
          </div>
          <div className="bg-surface p-6">
            <dt className="text-sm text-muted">Oluşturulan link</dt>
            <dd className="mt-1 font-display text-3xl font-bold text-foreground">
              {formatCompactNumber(stats.totalLinks)}+
            </dd>
          </div>
          <div className="col-span-2 bg-surface p-6 sm:col-span-1">
            <dt className="text-sm text-muted">Çalışma süresi</dt>
            <dd className="mt-1 font-display text-3xl font-bold text-foreground">
              %99.9
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
