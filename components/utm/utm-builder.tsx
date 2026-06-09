'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CopyButton } from '@/components/shared/copy-button';
import { slugify } from '@/lib/utils';

interface Suggestion {
  source: string;
  medium: string;
  campaign: string;
}

// Kanal → UTM önerisi eşlemesi (AI sihirbazının demo karşılığı).
const CHANNEL_SUGGESTIONS: Record<string, Suggestion> = {
  Instagram: { source: 'instagram', medium: 'social', campaign: 'marka_bilinirligi' },
  'Meta Reklam': { source: 'facebook', medium: 'cpc', campaign: 'donusum_kampanyasi' },
  'E-posta': { source: 'newsletter', medium: 'email', campaign: 'haftalik_bulten' },
  'Google Ads': { source: 'google', medium: 'cpc', campaign: 'arama_kampanyasi' },
  TikTok: { source: 'tiktok', medium: 'social', campaign: 'video_lansman' },
};

const CHANNELS = Object.keys(CHANNEL_SUGGESTIONS);

export function UtmBuilder() {
  const [baseUrl, setBaseUrl] = useState('https://acme.com/kampanya');
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [source, setSource] = useState('instagram');
  const [medium, setMedium] = useState('social');
  const [campaign, setCampaign] = useState('marka_bilinirligi');

  function applySuggestion() {
    const s = CHANNEL_SUGGESTIONS[channel];
    setSource(s.source);
    setMedium(s.medium);
    setCampaign(s.campaign);
  }

  const finalUrl = useMemo(() => {
    try {
      const url = new URL(baseUrl);
      if (source) url.searchParams.set('utm_source', slugify(source));
      if (medium) url.searchParams.set('utm_medium', slugify(medium));
      if (campaign) url.searchParams.set('utm_campaign', slugify(campaign));
      return url.toString();
    } catch {
      return '';
    }
  }, [baseUrl, source, medium, campaign]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4 rounded-2xl border border-border bg-surface p-6">
        <Input
          label="Temel URL"
          type="url"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="https://siteniz.com/sayfa"
        />

        <div className="space-y-1.5">
          <label htmlFor="utm-channel" className="block text-sm font-medium text-foreground">
            Kanal
          </label>
          <div className="flex gap-2">
            <select
              id="utm-channel"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className="h-11 flex-1 rounded-xl border border-border bg-surface px-3.5 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {CHANNELS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <Button type="button" variant="outline" onClick={applySuggestion}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 3v2m0 14v2M5 12H3m18 0h-2M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
              </svg>
              AI öner
            </Button>
          </div>
        </div>

        <Input label="utm_source" value={source} onChange={(e) => setSource(e.target.value)} />
        <Input label="utm_medium" value={medium} onChange={(e) => setMedium(e.target.value)} />
        <Input label="utm_campaign" value={campaign} onChange={(e) => setCampaign(e.target.value)} />
      </div>

      <div className="space-y-4 rounded-2xl border border-border bg-surface p-6">
        <h3 className="font-display text-base font-semibold text-foreground">Oluşturulan URL</h3>
        {finalUrl ? (
          <>
            <div className="break-all rounded-xl border border-border bg-surface-elevated p-4 font-mono text-sm text-foreground">
              {finalUrl}
            </div>
            <CopyButton value={finalUrl} label="URL'yi kopyala" />
          </>
        ) : (
          <p className="text-sm text-error">Geçerli bir temel URL girin.</p>
        )}
        <p className="text-xs text-muted">
          AI sihirbazı, seçtiğiniz kanala göre en yüksek dönüşüm getiren UTM kombinasyonunu önerir.
        </p>
      </div>
    </div>
  );
}
