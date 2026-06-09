import { PageHeader } from '@/components/shared/page-header';
import { SettingsNav } from '@/components/settings/settings-nav';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <PageHeader title="Ayarlar" description="Workspace, profil ve API erişiminizi yönetin." />
      <SettingsNav />
      <div className="max-w-2xl">{children}</div>
    </div>
  );
}
