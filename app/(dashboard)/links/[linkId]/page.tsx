import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KpiCard } from '@/components/analytics/kpi-card';
import { AreaChart } from '@/components/dashboard/area-chart';
import { BarList } from '@/components/dashboard/bar-list';
import { CopyButton } from '@/components/shared/copy-button';
import { demoLinks, demoClickSeries, demoReferrers, demoDevices } from '@/lib/demo';
import { formatCompactNumber, formatDate, formatNumber } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Link Detayı',
  description: 'Link bazlı analitik ve performans.',
};

const icon = (d: string) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

export default async function LinkDetailPage({
  params,
}: {
  params: Promise<{ linkId: string }>;
}) {
  const { linkId } = await params;
  const link = demoLinks.find((l) => l.id === linkId) ?? demoLinks[0];

  if (!link) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/links" className="text-sm text-muted hover:text-foreground">
            ← Linklere dön
          </Link>
          <h1 className="mt-2 font-display text-2xl font-bold text-foreground">{link.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm text-primary">{link.shortUrl}</span>
            <CopyButton value={`https://${link.shortUrl}`} />
            <Badge tone="muted">{link.tag}</Badge>
          </div>
          <p className="mt-2 max-w-xl truncate text-sm text-muted">
            Hedef: {link.destinationUrl}
          </p>
        </div>
        <Badge tone="success">Aktif</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Toplam tıklama" value={formatNumber(link.clickCount)} delta={14.2} icon={icon('M9 19c-5 0-7-3-7-7s2-7 7-7 7 3 7 7M14 5c5 0 7 3 7 7s-2 7-7 7')} />
        <KpiCard label="Tekil ziyaretçi" value={formatCompactNumber(Math.round(link.clickCount * 0.72))} delta={8.9} icon={icon('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z')} />
        <KpiCard label="QR taraması" value={formatCompactNumber(Math.round(link.clickCount * 0.14))} delta={4.1} icon={icon('M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Z')} />
      </div>

      <Card>
        <CardHeader className="mb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle>Tıklama trendi</CardTitle>
            <CardDescription>Son 30 gün</CardDescription>
          </div>
          <Badge tone="success">Oluşturuldu {formatDate(link.createdAt)}</Badge>
        </CardHeader>
        <AreaChart data={demoClickSeries} height={220} ariaLabel="Link tıklama trendi" />
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>En çok yönlendirenler</CardTitle>
            <CardDescription>Trafik kaynakları</CardDescription>
          </CardHeader>
          <BarList data={demoReferrers} unit="count" />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cihaz dağılımı</CardTitle>
            <CardDescription>Tıklamaların cihaz kırılımı</CardDescription>
          </CardHeader>
          <BarList data={demoDevices} unit="percent" />
        </Card>
      </div>
    </div>
  );
}
