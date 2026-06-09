import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UtmBuilder } from '@/components/utm/utm-builder';
import { demoUtmTemplates } from '@/lib/demo';

export const metadata: Metadata = {
  title: 'UTM & AI',
  description: 'AI destekli UTM oluşturucu ve kampanya şablonları.',
};

export default function UtmPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="UTM & AI Sihirbazı"
        description="Kampanyalarınız için en uygun UTM parametrelerini yapay zekayla oluşturun."
      />

      <UtmBuilder />

      <Card className="p-0">
        <CardHeader className="p-6 pb-3">
          <CardTitle>Kayıtlı şablonlar</CardTitle>
          <CardDescription>Sık kullandığınız UTM kombinasyonları</CardDescription>
        </CardHeader>
        <div className="divide-y divide-border border-t border-border">
          {demoUtmTemplates.map((t) => (
            <div key={t.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="font-mono text-xs text-muted">
                  source={t.source} · medium={t.medium} · campaign={t.campaign}
                </p>
              </div>
              <Badge tone="muted">Şablon</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
