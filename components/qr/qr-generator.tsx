'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const PRESET_COLORS = ['#6366f1', '#0a0b14', '#22d3ee', '#f59e0b', '#ef4444', '#22c55e'];

/**
 * QrGenerator — marka renklerine uygun QR kod oluşturucu (Client Component).
 * qrcode kütüphanesiyle gerçek QR data URL üretir; PNG indirilebilir.
 */
export function QrGenerator() {
  const [value, setValue] = useState('https://link.sp/yaz-kampanya');
  const [color, setColor] = useState('#6366f1');
  const [dataUrl, setDataUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(value || ' ', {
      width: 512,
      margin: 2,
      color: { dark: color, light: '#ffffff' },
      errorCorrectionLevel: 'H',
    })
      .then((url) => {
        if (active) {
          setDataUrl(url);
          setError(null);
        }
      })
      .catch(() => {
        if (active) setError('QR kod üretilemedi. Girdiyi kontrol edin.');
      });
    return () => {
      active = false;
    };
  }, [value, color]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Ayarlar */}
      <div className="space-y-5 rounded-2xl border border-border bg-surface p-6">
        <Input
          label="Hedef URL veya metin"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://link.sp/kampanya"
        />

        <div className="space-y-2">
          <span className="block text-sm font-medium text-foreground">Renk</span>
          <div className="flex flex-wrap items-center gap-2">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                aria-label={`Renk ${c}`}
                aria-pressed={color === c}
                className={cn(
                  'size-9 rounded-lg border-2 transition-transform hover:scale-105',
                  color === c ? 'border-foreground' : 'border-transparent',
                )}
                style={{ backgroundColor: c }}
              />
            ))}
            <label className="ml-1 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted hover:text-foreground">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="size-5 cursor-pointer rounded border-0 bg-transparent p-0"
                aria-label="Özel renk seç"
              />
              Özel
            </label>
          </div>
        </div>

        {error && (
          <p className="text-sm text-error" role="alert">
            {error}
          </p>
        )}

        <p className="text-xs text-muted">
          QR kodlar dinamiktir: hedef linki sonradan değiştirseniz bile basılı QR çalışmaya devam eder.
        </p>
      </div>

      {/* Önizleme */}
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-6">
        <div className="rounded-xl bg-white p-4">
          {dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={dataUrl} alt="QR kod önizlemesi" width={220} height={220} />
          ) : (
            <div className="size-[220px] animate-pulse rounded bg-border" />
          )}
        </div>
        <a
          href={dataUrl || '#'}
          download="linkspark-qr.png"
          aria-disabled={!dataUrl}
          className="w-full"
        >
          <Button className="w-full" disabled={!dataUrl}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            PNG indir
          </Button>
        </a>
      </div>
    </div>
  );
}
