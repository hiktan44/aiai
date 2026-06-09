'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Plan {
  name: string;
  monthly: number;
  yearly: number;
  features: string[];
  current?: boolean;
  highlighted?: boolean;
}

const plans: Plan[] = [
  { name: 'Free', monthly: 0, yearly: 0, features: ['25 link/ay', 'Temel analitik', '1 QR kod'] },
  { name: 'Pro', monthly: 19, yearly: 15, features: ['Sınırsız link', 'Gelişmiş analitik', '1 özel domain', 'API erişimi'], current: true, highlighted: true },
  { name: 'Growth', monthly: 49, yearly: 39, features: ['Pro + 5 domain', 'Piksel rotasyonu', 'AI UTM', '5 ekip üyesi'] },
  { name: 'Enterprise', monthly: 149, yearly: 119, features: ['Sınırsız her şey', 'SLA & destek', 'SSO / SAML'] },
];

export function PlanCards() {
  const [interval, setInterval] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1" role="group" aria-label="Faturalandırma aralığı">
          {(['monthly', 'yearly'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setInterval(key)}
              aria-pressed={interval === key}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                interval === key ? 'bg-primary text-white' : 'text-muted hover:text-foreground',
              )}
            >
              {key === 'monthly' ? 'Aylık' : 'Yıllık'}
              {key === 'yearly' && <span className="ml-1.5 text-xs text-secondary">−20%</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {plans.map((plan) => {
          const price = interval === 'monthly' ? plan.monthly : plan.yearly;
          return (
            <div
              key={plan.name}
              className={cn(
                'relative flex flex-col rounded-2xl border bg-surface p-5',
                plan.highlighted ? 'border-primary/50' : 'border-border',
              )}
            >
              {plan.current && (
                <Badge tone="primary" className="absolute -top-3 left-5">
                  Mevcut plan
                </Badge>
              )}
              <h3 className="font-display text-lg font-semibold text-foreground">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold text-foreground">${price}</span>
                <span className="text-sm text-muted">/ay</span>
              </div>
              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-success" aria-hidden>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.current ? 'outline' : plan.highlighted ? 'primary' : 'secondary'}
                className="mt-5 w-full"
                disabled={plan.current}
              >
                {plan.current ? 'Aktif plan' : plan.name === 'Enterprise' ? 'Satışla görüş' : 'Yükselt'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
