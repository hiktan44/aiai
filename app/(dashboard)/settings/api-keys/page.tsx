import type { Metadata } from 'next';
import { ApiKeysManager } from '@/components/settings/api-keys-manager';

export const metadata: Metadata = {
  title: 'API Anahtarları',
  description: 'REST API erişimi için anahtarlarınızı yönetin.',
};

export default function ApiKeysPage() {
  return <ApiKeysManager />;
}
