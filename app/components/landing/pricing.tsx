'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buttonClassName } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Plan {
  name: string;
  monthly: number;
  yearly: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const plans: Plan[] = [
  {
    name: 'Free',
    monthly: 0,
    yearly: 0,
    description: 'Bireysel kullanım ve deneme için.',
    features: ['25 link/ay', 'Temel analitik', '1 QR kod', 'Topluluk desteği'],
    cta: 'Ücretsiz başla',
  },
  {
    name: 'Pro',
    monthly: 19,
    yearly: 15,
    description: 'Büyüyen pazarlamacılar için.',
    features: [
      'Sınırsız link',
      'Gelişmiş gerçek zamanlı analitik',
      '1 özel domain',
      'Dinamik QR kodları',
      'API erişimi',
    ],
    highlighted: true,
    cta: 'Pro’ya başla',
  },
  {
    name: 'Growth',
    monthly: 49,
    yearly: 39,
    description: 'Ekipler ve ajanslar için.',
    features: [
      'Pro’daki her şey',
      '5 özel domain',
      'Retargeting piksel rotasyonu',
      'AI UTM sihirbazı',
      'Ekip üyeleri (5)',
    ],
    cta: 'Growth’a başla',
  },
  {
    name: 'Enterprise',
    monthly: 149,
    yearly: 119,
    description: 'Yüksek hacimli kurumlar için.',
    features: [
      'Growth’daki her şey',
      'Sınırsız domain & ekip',
      'SLA & öncelikli destek',
      'SSO / SAML',
      'Özel entegrasyonlar',
    ],
    cta: 'Satışla görüş',
  },
];

/** Pricing — aylık/yıllık toggle’lı plan tablosu (Client Component: billingInterval state). */
export function Pricing() {
  const [interval, setInterval] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Şeffaf, ölçeklenen fiyatlandırma
        </h2>
        <p className="mt-4 text-muted">
          İhtiyacınız büyüdükçe ödeyin. Yıllık planda 2 ay bedava.
        </p>

        {/* Aylık / Yıllık toggle */}
        <div
          className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1"
          role="group"
          aria-label="Faturalandırma aralığı"
        >
          {(['monthly', 'yearly'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setInterval(key)}
              aria-pressed={interval === key}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                interval === key
                  ? 'bg-primary text-white'
                  : 'text-muted hover:text-foreground',
              )}
            >
              {key === 'monthly' ? 'Aylık' : 'Yıllık'}
              {key === 'yearly' && (
                <span className="ml-1.5 text-xs text-secondary">−20%</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-4">
        {plans.map((plan) => {
          const price = interval === 'monthly' ? plan.monthly : plan.yearly;
          return (
            <div
              key={plan.name}
              className={cn(
                'relative flex flex-col rounded-2xl border bg-surface p-6',
                plan.highlighted
                  ? 'border-primary/50 shadow-[0_0_24px_rgba(99,102,241,0.18)]'
                  : 'border-border',
              )}
            >
              {plan.highlighted && (
                <Badge tone="primary" className="absolute -top-3 left-6">
                  En popüler
                </Badge>
              )}
              <h3 className="font-display text-lg font-semibold text-foreground">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{plan.description}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-foreground">
                  ${price}
                </span>
                <span className="text-sm text-muted">/ay</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-foreground">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 shrink-0 text-success"
                      aria-hidden
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-muted">{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={buttonClassName({
                  variant: plan.highlighted ? 'primary' : 'outline',
                  className: 'mt-7 w-full',
                })}
              >
                {plan.cta}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
