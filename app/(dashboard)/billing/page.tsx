import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlanCards } from '@/components/billing/plan-cards';
import { formatNumber } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Faturalandırma',
  description: 'Planınızı ve ödeme bilgilerinizi yönetin.',
};

const invoices = [
  { id: 'INV-2026-006', date: '1 Haz 2026', amount: '$19,00', status: 'Ödendi' },
  { id: 'INV-2026-005', date: '1 May 2026', amount: '$19,00', status: 'Ödendi' },
  { id: 'INV-2026-004', date: '1 Nis 2026', amount: '$19,00', status: 'Ödendi' },
];

export default function BillingPage() {
  const usage = 640;
  const limit = 1000;
  const pct = Math.round((usage / limit) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Faturalandırma"
        description="Planınızı yönetin ve kullanımınızı izleyin."
        action={<Button variant="outline" size="sm">Müşteri portalı</Button>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pro Plan</CardTitle>
              <CardDescription>Aylık · sonraki yenileme 1 Tem 2026</CardDescription>
            </div>
            <Badge tone="primary">Aktif</Badge>
          </CardHeader>
          <div className="mt-2">
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-muted">Link kullanımı</span>
              <span className="font-medium text-foreground">
                {formatNumber(usage)} / {formatNumber(limit)}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-border">
              <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ödeme yöntemi</CardTitle>
          </CardHeader>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-12 items-center justify-center rounded-md bg-surface-elevated font-mono text-xs text-muted">
              VISA
            </span>
            <div>
              <p className="text-sm text-foreground">•••• 4242</p>
              <p className="text-xs text-muted">12/2028</p>
            </div>
          </div>
        </Card>
      </div>

      <PlanCards />

      <Card className="p-0">
        <CardHeader className="p-6 pb-3">
          <CardTitle>Fatura geçmişi</CardTitle>
        </CardHeader>
        <div className="divide-y divide-border border-t border-border">
          {invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between px-6 py-4 text-sm">
              <span className="font-mono text-muted">{inv.id}</span>
              <span className="hidden text-muted sm:inline">{inv.date}</span>
              <span className="font-medium text-foreground">{inv.amount}</span>
              <Badge tone="success">{inv.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
