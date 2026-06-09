import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { demoTeam } from '@/lib/demo';
import type { Role } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Ekip',
  description: 'Ekip üyelerini ve davetleri yönetin.',
};

const roleLabel: Record<Role, string> = {
  owner: 'Sahip',
  admin: 'Yönetici',
  member: 'Üye',
};

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Ekip"
        description="Workspace üyelerini davet edin ve rollerini yönetin."
        action={<Button size="sm">Üye davet et</Button>}
      />

      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
                <th scope="col" className="px-6 py-3 font-medium">Üye</th>
                <th scope="col" className="hidden px-6 py-3 font-medium sm:table-cell">E-posta</th>
                <th scope="col" className="px-6 py-3 font-medium">Rol</th>
                <th scope="col" className="px-6 py-3 font-medium">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {demoTeam.map((m) => (
                <tr key={m.id} className="transition-colors hover:bg-surface-elevated/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-full bg-primary/20 font-display text-xs font-semibold text-primary">
                        {m.initials}
                      </span>
                      <span className="font-medium text-foreground">{m.name}</span>
                    </div>
                  </td>
                  <td className="hidden px-6 py-4 text-muted sm:table-cell">{m.email}</td>
                  <td className="px-6 py-4">
                    <Badge tone={m.role === 'owner' ? 'primary' : 'muted'}>
                      {roleLabel[m.role]}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge tone={m.status === 'active' ? 'success' : 'warning'}>
                      {m.status === 'active' ? 'Aktif' : 'Davet edildi'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
