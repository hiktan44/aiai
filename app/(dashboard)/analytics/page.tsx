import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KpiCard } from '@/components/analytics/kpi-card';
import { AreaChart } from '@/components/dashboard/area-chart';
import { BarList } from '@/components/dashboard/bar-list';
import {
  demoClickSeries,
  demoGeo,
  demoDevices,
  demoBrowsers,
  demoReferrers,
} from '@/lib/demo';
import { formatCompactNumber, formatNumber } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Analitik',
  description: 'Coğrafi, cihaz, tarayıcı ve referrer kırılımı.',
};

const icon = (d: string) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analitik"
        description="Tüm linklerinizin birleşik performansı."
        action={<Badge tone="muted">Son 30 gün</Badge>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Toplam tıklama" value={formatCompactNumber(284_300)} delta={12.4} icon={icon('M9 19c-5 0-7-3-7-7s2-7 7-7 7 3 7 7')} />
        <KpiCard label="Tekil ziyaretçi" value={formatCompactNumber(198_400)} delta={9.1} icon={icon('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z')} />
        <KpiCard label="Ortalama CTR" value="%6,8" delta={-1.2} icon={icon('M4 19V5m0 14h16M8 17V9m4 8V6m4 11v-5')} />
        <KpiCard label="QR taraması" value={formatCompactNumber(42_100)} delta={9.7} icon={icon('M4 4h6v6H4V4Zm10 0h6v6h-6V4Z')} />
      </div>

      <Card>
        <CardHeader className="mb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle>Tıklama trendi</CardTitle>
            <CardDescription>Günlük toplam tıklama</CardDescription>
          </div>
          <Badge tone="success">+18% bu ay</Badge>
        </CardHeader>
        <AreaChart data={demoClickSeries} ariaLabel="Toplam tıklama trendi" />
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Coğrafi dağılım</CardTitle>
            <CardDescription>Ülkeye göre tıklamalar</CardDescription>
          </CardHeader>
          <ul className="space-y-3">
            {demoGeo.map((g) => (
              <li key={g.country}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-foreground">
                    <span aria-hidden>{g.flag}</span>
                    {g.country}
                  </span>
                  <span className="font-medium text-muted">
                    {formatNumber(g.clicks)} · %{g.share}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${g.share}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>En çok yönlendirenler</CardTitle>
            <CardDescription>Trafik kaynakları</CardDescription>
          </CardHeader>
          <BarList data={demoReferrers} unit="count" />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cihaz</CardTitle>
            <CardDescription>Tıklamaların cihaz kırılımı</CardDescription>
          </CardHeader>
          <BarList data={demoDevices} unit="percent" />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tarayıcı</CardTitle>
            <CardDescription>Tıklamaların tarayıcı kırılımı</CardDescription>
          </CardHeader>
          <BarList data={demoBrowsers} unit="percent" />
        </Card>
      </div>
    </div>
  );
}
