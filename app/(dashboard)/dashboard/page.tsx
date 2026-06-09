import type { Metadata } from 'next';
import Link from 'next/link';
import { KpiCard } from '@/components/analytics/kpi-card';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buttonClassName } from '@/components/ui/button';
import { formatCompactNumber } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Genel Bakış',
  description: 'Link performansınızın özeti.',
};

const icon = (d: string) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

// Build aşaması bu verileri click_stats_hourly agregatından çekecektir.
const series = [120, 180, 150, 230, 280, 240, 360, 320, 410, 380, 520, 480];
const recentLinks = [
  { key: 'yaz-kampanya', dest: 'acme.com/yaz-indirimi', clicks: 8420, tag: 'Kampanya' },
  { key: 'bulten-42', dest: 'acme.com/blog/buyume', clicks: 3110, tag: 'E-posta' },
  { key: 'tiktok-bio', dest: 'acme.com/shop', clicks: 12940, tag: 'Sosyal' },
  { key: 'webinar-q2', dest: 'acme.com/etkinlik', clicks: 1875, tag: 'Etkinlik' },
];

function AreaChart({ data }: { data: number[] }) {
  const w = 720;
  const h = 220;
  const max = Math.max(...data);
  const step = w / (data.length - 1);
  const points = data.map((v, i) => [i * step, h - (v / max) * (h - 24)]);
  const line = points.map((p) => `${p[0]},${p[1]}`).join(' ');
  const area = `0,${h} ${line} ${w},${h}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-56 w-full" preserveAspectRatio="none" role="img" aria-label="Son 12 dönem tıklama eğrisi">
      <defs>
        <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#area-grad)" />
      <polyline points={line} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Genel Bakış</h1>
          <p className="mt-1 text-sm text-muted">Son 30 günün link performansı.</p>
        </div>
        <Link href="/links" className={buttonClassName({ size: 'sm' })}>
          Tüm linkler
        </Link>
      </div>

      {/* KPI kartları */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Toplam tıklama" value={formatCompactNumber(284_300)} delta={12.4} icon={icon('M9 19c-5 0-7-3-7-7s2-7 7-7 7 3 7 7M14 5c5 0 7 3 7 7s-2 7-7 7')} />
        <KpiCard label="Aktif link" value="1.284" delta={4.1} icon={icon('M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1')} />
        <KpiCard label="Tıklama oranı (CTR)" value="%6,8" delta={-1.2} icon={icon('M4 19V5m0 14h16M8 17V9m4 8V6m4 11v-5')} />
        <KpiCard label="QR taraması" value={formatCompactNumber(42_100)} delta={9.7} icon={icon('M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Z')} />
      </div>

      {/* Tıklama grafiği */}
      <Card>
        <CardHeader className="mb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle>Tıklama trendi</CardTitle>
            <CardDescription>Zaman içindeki toplam tıklama</CardDescription>
          </div>
          <Badge tone="success">+18% bu ay</Badge>
        </CardHeader>
        <AreaChart data={series} />
      </Card>

      {/* Son linkler */}
      <Card className="p-0">
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <CardTitle>Son linkler</CardTitle>
            <CardDescription>En son oluşturulan kısa linkler</CardDescription>
          </div>
          <Link href="/links" className="text-sm text-primary hover:underline">
            Tümünü gör
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-border text-left text-xs uppercase tracking-wide text-muted">
                <th scope="col" className="px-6 py-3 font-medium">Kısa link</th>
                <th scope="col" className="px-6 py-3 font-medium">Hedef</th>
                <th scope="col" className="px-6 py-3 font-medium">Etiket</th>
                <th scope="col" className="px-6 py-3 text-right font-medium">Tıklama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentLinks.map((l) => (
                <tr key={l.key} className="transition-colors hover:bg-surface-elevated/50">
                  <td className="px-6 py-3.5">
                    <span className="font-mono text-primary">link.sp/{l.key}</span>
                  </td>
                  <td className="px-6 py-3.5 text-muted">{l.dest}</td>
                  <td className="px-6 py-3.5">
                    <Badge tone="muted">{l.tag}</Badge>
                  </td>
                  <td className="px-6 py-3.5 text-right font-medium text-foreground">
                    {formatCompactNumber(l.clicks)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
