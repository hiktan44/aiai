'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/ui/empty-state';
import { CopyButton } from '@/components/shared/copy-button';
import { cn, formatNumber, slugify } from '@/lib/utils';
import { SHORT_DOMAIN } from '@/lib/constants';
import type { LinkDTO } from '@/lib/types';

/**
 * LinksManager — link listesini yönetir (Client Component).
 * Arama filtresi, oluşturma diyaloğu, kopyalama ve silme uçtan uca çalışır.
 * Demo modunda işlemler istemci durumunda tutulur; production'da server action'lara bağlanır.
 */
export function LinksManager({ initialLinks }: { initialLinks: LinkDTO[] }) {
  const [links, setLinks] = useState<LinkDTO[]>(initialLinks);
  const [query, setQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return links;
    return links.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.key.toLowerCase().includes(q) ||
        l.destinationUrl.toLowerCase().includes(q) ||
        l.tag.toLowerCase().includes(q),
    );
  }, [links, query]);

  function handleCreate(link: LinkDTO) {
    setLinks((prev) => [link, ...prev]);
    setDialogOpen(false);
  }

  function handleDelete(id: string) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-0 flex-1">
          <Input
            type="search"
            placeholder="Linklerde ara…"
            aria-label="Linklerde ara"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
          Yeni link
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1m-1 8a5 5 0 0 1-7 0 5 5 0 0 1 0-7l3-3a5 5 0 0 1 7 0" />
            </svg>
          }
          title={query ? 'Sonuç bulunamadı' : 'Henüz link yok'}
          description={
            query
              ? 'Aramanızla eşleşen link yok. Farklı bir anahtar kelime deneyin.'
              : 'İlk kısa linkinizi oluşturun ve tıklamaları izlemeye başlayın.'
          }
          action={
            !query && <Button onClick={() => setDialogOpen(true)}>Yeni link oluştur</Button>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
                  <th scope="col" className="px-5 py-3 font-medium">Link</th>
                  <th scope="col" className="hidden px-5 py-3 font-medium md:table-cell">Hedef</th>
                  <th scope="col" className="px-5 py-3 font-medium">Etiket</th>
                  <th scope="col" className="px-5 py-3 text-right font-medium">Tıklama</th>
                  <th scope="col" className="px-5 py-3 text-right font-medium">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((l) => (
                  <tr key={l.id} className="transition-colors hover:bg-surface-elevated/50">
                    <td className="px-5 py-3.5">
                      <div className="flex flex-col gap-0.5">
                        <Link
                          href={`/links/${l.id}`}
                          className="font-mono text-sm text-primary hover:underline"
                        >
                          {l.shortUrl}
                        </Link>
                        <span className="text-xs text-muted">{l.title}</span>
                      </div>
                    </td>
                    <td className="hidden max-w-[260px] truncate px-5 py-3.5 text-muted md:table-cell">
                      {l.destinationUrl}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge tone="muted">{l.tag}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-right font-medium text-foreground">
                      {formatNumber(l.clickCount)}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <CopyButton value={`https://${l.shortUrl}`} label="" />
                        <button
                          type="button"
                          onClick={() => handleDelete(l.id)}
                          aria-label={`${l.title} linkini sil`}
                          className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-error hover:text-error"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {dialogOpen && (
        <CreateLinkDialog onClose={() => setDialogOpen(false)} onCreate={handleCreate} />
      )}
    </div>
  );
}

function CreateLinkDialog({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (link: LinkDTO) => void;
}) {
  const [destination, setDestination] = useState('');
  const [title, setTitle] = useState('');
  const [key, setKey] = useState('');
  const [tag, setTag] = useState('Kampanya');
  const [error, setError] = useState<string | null>(null);

  const computedKey = key.trim() ? slugify(key) : slugify(title) || 'yeni-link';

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^https?:\/\/.+\..+/.test(destination.trim())) {
      setError('Geçerli bir hedef URL girin (https:// ile başlamalı).');
      return;
    }
    onCreate({
      id: `new-${computedKey}-${destination.length}`,
      key: computedKey,
      shortUrl: `${SHORT_DOMAIN}/${computedKey}`,
      destinationUrl: destination.trim(),
      title: title.trim() || destination.trim(),
      tag,
      clickCount: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Yeni link oluştur"
        className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-elevated"
      >
        <h2 className="font-display text-lg font-semibold text-foreground">Yeni kısa link</h2>
        <p className="mt-1 text-sm text-muted">Hedef URL girin, gerisini biz halledelim.</p>

        <form onSubmit={submit} className="mt-5 space-y-4">
          <Input
            label="Hedef URL"
            type="url"
            placeholder="https://siteniz.com/sayfa"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setError(null);
            }}
            required
            error={error ?? undefined}
          />
          <Input
            label="Başlık (opsiyonel)"
            placeholder="Yaz Kampanyası"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Özel anahtar (opsiyonel)"
            placeholder={computedKey}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            hint={`Kısa link: ${SHORT_DOMAIN}/${computedKey}`}
          />
          <div className="space-y-1.5">
            <label htmlFor="link-tag" className="block text-sm font-medium text-foreground">
              Etiket
            </label>
            <select
              id="link-tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className={cn(
                'h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-foreground outline-none',
                'focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              )}
            >
              {['Kampanya', 'Sosyal', 'E-posta', 'Etkinlik', 'Diğer'].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit">Link oluştur</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
