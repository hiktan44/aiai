import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { LinksManager } from '@/components/links/links-manager';
import { demoLinks } from '@/lib/demo';

export const metadata: Metadata = {
  title: 'Linkler',
  description: 'Kısa linklerinizi oluşturun, yönetin ve izleyin.',
};

export default function LinksPage() {
  // Production'da: lib/supabase/server.ts ile workspace linkleri çekilir.
  const links = demoLinks;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Linkler"
        description="Tüm kısa linklerinizi tek yerden yönetin."
      />
      <LinksManager initialLinks={links} />
    </div>
  );
}
