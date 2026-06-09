import type { Metadata } from 'next';
import { SettingsForm } from '@/components/settings/settings-form';

export const metadata: Metadata = {
  title: 'Workspace Ayarları',
  description: 'Workspace genel ayarlarını yönetin.',
};

export default function WorkspaceSettingsPage() {
  return (
    <SettingsForm
      fields={[
        { name: 'workspaceName', label: 'Workspace adı', defaultValue: 'Acme Studio' },
        { name: 'slug', label: 'Workspace kısa adı', defaultValue: 'acme-studio', hint: 'URL ve API çağrılarında kullanılır.' },
        { name: 'shortDomain', label: 'Varsayılan kısa domain', defaultValue: 'go.acme.com' },
      ]}
    />
  );
}
