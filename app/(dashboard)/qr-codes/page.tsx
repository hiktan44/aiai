import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { QrGenerator } from '@/components/qr/qr-generator';

export const metadata: Metadata = {
  title: 'QR Kodları',
  description: 'Marka renklerinize uygun dinamik QR kodları oluşturun.',
};

export default function QrCodesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="QR Kodları"
        description="Dinamik, izlenebilir ve markalı QR kodları saniyeler içinde üretin."
      />
      <QrGenerator />
    </div>
  );
}
