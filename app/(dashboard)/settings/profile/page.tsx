import type { Metadata } from 'next';
import { SettingsForm } from '@/components/settings/settings-form';
import { getCurrentUser } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Profil',
  description: 'Kişisel profil bilgilerinizi yönetin.',
};

export default async function ProfileSettingsPage() {
  const user = await getCurrentUser();

  return (
    <SettingsForm
      fields={[
        { name: 'name', label: 'Ad Soyad', defaultValue: user?.name ?? '' },
        { name: 'email', label: 'E-posta', type: 'email', defaultValue: user?.email ?? '' },
      ]}
      submitLabel="Profili güncelle"
    />
  );
}
