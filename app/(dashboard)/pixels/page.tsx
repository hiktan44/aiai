import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { demoPixels } from '@/lib/demo';
import type { PixelProvider } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Pikseller',
  description: 'Retargeting piksellerini yönetin (Meta, Google, TikTok, LinkedIn).',
};

const providerLabel: Record<PixelProvider, string> = {
  facebook: 'Meta (Facebook)',
  google: 'Google Ads',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
};

const providerColor: Record<PixelProvider, string> = {
  facebook: 'bg-[#1877f2]',
  google: 'bg-[#ea4335]',
  tiktok: 'bg-[#010101]',
  linkedin: 'bg-[#0a66c2]',
};

export default function PixelsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Retargeting Pikselleri"
        description="Yönlendirme öncesi otomatik enjeksiyon ile dönüşümleri yakalayın."
        action={<Button size="sm">Piksel ekle</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {demoPixels.map((p) => (
          <Card key={p.id} className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span
                className={`flex size-10 items-center justify-center rounded-xl text-sm font-bold text-white ${providerColor[p.provider]}`}
                aria-hidden
              >
                {providerLabel[p.provider][0]}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{p.name}</p>
                <p className="text-xs text-muted">{providerLabel[p.provider]}</p>
                {/* access_token ASLA gösterilmez — yalnızca maskeli pixelId (learnings) */}
                <p className="mt-1 font-mono text-xs text-muted">{p.pixelId}</p>
              </div>
            </div>
            <Badge tone={p.isEnabled ? 'success' : 'muted'}>
              {p.isEnabled ? 'Aktif' : 'Pasif'}
            </Badge>
          </Card>
        ))}
      </div>

      <Card className="border-dashed">
        <p className="text-sm text-muted">
          Birden fazla pikseli tek linke ekleyebilir, yönlendirme öncesi otomatik rotasyonla
          çalıştırabilirsiniz. Piksel kimlikleri şifrelenmiş olarak saklanır.
        </p>
      </Card>
    </div>
  );
}
