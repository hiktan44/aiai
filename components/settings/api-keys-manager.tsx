'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/shared/copy-button';
import { EmptyState } from '@/components/ui/empty-state';

interface ApiKey {
  id: string;
  name: string;
  masked: string;
  createdAt: string;
}

const initialKeys: ApiKey[] = [
  { id: 'k1', name: 'Production', masked: 'lsk_live_••••••••••3f9a', createdAt: '12 May 2026' },
  { id: 'k2', name: 'Zapier Entegrasyonu', masked: 'lsk_live_••••••••••7c21', createdAt: '28 Nis 2026' },
];

/** ApiKeysManager — API anahtarı oluşturma/iptal (Client Component).
 *  Ham anahtar yalnızca oluşturulduğu an bir kez gösterilir (learnings/güvenlik). */
export function ApiKeysManager() {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [revealed, setRevealed] = useState<string | null>(null);

  function createKey() {
    const raw = `lsk_live_${Math.abs(keys.length * 998877 + 12345).toString(36)}_demo_${keys.length + 1}xyz`;
    const id = `k${keys.length + 1}-${raw.length}`;
    setKeys((prev) => [
      { id, name: `Anahtar ${prev.length + 1}`, masked: `lsk_live_••••••••••${id.slice(-4)}`, createdAt: 'Az önce' },
      ...prev,
    ]);
    setRevealed(raw);
  }

  function revoke(id: string) {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">Pro ve üzeri planlar için REST API erişimi.</p>
        <Button size="sm" onClick={createKey}>
          Yeni anahtar
        </Button>
      </div>

      {revealed && (
        <div className="rounded-xl border border-success/40 bg-success/10 p-4">
          <p className="text-sm font-medium text-foreground">Yeni anahtarınız (yalnızca bir kez gösterilir):</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <code className="break-all rounded-lg bg-background px-3 py-1.5 font-mono text-sm text-success">
              {revealed}
            </code>
            <CopyButton value={revealed} label="Kopyala" />
          </div>
        </div>
      )}

      {keys.length === 0 ? (
        <EmptyState
          title="API anahtarı yok"
          description="Programatik erişim için ilk API anahtarınızı oluşturun."
          action={<Button onClick={createKey}>Anahtar oluştur</Button>}
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <ul className="divide-y divide-border">
            {keys.map((k) => (
              <li key={k.id} className="flex items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{k.name}</p>
                  <p className="truncate font-mono text-xs text-muted">{k.masked}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone="muted">{k.createdAt}</Badge>
                  <button
                    type="button"
                    onClick={() => revoke(k.id)}
                    className="text-xs font-medium text-error hover:underline"
                  >
                    İptal et
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
