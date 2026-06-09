import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { demoDomains } from '@/lib/demo';
import { formatNumber } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Domainler',
  description: 'Özel alan adlarınızı bağlayın ve SSL durumunu izleyin.',
};

const sslTone = { active: 'success', pending: 'warning', none: 'muted' } as const;
const sslLabel = { active: 'SSL Aktif', pending: 'SSL Bekliyor', none: 'SSL Yok' } as const;

export default function DomainsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Domainler"
        description="Markalı kısa linkler için kendi alan adınızı kullanın."
        action={<Button size="sm">Domain ekle</Button>}
      />

      <Card className="border-dashed">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Zm.5-3h17m-17 6h17M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9Z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">DNS doğrulaması otomatik</p>
            <p className="text-sm text-muted">
              Bir CNAME kaydı ekleyin; SSL sertifikası dakikalar içinde otomatik tanımlanır.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        {demoDomains.map((d) => (
          <Card key={d.id} className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-surface-elevated font-mono text-sm text-primary">
                {d.domain[0].toUpperCase()}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-medium text-foreground">{d.domain}</span>
                  {d.primary && <Badge tone="primary">Birincil</Badge>}
                </div>
                <span className="text-xs text-muted">{formatNumber(d.links)} aktif link</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone={d.verified ? 'success' : 'warning'}>
                {d.verified ? 'Doğrulandı' : 'Doğrulanmadı'}
              </Badge>
              <Badge tone={sslTone[d.ssl]}>{sslLabel[d.ssl]}</Badge>
              {!d.verified && (
                <Button variant="outline" size="sm">
                  Doğrula
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
